import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        transition: "background-color 0.2s ease",
      },
    }),
  },

  components: {
    Box: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === "dark" ? "gray.900" : "white",
      }),
    },

    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === "dark" ? "gray.900" : "white",
        },
      }),
    },
  },
});

export default theme;
