import { Box, HStack, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

type PaginationProps = {
  direction?: "column" | "row";
};

export function Pagination({direction = "row"}: PaginationProps) {
  
  
  return (
    <Stack spacing="6" direction={direction}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spaging="2">
        <PaginationItem pageNumber={1} isCurrent />
        <PaginationItem pageNumber={2} />
        <PaginationItem pageNumber={3} />
        <PaginationItem pageNumber={4} />
        <PaginationItem pageNumber={5} />
        
      </HStack>
    </Stack>
  );
}