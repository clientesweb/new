import type React from "react"
import { Box, Flex, Button, Stack, IconButton, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { FaHome, FaPlay, FaYoutube, FaInfoCircle } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Link href={href} passHref>
    <Button
      as="a"
      variant="ghost"
      color="white"
      _hover={{
        bg: "whiteAlpha.200",
      }}
    >
      {children}
    </Button>
  </Link>
)

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box position="fixed" w="100%" zIndex={1000} bg="brand.500">
      <Flex minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} align={"center"} justify={"space-between"}>
        <Flex align="center">
          <Image src="/android-chrome-192x192.png" alt="Café Club TV Logo" width={40} height={40} />
        </Flex>

        <Flex display={{ base: "none", md: "flex" }}>
          <Stack direction={"row"} spacing={4}>
            <NavLink href="/">
              <FaHome /> Inicio
            </NavLink>
            <NavLink href="/programacion">
              <FaPlay /> Programación
            </NavLink>
            <NavLink href="/shorts">
              <FaYoutube /> Shorts
            </NavLink>
            <NavLink href="/nosotros">
              <FaInfoCircle /> Nosotros
            </NavLink>
          </Stack>
        </Flex>

        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant={"ghost"}
          color="white"
          aria-label={"Toggle Navigation"}
        />
      </Flex>

      {/* Mobile menu */}
      <Box display={{ base: isOpen ? "block" : "none", md: "none" }} bg="brand.500" p={4}>
        <Stack spacing={4}>
          <NavLink href="/">
            <FaHome /> Inicio
          </NavLink>
          <NavLink href="/programacion">
            <FaPlay /> Programación
          </NavLink>
          <NavLink href="/shorts">
            <FaYoutube /> Shorts
          </NavLink>
          <NavLink href="/nosotros">
            <FaInfoCircle /> Nosotros
          </NavLink>
        </Stack>
      </Box>
    </Box>
  )
}

