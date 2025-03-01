"use client"

import { useState } from "react"
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  AspectRatio,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react"
import { Layout } from "../components/Layout"
import { CustomVideoPlayer } from "../components/CustomVideoPlayer"
import { motion } from "framer-motion"
import type { GetStaticProps } from "next"
import type { Data } from "../lib/types"

export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
  try {
    const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems"
    const videoCount = 30 // 0 ~ 50

    if (!process.env.PLAYLIST_ID || !process.env.YOUTUBE_API_KEY) {
      console.error("Missing required environment variables: PLAYLIST_ID or YOUTUBE_API_KEY")
      return {
        props: { data: [] },
        revalidate: 15,
      }
    }

    const REQUEST_URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=${videoCount}&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`
    const response = await fetch(REQUEST_URL)

    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data || !data.items || !Array.isArray(data.items)) {
      console.error("Invalid data structure returned from YouTube API")
      return {
        props: { data: [] },
        revalidate: 15,
      }
    }

    const validItems = data.items.filter(
      (item) =>
        item &&
        item.snippet &&
        item.snippet.resourceId &&
        item.snippet.resourceId.videoId &&
        item.snippet.thumbnails &&
        item.snippet.thumbnails.high,
    )

    return {
      props: { data: validItems },
      revalidate: 15,
    }
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error)
    return {
      props: { data: [] },
      revalidate: 15,
    }
  }
}

const MotionBox = motion(Box)

const Index = ({ data }) => {
  const [currentVideo, setCurrentVideo] = useState(data && data.length > 0 ? data[0] : null)
  const bgColor = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "white")

  return (
    <Layout>
      <VStack spacing={8} align="stretch" px={4}>
        {/* Banner publicitario */}
        <Box
          bg="brand.500"
          p={4}
          borderRadius="xl"
          color="white"
          boxShadow="xl"
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Text fontSize="lg" fontWeight="bold" textAlign="center">
            ¡Oferta especial! Suscríbete ahora y obtén un 20% de descuento
          </Text>
        </Box>

        {/* Reproductor de video principal */}
        {currentVideo && (
          <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <CustomVideoPlayer
              src={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
              poster={currentVideo.snippet.thumbnails.high.url}
            />
            <Box p={4} bg={bgColor} borderRadius="xl" mt={4} boxShadow="md">
              <Heading size="md" color={textColor}>
                {currentVideo.snippet.title}
              </Heading>
              <Text mt={2} color={textColor}>
                {currentVideo.snippet.description}
              </Text>
            </Box>
          </MotionBox>
        )}

        {/* Parrilla de programas */}
        <Box>
          <Heading size="lg" mb={4} color={textColor}>
            Parrilla de Programas
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
            {data.map((video: Data) => (
              <MotionBox key={video.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={video.snippet.thumbnails.high.url || "/placeholder.svg"}
                    alt={video.snippet.title}
                    objectFit="cover"
                    borderRadius="xl"
                  />
                </AspectRatio>
                <Text mt={2} fontWeight="bold" noOfLines={2} color={textColor}>
                  {video.snippet.title}
                </Text>
                <Button mt={2} size="sm" onClick={() => setCurrentVideo(video)} colorScheme="brand" width="full">
                  Ver ahora
                </Button>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>

        {/* Shorts */}
        <Box>
          <Heading size="lg" mb={4} color={textColor}>
            Shorts
          </Heading>
          <HStack overflowX="auto" spacing={4} pb={4}>
            {[1, 2, 3, 4, 5].map((i) => (
              <MotionBox key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Box
                  w="120px"
                  h="200px"
                  bg="brand.500"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text textAlign="center" color="white" fontWeight="bold">
                    Short {i}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </HStack>
        </Box>

        {/* Sponsors */}
        <Box>
          <Heading size="lg" mb={4} color={textColor}>
            Sponsors
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={8}>
            {[1, 2, 3, 4].map((i) => (
              <MotionBox key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Box
                  w="100%"
                  aspectRatio={1}
                  bg={bgColor}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="md"
                >
                  <Text textAlign="center" color={textColor} fontWeight="bold">
                    Sponsor {i}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Layout>
  )
}

export default Index

