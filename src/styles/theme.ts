import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    color: {
      primary: "#27AE60",
      "primary-50": "#93D7AF",
      secondary: "#EB5757",
    },
    grey: {
      0: "#F5F5F5",
      100: "#E0E0E0",
      150: "#BDBDBD",
      300: "#828282",
      600: "#333333",
    },
    signal: {
      negative: "#E60000",
      warning: "#FFCD07",
      success: "#168821",
      information: "#155BCB",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.375rem",
      "2xl": "1.625rem",
    },
    styles: {
      global: {
        body: {
          bg: "#FFFFFF",
        },
      },
    },
  },
});
