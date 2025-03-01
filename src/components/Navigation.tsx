import { Box, Flex, useDisclosure } from "@chakra-ui/react"
import { FaHome, FaCalendarAlt, FaYoutube, FaAd } from "react-icons/fa"
import Link from "next/link"

const NavItem = ({ icon, href, label }) => (
  <Link href={href} passHref>
    <Flex as="a" align="center" flexDir="column" py={2} px={4} color="whiteAlpha.700" _hover={{ color: "white" }}>
      {icon}
      <Box fontSize="xs" mt={1}>
        {label}
      </Box>
    </Flex>
  </Link>
)

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box position="fixed" bottom={0} left={0} right={0} zIndex={1000}>
      <Flex bg="gray.900" color="white" align="center" justify="space-around" wrap="wrap" py={2} px={4}>
        <NavItem icon={<FaHome size={24} />} href="/" label="Inicio" />
        <NavItem icon={<FaCalendarAlt size={24} />} href="/parrilla" label="Parrilla" />
        <NavItem icon={<FaYoutube size={24} />} href="/shorts" label="Shorts" />
        <NavItem icon={<FaAd size={24} />} href="/sponsors" label="Sponsors" />
      </Flex>
    </Box>
  )
}

