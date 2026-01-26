import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

interface Props {
  selectedPlatforms: string[];
  onSelectPlatforms: (platforms: string[]) => void;
}

const PlatformList = ({ selectedPlatforms, onSelectPlatforms }: Props) => {
  const platformList = ["PC (Windows)", "Web Browser"];

  const handleChange = (values: string[]) => {
    onSelectPlatforms(values); // pass all selected values
  };

  return (
    <CheckboxGroup
      value={selectedPlatforms}
      onChange={(values) => handleChange(values as string[])}
    >
      <Stack>
        {platformList.map((platform) => (
          <Checkbox key={platform} value={platform} colorScheme="green">
            {platform}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default PlatformList;
