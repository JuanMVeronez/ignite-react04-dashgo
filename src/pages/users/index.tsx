import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  Icon, 
  IconButton, 
  Link, 
  Spinner, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useBreakpointValue, 
  Text, 
} from "@chakra-ui/react";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import NextLink from "next/link";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";
import { User } from "../../services/mirage";

const itemsPerPage = 20

type UserListProps = {
  users: User[];
  totalCount: number;
}

export default function UserList({ users, totalCount }: UserListProps) {
  const [page, setPage] = useState(1);

  const { isLoading, isFetching, error, data} = useUsers({ page, pageItems: itemsPerPage }, {
    // Removido por problemas do mirage com ssr
    //initialData: {users, totalCount}
  });

  async function handlePrefetchUser(id: string) {
    await queryClient.prefetchQuery(['user', id], async () => {
      const { data } = await api.get(`users/${id}`);
      return data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button as="a" 
                size="sm" fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao receber dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>
                      Usuário
                    </Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="small" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        {isWideVersion? (
                          <Button as="a" 
                            size="sm" fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                          >
                            Editar
                          </Button>
                        ) : (
                          <IconButton as="a" 
                            size="sm" fontSize="sm" 
                            colorScheme="purple" 
                            aria-label="Edit user"
                            icon={<Icon as={RiPencilLine}/>}
                          /> 
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination direction={!isWideVersion? "column" : "row"} 
                currentPage={page}
                totalCountOfRegisters={data.totalCount}
                registersPerPage={itemsPerPage}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   console.log('here')
//   const { users, totalCount } = await getUsers(1, itemsPerPage)
//   console.log(users, totalCount)
//   return {
//     props: {
//       users,
//       totalCount
//     }
//   }
// }