import { Grid, GridItem, Heading, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavComponents/NavBar";
import GameGrid from "./components/MainComponents/GameGrid";

import Accordions from "./components/AsideComponents/Accordions";
import { useCallback, useState } from "react";
import PlatformList from "./components/AsideComponents/PlatformList";
import GenreList from "./components/AsideComponents/GenreList";
import PageSelector from "./components/MainComponents/PageSelector";

import mainBG from "./assets/mainBG.jpg";
import SearchBar from "./components/MainComponents/SearchBar";

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const onSelectPlatforms = useCallback((platforms: string[]) => {
    setSelectedPlatforms(platforms);
  }, []);

  const onSelectGenres = useCallback((genres: string[]) => {
    setSelectedGenres(genres);
  }, []);

  // !!Debug don't forget to remove!!
  console.log(
    "App rendered",
    selectedPlatforms,
    selectedGenres,
    selectedPage,
    totalPages,
    searchText,
    total
  );

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      {/* NavBar */}
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      {/* Aside */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <Accordions
            title="Platform"
            checkbox={
              <PlatformList
                onSelectPlatforms={onSelectPlatforms}
                selectedPlatforms={selectedPlatforms}
              />
            }
          />
          <Accordions
            title="Genre"
            checkbox={
              <GenreList
                onSelectGenres={onSelectGenres}
                selectedGenres={selectedGenres}
              />
            }
          />
        </GridItem>
      </Show>

      {/* Main - Game cards  */}
      <GridItem area="main" bgImage={mainBG}>
        <HStack
          marginX="2vw"
          marginTop="20px"
          marginBottom="0px"
          justify="space-between"
        >
          <HStack>
            <SearchBar searchText={searchText} onSearch={setSearchText} />
          </HStack>
          <Heading as="h2" size="lg" fontWeight="semibold">
            {total} Result Found
          </Heading>
        </HStack>
        <GameGrid
          selectedPlatforms={selectedPlatforms}
          selectedGenres={selectedGenres}
          page={selectedPage}
          onTotalPages={setTotalPages}
          onPageChange={setSelectedPage}
          searchText={searchText}
          onTotal={setTotal}
        />
        <PageSelector
          selectedPage={selectedPage}
          totalPages={totalPages}
          onPageChange={setSelectedPage}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
