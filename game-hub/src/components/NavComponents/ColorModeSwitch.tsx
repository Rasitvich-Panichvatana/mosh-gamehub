import { HStack, Icon, Switch, Text, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <MoonIcon />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
