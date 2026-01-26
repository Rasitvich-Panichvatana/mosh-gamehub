import { Button, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

interface Props {
  selectedPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageSelector = ({ selectedPage, totalPages, onPageChange }: Props) => {
  return (
    <HStack
      paddingY="16px"
      paddingX="16px"
      marginBottom="10px"
      mx="auto"
      w="fit-content"
      justify="center"
      borderRadius="16px"
      bgColor="gray.900"
    >
      <Button
        leftIcon={<ChevronLeftIcon />}
        size="md"
        isDisabled={selectedPage === 1}
        onClick={() => onPageChange(selectedPage - 1)}
      >
        Prev
      </Button>

      <Spacer />

      <HStack>
        {selectedPage !== 1 && (
          <Button size="md" width="2.5vw" onClick={() => onPageChange(1)}>
            1
          </Button>
        )}

        {selectedPage == 3 && (
          <Button size="md" width="2.5vw" onClick={() => onPageChange(2)}>
            2
          </Button>
        )}

        {selectedPage > 3 && (
          <Button size="md" width="2.5vw" variant="unstyled">
            ...
          </Button>
        )}

        {selectedPage > totalPages - 3 && totalPages > 5 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(totalPages - 4)}
          >
            {totalPages - 4}
          </Button>
        )}

        {selectedPage > totalPages - 2 && totalPages > 5 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(totalPages - 3)}
          >
            {totalPages - 3}
          </Button>
        )}

        {selectedPage > totalPages - 1 && totalPages > 5 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(totalPages - 2)}
          >
            {totalPages - 2}
          </Button>
        )}

        {selectedPage > 3 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(selectedPage - 1)}
          >
            {selectedPage - 1}
          </Button>
        )}

        <Button
          size="md"
          width="2.5vw"
          variant="solid"
          colorScheme="green"
          onClick={() => onPageChange(selectedPage)}
        >
          {selectedPage}
        </Button>

        {selectedPage < totalPages - 1 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(selectedPage + 1)}
          >
            {selectedPage + 1}
          </Button>
        )}

        {selectedPage == 1 && totalPages > 3 && (
          <Button size="md" width="2.5vw" onClick={() => onPageChange(3)}>
            3
          </Button>
        )}

        {selectedPage <= 2 && totalPages > 4 && (
          <Button size="md" width="2.5vw" onClick={() => onPageChange(4)}>
            4
          </Button>
        )}

        {selectedPage <= 3 && totalPages > 5 && (
          <Button size="md" width="2.5vw" onClick={() => onPageChange(5)}>
            5
          </Button>
        )}

        {selectedPage < totalPages - 2 && totalPages > 5 && (
          <Button size="md" width="2.5vw" variant="unstyled">
            ...
          </Button>
        )}

        {selectedPage !== totalPages && totalPages > 1 && (
          <Button
            size="md"
            width="2.5vw"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}
      </HStack>

      <Spacer />

      <Button
        rightIcon={<ChevronRightIcon />}
        size="md"
        isDisabled={selectedPage >= totalPages}
        onClick={() => onPageChange(selectedPage + 1)}
      >
        Next
      </Button>
    </HStack>
  );
};

export default PageSelector;
