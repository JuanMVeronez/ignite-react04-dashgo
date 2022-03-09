import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, useBreakpointValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from "react-query";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type userCreationFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const userCreationFormSchema = yup.object().shape({
  name: yup.string().required('O usuário deve ter um nome'),
  email: yup.string().required('E-mail obrigatório').email('Deve ser um e-mail'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
});

export default function CreateUser() {
  const router = useRouter();

  // useMutation faz todo o processo de incerção de dados, sendo que tem vários metodos e retornos úteis para esse processo.
  // TODO: ver o que mais ele pode fazer
  const createUser = useMutation(async (user: userCreationFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    });

    return response.data.user;
  }, {
    onSuccess: (data) => {
      // utilizado apenas para invalidar uma query (é dado o fetch pela própria query quando chamada)
      queryClient.invalidateQueries('users');
      // da um update nos dados da query
      // queryClient.setQueryData(['users', 1], data.user);
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userCreationFormSchema)
  })
  const handleCreateUser: SubmitHandler<userCreationFormData> = async (values) => {
    await createUser.mutateAsync(values);
    router.back()
  }

  return (
    <>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome completo" 
                { ...register('name') }
                error={formState.errors?.name}
              />
              <Input name="email" label="Email" type="email" 
                { ...register('email') }
                error={formState.errors?.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" label="Senha" type="password" 
                { ...register('password') }
                error={formState.errors?.password}
              />
              <Input name="passwordConfirmation" label="Confirmação da senha" 
                type="password" 
                { ...register('passwordConfirmation') }
                error={formState.errors?.passwordConfirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}