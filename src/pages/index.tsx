"use client"

import { useState } from "react"
import { Box, VStack, HStack, Heading, Text, Image, AspectRatio, Button } from "@chakra-ui/react"
import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { Navigation } from "../components/Navigation"
import { IframePlayer } from "../components/IframePlayer"
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

const Index = ({ data }) => {
  const [currentVideo, setCurrentVideo] = useState(data && data.length > 0 ? data[0] : null)

  return (
    <Container>
      <Hero />
      <Box pb={20}>
        {" "}
        {/* Add padding at the bottom for the navigation bar */}
        <VStack spacing={8} align="stretch">
          {/* Banner publicitario */}
          <Box bg="brand.500" p={4} textAlign="center">
            <Text fontSize="lg" fontWeight="bold">
              ¡Oferta especial! Suscríbete ahora y obtén un 20% de descuento
            </Text>
          </Box>

          {/* Reproductor de video principal */}
          {currentVideo && (
            <Box>
              <IframePlayer video_id={currentVideo.snippet.resourceId.videoId} />
              <Box p={4}>
                <Heading size="md">{currentVideo.snippet.title}</Heading>
                <Text mt={2}>{currentVideo.snippet.description}</Text>
              </Box>
            </Box>
          )}

          {/* Parrilla de programas */}
          <Box>
            <Heading size="lg" mb={4}>
              Parrilla de Programas
            </Heading>
            <HStack overflowX="auto" spacing={4} p={4}>
              {data.map((video: Data) => (
                <Box key={video.id} w="200px" flexShrink={0}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={video.snippet.thumbnails.high.url || "/placeholder.svg"}
                      alt={video.snippet.title}
                      objectFit="cover"
                    />
                  </AspectRatio>
                  <Text mt={2} fontWeight="bold" noOfLines={2}>
                    {video.snippet.title}
                  </Text>
                  <Button mt={2} size="sm" onClick={() => setCurrentVideo(video)}>
                    Ver ahora
                  </Button>
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Shorts */}
          <Box>
            <Heading size="lg" mb={4}>
              Shorts
            </Heading>
            <HStack overflowX="auto" spacing={4} p={4}>
              {/* Aquí irían los shorts, por ahora usaremos datos de ejemplo */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Box key={i} w="120px" h="200px" bg="gray.700" borderRadius="md" flexShrink={0}>
                  <Text textAlign="center" lineHeight="200px">
                    Short {i}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Sponsors */}
          <Box>
            <Heading size="lg" mb={4}>
              Sponsors
            </Heading>
            <HStack justify="center" spacing={8} p={4}>
              {/* Aquí irían los logos de los sponsors */}
              {[1, 2, 3].map((i) => (
                <Box key={i} w="100px" h="100px" bg="gray.700" borderRadius="full">
                  <Text textAlign="center" lineHeight="100px">
                    Sponsor {i}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
      <Navigation />
    </Container>
  )
}

export default Index

