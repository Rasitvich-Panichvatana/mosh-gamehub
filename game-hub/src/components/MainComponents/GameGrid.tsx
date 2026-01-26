import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { useEffect } from "react";
import { vh } from "framer-motion";

interface Props {
  selectedPlatforms: string[];
  selectedGenres: string[];
  page: number;
  onTotalPages: (pages: number) => void;
  onPageChange: (page: number) => void;
}

const GameGrid = ({
  selectedPlatforms,
  selectedGenres,
  page,
  onTotalPages,
  onPageChange,
}: Props) => {
  const { games, error, isLoading, totalPages } = useGames({
    selectedPlatforms,
    selectedGenres,
    page,
  });

  useEffect(() => {
    onTotalPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (page > totalPages) {
      onPageChange(totalPages);
    }
  }, [totalPages]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Box minH="97vh">
        {error && <Text>{error}</Text>}
        <SimpleGrid
          columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
          paddingX="2vw"
          paddingTop="30px"
          paddingBottom="24px"
          spacing={5}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
          {games.map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default GameGrid;
