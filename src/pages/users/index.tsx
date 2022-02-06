import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
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
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Button as="a" 
              size="sm" fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
            >
              Criar novo
            </Button>
          </Flex>
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Juan Monteiro Veronez</Text>
                    <Text fontSize="small" color="gray.300">juan.monteirov@email.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>27 de Janeiro, 2022</Td>}
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Juan Monteiro Veronez</Text>
                    <Text fontSize="small" color="gray.300">juan.monteirov@email.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>27 de Janeiro, 2022</Td>}
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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Juan Monteiro Veronez</Text>
                    <Text fontSize="small" color="gray.300">juan.monteirov@email.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>27 de Janeiro, 2022</Td>}
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
            </Tbody>
          </Table>
          <Pagination direction={!isWideVersion? "column" : "row"} />
        </Box>
      </Flex>
    </>
  );
}