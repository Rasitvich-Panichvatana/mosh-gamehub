import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { useEffect } from "react";

interface Props {
  selectedPlatforms: string[];
  selectedGenres: string[];
  searchText: string;
  page: number;
  onTotalPages: (pages: number) => void;
  onPageChange: (page: number) => void;
  onTotal: (total: number) => void;
}

const GameGrid = ({
  selectedPlatforms,
  selectedGenres,
  page,
  onTotalPages,
  onPageChange,
  searchText,
  onTotal,
}: Props) => {
  const { games, error, isLoading, totalPages, total } = useGames({
    selectedPlatforms,
    selectedGenres,
    searchText,
    page,
  });

  useEffect(() => {
    onTotalPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    onTotal(total);
  }, [total]);

  // Cap Page to not exceed Total Page
  useEffect(() => {
    if (page > totalPages && totalPages != 0) {
      onPageChange(totalPages);
    }
  }, [totalPages]);

  // Fix Page > 1 when total = 0
  useEffect(() => {
    if (totalPages == 0) {
      onPageChange(1);
    }
  }, [totalPages]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Box minH="96vh">
        {error && <Text>{error}</Text>}
        <SimpleGrid
          columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
          paddingX="2vw"
          paddingTop="22px"
          paddingBottom="12px"
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
