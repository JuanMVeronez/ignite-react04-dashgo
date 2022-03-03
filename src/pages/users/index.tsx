import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Link from "next/link";
import { useQuery } from "react-query";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";

type User = {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const { isLoading, isFetching, error, data } = useQuery('users', async () => {
    const { data } = await api.get('users');
    console.log(data)
    const users = data.users.map(
      (user: User) => ({...user, createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })})
    )
    return users as User[];
  })

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
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="2" />}
            </Heading>
            <Link href="/users/create" passHref>
              <Button as="a" 
                size="sm" fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
              >
                Criar novo
              </Button>
            </Link>
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
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
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
              <Pagination direction={!isWideVersion? "column" : "row"} />
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}