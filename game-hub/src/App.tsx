import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";

import mainBG from "./assets/mainBG.jpg";
import PlatformList from "./components/PlatformList";

function App() {
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

      {/* Aside - Tags  */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <Accordion allowMultiple>
            {/* Platform */}
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="lg">
                  Platforms
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <PlatformList />
              </AccordionPanel>
            </AccordionItem>

            {/* Tags (Genre) */}
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="lg">
                  Tags
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <GenreList />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Show>

      {/* Main - Game cards  */}
      <GridItem area="main" bgImage={mainBG}>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
