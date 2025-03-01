import { Box, Flex, Heading, Text, Button, Stack, Image } from "@chakra-ui/react"
import { FaPlay, FaCalendarAlt } from "react-icons/fa"

export const Hero = ({ title }: { title: string }) => (
  <Box position="relative" overflow="hidden">
    <Box
      bg="brand.500"
      w="100%"
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30%",
        background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
      }}
    >
      <Flex
        align="center"
        justify={{ base: "center", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
        minH={{ base: "70vh", md: "50vh" }}
        px={8}
        pt={8}
      >
        <Stack spacing={6} w={{ base: "100%", md: "50%" }} align={{ base: "center", md: "flex-start" }}>
          <Box position="relative">
            <Image src="/android-chrome-512x512.png" alt="Café Club TV Logo" width="120px" height="120px" mb={4} />
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              color="white"
              lineHeight="1.2"
              fontWeight="bold"
            >
              {title}
            </Heading>
          </Box>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            color="gray.100"
            maxW="lg"
            textAlign={{ base: "center", md: "left" }}
          >
            Tu destino de entretenimiento con la mejor programación, shorts y contenido exclusivo.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
            <Button
              leftIcon={<FaPlay />}
              bg="white"
              color="brand.500"
              size="lg"
              _hover={{ bg: "gray.100" }}
              rounded="full"
            >
              Ver Ahora
            </Button>
            <Button
              leftIcon={<FaCalendarAlt />}
              bg="whiteAlpha.300"
              color="white"
              size="lg"
              _hover={{ bg: "whiteAlpha.400" }}
              rounded="full"
            >
              Programación
            </Button>
          </Stack>
        </Stack>
        <Box
          w={{ base: "100%", md: "50%" }}
          display={{ base: "none", md: "block" }}
          position="relative"
          height="100%"
          minH="400px"
        >
          {/* Add featured content preview here */}
        </Box>
      </Flex>
    </Box>
  </Box>
)

Hero.defaultProps = {
  title: "Café Club TV",
}

