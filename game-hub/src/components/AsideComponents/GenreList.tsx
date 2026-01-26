import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

interface Props {
  selectedGenres: string[];
  onSelectGenres: (genres: string[]) => void;
}

const GenreList = ({ selectedGenres, onSelectGenres }: Props) => {
  const genresList = [
    "Action",
    "Action RPG",
    "ARPG",
    "Battle Royale",
    "Card Game",
    "Dungeon",
    "Fantasy",
    "Fighting",
    "MMO",
    "MMOARPG",
    "MMORPG",
    "MOBA",
    "RPG",
    "Racing",
    "Shooter",
    "Social",
    "Sports",
    "Strategy",
  ];

  const handleChange = (values: string[]) => {
    onSelectGenres(values); // pass all selected values
  };

  return (
    <>
      <CheckboxGroup
        value={selectedGenres}
        onChange={(values) => handleChange(values as string[])}
      >
        <Stack>
          {genresList.map((genre) => (
            <Checkbox key={genre} value={genre} colorScheme="green">
              {genre}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default GenreList;
