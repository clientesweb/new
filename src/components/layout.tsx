import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { FaHome, FaCalendarAlt, FaPlay, FaAd } from "react-icons/fa"
import Link from "next/link"

const MenuItem = ({ icon, children, href }) => (
  <Link href={href} passHref>
    <Flex
      as="a"
      align="center"
      p={3}
      mx={3}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "brand.500",
        color: "white",
      }}
    >
      {icon}
      <Box ml={4}>{children}</Box>
    </Flex>
  </Link>
)

export const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="brand.500"
        color="white"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Flex align="center" mr={5}>
          <Box as="img" src="/android-chrome-192x192.png" width="40px" height="40px" alt="Café Club TV Logo" />
        </Flex>

        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={onOpen}
          display={{ base: "block", md: "none" }}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menú</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                <MenuItem icon={<FaHome />} href="/">
                  Inicio
                </MenuItem>
                <MenuItem icon={<FaCalendarAlt />} href="/parrilla">
                  Parrilla
                </MenuItem>
                <MenuItem icon={<FaPlay />} href="/shorts">
                  Shorts
                </MenuItem>
                <MenuItem icon={<FaAd />} href="/sponsors">
                  Sponsors
                </MenuItem>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Box pt="60px" pb="20px">
        {children}
      </Box>
    </Box>
  )
}

