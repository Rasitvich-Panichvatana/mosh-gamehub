import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const PlatformList = () => {
  const platformList = ["PC (Windows)", "Web Browser"];
  return (
    <>
      <CheckboxGroup>
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
