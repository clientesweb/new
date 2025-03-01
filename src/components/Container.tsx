import { Flex, type FlexProps } from "@chakra-ui/react"

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    bg="white"
    color="black"
    _dark={{
      bg: "#121212",
      color: "white",
    }}
    transition="all 0.15s ease-out"
    minH="100vh"
    {...props}
  />
)

