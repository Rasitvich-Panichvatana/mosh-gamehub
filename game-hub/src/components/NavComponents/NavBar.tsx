import { Heading, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack
      justifyContent="space-between"
      paddingLeft="30px"
      paddingRight="45px"
      paddingY="15px"
    >
      <HStack>
        <Image src={logo} boxSize="45px" />
        <Heading size="md">Game Hub</Heading>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
