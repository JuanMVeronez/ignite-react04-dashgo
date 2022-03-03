import axios from "axios";

const fakeApiUrl = "http://localhost:3000/api"

export const api = axios.create({
  baseURL: fakeApiUrl
})