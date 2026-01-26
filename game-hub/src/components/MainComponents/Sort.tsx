import {
  ChevronDownIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface Props {
  selectedSort: string;
  onSort: (sort: string) => void;
  setSelectedPage: (page: number) => void;
}

const Sort = ({ selectedSort, onSort, setSelectedPage }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="120px">
        Sort by
      </MenuButton>
      <MenuList minW="120px">
        <MenuItem
          icon={<TriangleUpIcon />}
          onClick={() => {
            onSort("title ASC");
            setSelectedPage(1);
          }}
          bg={selectedSort === "title ASC" ? "gray.600" : undefined}
        >
          A-Z
        </MenuItem>
        <MenuItem
          icon={<TriangleDownIcon />}
          onClick={() => {
            onSort("title DESC");
            setSelectedPage(1);
          }}
          bg={selectedSort === "title DESC" ? "gray.600" : undefined}
        >
          Z-A
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Sort;
