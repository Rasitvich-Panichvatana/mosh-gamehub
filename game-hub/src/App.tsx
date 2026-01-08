import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavComponents/NavBar";
import GameGrid from "./components/MainComponents/GameGrid";

import mainBG from "./assets/mainBG.jpg";
import Accordions from "./components/AsideComponents/Accordions";
import { useState } from "react";
import PlatformList from "./components/AsideComponents/PlatformList";
import GenreList from "./components/AsideComponents/GenreList";

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

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
                onSelectPlatform={(platform) => setSelectedPlatform(platform)}
                selectedPlatform={selectedPlatform}
              />
            }
          />
          <Accordions title="Tags" checkbox={<GenreList />} />
        </GridItem>
      </Show>

      {/* Main - Game cards  */}
      <GridItem area="main" bgImage={mainBG}>
        <GameGrid selectedPlatform={selectedPlatform} />
      </GridItem>
    </Grid>
  );
}

export default App;
