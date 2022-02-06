import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

type NavLinkProps = ChakraLinkProps & {
  title: String;
  icon: ElementType;
  href: string;
}

export function NavLink({ title, icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20"></Icon>
        <Text ml="4" fontWeight="medium">{title}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}