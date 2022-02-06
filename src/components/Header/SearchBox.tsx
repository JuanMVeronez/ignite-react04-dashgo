import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  /** Controled components
    * Utilizado quando se tem um state que muda conforme cada input do form
    * Sendo assim ele tem como seu ponto fraco crescer o mesmo tamanho que o form,
    tendo um state para cada input
   */
  const [search, setSearch] = useState('');

  /** Uncontroled components
   * Utilizados de tal forma que é criada uma referencia para o elemento
   * Isso é feito utilizando as refs, sendo que todo elemento dentro do react tet
   por padrão um atributo ref.
   */
  // const searchInputRef = useRef<HTMLInputElement>(null);
  // console.log(searchInputRef.current.value);

  return (
    <Flex as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input variant="unstyled"
          
          color="gray.50"
          px="4"
          xr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
          value={search} 
          onChange={event => setSearch(event.target.value)}
        />
          <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
  );
}