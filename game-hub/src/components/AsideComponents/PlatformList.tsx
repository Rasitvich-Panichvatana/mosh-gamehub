import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

interface Props {
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string | null) => void;
}

const PlatformList = ({ selectedPlatform, onSelectPlatform }: Props) => {
  // Display name (Orginal Data from API) → API value mapping
  const platformMap: { [key: string]: string } = {
    "PC (Windows)": "pc",
    "Web Browser": "browser",
  };

  const platformList = Object.keys(platformMap);

  const handleChange = (values: string[]) => {
    if (values.length === 0) {
      onSelectPlatform(null); // no filter
    } else if (values.length === platformList.length) {
      onSelectPlatform("all"); // both selected
    } else {
      onSelectPlatform(platformMap[values[0]]); // convert display name to api value
    }
  };

  return (
    <>
      <CheckboxGroup
        value={
          selectedPlatform === "all"
            ? platformList
            : selectedPlatform
            ? [
                Object.keys(platformMap).find(
                  (label) => platformMap[label] === selectedPlatform
                )!,
              ]
            : []
        }
        onChange={(values) => handleChange(values as string[])}
      >
        <Stack>
          {platformList.map((platform) => (
            <Checkbox key={platform} value={platform}>
              {platform}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default PlatformList;
