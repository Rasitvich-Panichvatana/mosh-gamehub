import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import PlatformList from "./PlatformList";
import GenreList from "./GenreList";

const Accordions = () => {
  return (
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
  );
};

export default Accordions;
