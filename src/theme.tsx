import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    brand: {
      50: "#ffe5e5",
      100: "#fbb8b8",
      200: "#f48a8a",
      300: "#ed5c5c",
      400: "#e62e2e",
      500: "#c41e3a", // Primary brand color
      600: "#a11530",
      700: "#7e0d26",
      800: "#5b061c",
      900: "#390012",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
      },
    },
    Card: {
      baseStyle: {
        borderRadius: "xl",
      },
    },
  },
})

export default theme

