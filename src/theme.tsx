import { extendTheme } from "@chakra-ui/react"
import "@fontsource/kumbh-sans"

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
}

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#EDEDEE",
      },
      heroGradientStart: {
        default: "#C41E3A",
        _dark: "#780000",
      },
      heroGradientEnd: {
        default: "#FF0000",
        _dark: "#C41E3A",
      },
      brand: {
        default: "#C41E3A",
        _dark: "#C41E3A",
      },
      brandSecondary: {
        default: "#FFFFFF",
        _dark: "#FFFFFF",
      },
    },
    radii: {
      button: "xl",
    },
  },
  colors: {
    black: "#16161D",
    brand: {
      50: "#FFE5E5",
      100: "#FFB8B8",
      200: "#FF8A8A",
      300: "#FF5C5C",
      400: "#FF2E2E",
      500: "#C41E3A", // Primary brand color
      600: "#B31B35",
      700: "#8B1529",
      800: "#630F1D",
      900: "#3B0911",
    },
  },
  fonts: {
    heading: `"Kumbh Sans", sans-serif`,
    body: `"Kumbh Sans", sans-serif`,
  },
  breakpoints,
})

export default theme

