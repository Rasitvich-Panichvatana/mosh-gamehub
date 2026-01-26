import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
  isHover?: boolean;
}

const ExpandableText = ({
  children,
  maxChars = 23,
  isHover = false,
}: Props) => {
  const [isExpanded, setExpanded] = useState(false);

  if (children.length <= maxChars || isHover) return <p>{children}</p>;

  const text = isExpanded ? children : children.substring(0, maxChars - 1);
  return (
    <>
      <HStack spacing={0}>
        <Text>{text}</Text>
        <Text color={"gray.400"}>...</Text>
      </HStack>
    </>
  );
};

export default ExpandableText;
