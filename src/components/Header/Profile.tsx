import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const username = "Juan Veronez";
const email = "juan.monteirov@gmail.com";
const userAvatar = "https://github.com/juanmveronez.png"

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{username}</Text>
        <Text color="gray.300" fontSize="small"
        >{email}</Text>
      </Box>
      
      {!!userAvatar 
      ? <Avatar size="md" name={username} src={userAvatar}/>
      : <Avatar size="md" name={username}/>
      }  
    </Flex>
  );
}