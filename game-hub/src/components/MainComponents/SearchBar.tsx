import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

interface Props {
  searchText: string;
  onSearch: (value: string) => void;
}

const SearchBar = ({ searchText, onSearch }: Props) => {
  return (
    <>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>

          <Input
            placeholder="Search games..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />

          {searchText && (
            <InputRightElement>
              <IconButton
                aria-label="Clear search"
                icon={<CloseIcon boxSize={3} />}
                size="sm"
                variant="ghost"
                onClick={() => onSearch("")}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
    </>
  );
};

export default SearchBar;
