import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

interface Props {
  title: string;
  checkbox: JSX.Element;
}

const Accordions = ({ title, checkbox }: Props) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontSize="lg">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>{checkbox}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Accordions;
