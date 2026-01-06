import { Badge } from "@chakra-ui/react";

interface Props {
  genre: string;
}

const Genre = ({ genre }: Props) => {
  return (
    <Badge paddingX={2} borderRadius="4px">
      {genre}
    </Badge>
  );
};

export default Genre;
