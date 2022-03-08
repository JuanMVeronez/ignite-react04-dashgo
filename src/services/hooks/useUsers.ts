import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    users: User[];
    totalCount: number;
}

async function getUsers(page: number, per_page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('users', {
        params: {
            page, 
            per_page,
        }
    });

    const totalCount = Number(headers['x-total-count']);

    const users = data.users.map(
        (user: User) => ({...user, createdAt: toLocalDate(user.createdAt)})
    )
    return {
        users,
        totalCount,
    };
}

const toLocalDate = (date: string) => new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
})


type UsersData = {
    page: number,
    pageItems: number
}

export function useUsers({ page, pageItems }: UsersData) {
    return useQuery(['users', { page }], () => getUsers(page, pageItems), {
        staleTime: 5 * 1000 // 5 sec
    })
}