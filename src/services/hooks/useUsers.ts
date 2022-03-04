import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

async function getUsers(): Promise<User[]> {
    const { data } = await api.get('users');
    const users = data.users.map(
        (user: User) => ({...user, createdAt: toLocalDate(user.createdAt)})
    )
    return users;
}

const toLocalDate = (date: string) => new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
})


export function useUsers() {
    return useQuery('users', getUsers, {
        staleTime: 5 * 1000 // 5 sec
    })
}