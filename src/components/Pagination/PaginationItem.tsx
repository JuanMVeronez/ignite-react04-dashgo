import { Button } from "@chakra-ui/react";

type PaginationItemProps = {
  isCurrent?: boolean;
  pageNumber: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem(
  { onPageChange, pageNumber, isCurrent = false }: PaginationItemProps
) {
  return isCurrent ? (
    <Button 
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      disabled
      _disabled={{
        bg: "pink.500",
        cursor: "default",
      }}
    >{pageNumber}</Button>
  ) : (
    <Button onClick={() => onPageChange(pageNumber)}
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
    >{pageNumber}</Button>
  )
}
