import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

type PaginationProps = {
  direction?: "column" | "row";
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const siblingsCount = 1;

function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => (from + index + 1))
    .filter(page => page > 0);
}

export function Pagination({
  direction = "row",
  totalCountOfRegisters,
  onPageChange,
  currentPage = 1,
  registersPerPage = 10,  
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPages = currentPage < lastPage
    ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack spacing="6" direction={direction}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{}</strong> - <strong>{}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <HStack spaging="2">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem pageNumber={1}/>
            {currentPage > siblingsCount + 2 && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}
        


        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem key={page} pageNumber={page} />
        ))}
        <PaginationItem pageNumber={currentPage} isCurrent />
        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem key={page} pageNumber={page} />
        ))}

        {currentPage < (lastPage - siblingsCount) && (
          <>
            {currentPage < (lastPage - siblingsCount - 1) && (
              <Text color="gray.300" width="8" textAlign="center" >...</Text>
            )}
            <PaginationItem pageNumber={lastPage} />
          </>
        )}  
      </HStack>
    </Stack>
  );
}