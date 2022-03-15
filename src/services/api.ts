import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from 'nookies';

const apiUrl = "http://localhost:3000/api";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: cookies['dashgo.token'],
  },
});

api.interceptors.response.use(response => response, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies();
      const { 'dashgo.refreshToken': refreshToken } = cookies;
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        api.post('/refresh', {
          refreshToken
        }).then(response => {
          const { token, refreshToken } = response.data;
  
          setCookie(undefined, 'dashgo.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          });

          setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          });

          api.defaults.headers['Authorization'] = `Bearer ${token}`;
        
          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = [];
        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err));
          failedRequestsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        })
      }
      
      return new Promise((resolve, refect) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            refect(err);
          },
        })
      })
    } else {
      // logout
    }
  }
})