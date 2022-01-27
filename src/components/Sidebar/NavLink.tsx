import { Icon, Link, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";

type NavLinkProps = ChakraLinkProps & {
  title: String;
  icon: ElementType;
  link?: string;
}

export function NavLink({ title, icon, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20"></Icon>
      <Text ml="4" fontWeight="medium">{title}</Text>
    </Link>
  );
}