import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaWindows } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
  platforms: string;
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    "PC (Windows)": FaWindows,
    "Web Browser": BsGlobe,
  };

  return (
    <HStack margin={1}>
      {platforms.split(",").map((platform) => (
        <Icon key={platform} as={iconMap[platform]} color="gray.500" />
      ))}
    </HStack>
  );
};

export default PlatformIconList;
