"use client"

import { FaPlay } from "react-icons/fa"
import { IframePlayer } from "../components/IframePlayer"
import {
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  AspectRatio,
  Button,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import { Heading, SimpleGrid, VStack, Box } from "@chakra-ui/layout"
import { Hero } from "../components/Hero"
import { Container } from "../components/Container"
import { MainArea } from "../components/MainArea"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import { ScrollButton } from "../components/ScrollButton"
import { CTA } from "../components/CTA"
import { Footer } from "../components/Footer"
import type { GetStaticProps } from "next"
import { useState } from "react"
import type { Data } from "../lib/types"
import { Navigation } from "../components/Navigation"

/* Fetch Youtube API */
export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
  try {
    const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems"
    const videoCount = 30 // 0 ~ 50

    // Check if environment variables are set
    if (!process.env.PLAYLIST_ID || !process.env.YOUTUBE_API_KEY) {
      console.error("Missing required environment variables: PLAYLIST_ID or YOUTUBE_API_KEY")
      return {
        props: { data: [] }, // Return empty array instead of undefined
        revalidate: 15,
      }
    }

    const REQUEST_URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=${videoCount}&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`
    const response = await fetch(REQUEST_URL)

    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Validate data structure
    if (!data || !data.items || !Array.isArray(data.items)) {
      console.error("Invalid data structure returned from YouTube API")
      return {
        props: { data: [] }, // Return empty array instead of undefined
        revalidate: 15,
      }
    }

    // Filter out any items with undefined values in critical fields
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
      props: { data: [] }, // Return empty array instead of undefined
      revalidate: 15,
    }
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0 })
}

const Index = ({ data }) => {
  // Handle empty data case
  const [currentVideo, setCurrentVideo] = useState(data && data.length > 0 ? data[0] : null)
  // const [playing, setPlaying] = useState(false);
  // <IframePlayer autoPlay={playing}>

  // If no data is available, show a message
  if (!data || data.length === 0) {
    return (
      <Container>
        <Hero />
        <MainArea>
          <Box textAlign="center" p={10}>
            <Heading as="h2" size="lg" mb={4}>
              No videos available
            </Heading>
            <Text>Please check your YouTube API key and playlist ID configuration.</Text>
          </Box>
        </MainArea>
        <DarkModeSwitch />
        <Footer>
          <VStack m={3} textAlign="center">
            <Text fontSize="lg">
              Designed and Built by{" "}
              <Link href="https://github.com/PeriYumYum" isExternal>
                Peri👒
              </Link>{" "}
              ©2023
            </Text>
            <CTA />
          </VStack>
        </Footer>
      </Container>
    )
  }

  return (
    <Container>
      <Navigation />
      <Hero />
      <Box pt="60px">
        {" "}
        {/* Add padding to account for fixed navigation */}
        {currentVideo && <IframePlayer video_id={currentVideo.snippet.resourceId.videoId} />}
        <MainArea>
          <Tabs variant="soft-rounded" colorScheme="brand" isLazy>
            <TabList mb={4}>
              <Tab>Todos</Tab>
              <Tab>Shows</Tab>
              <Tab>Shorts</Tab>
              <Tab>Sponsors</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={[1, 2, 3]} spacingX={[2, 6, 8]} spacingY={10}>
                  {data.map((video: Data) => (
                    <Card
                      key={video.id}
                      borderRadius="xl"
                      bg="white"
                      shadow="md"
                      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                      transition="all 0.2s"
                      overflow="hidden"
                    >
                      <CardBody p="0">
                        <AspectRatio maxW="560px" ratio={16 / 9}>
                          <Image
                            src={video.snippet.thumbnails.high.url || "https://via.placeholder.com/300"}
                            alt={`${video.snippet.title} thumbnail`}
                            objectFit="cover"
                          />
                        </AspectRatio>
                        <Box p={4}>
                          <Heading as="h2" size="sm" noOfLines={2}>
                            {video.snippet.title}
                          </Heading>
                          <Text color="gray.600" fontSize="sm" mt={1}>
                            {video.snippet.videoOwnerChannelTitle}
                          </Text>
                        </Box>
                      </CardBody>
                      <CardFooter p={4} pt="0">
                        <Button
                          leftIcon={<FaPlay />}
                          onClick={() => {
                            setCurrentVideo(video)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                          colorScheme="brand"
                          variant="solid"
                          size="sm"
                          width="full"
                        >
                          Reproducir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <Text>Contenido de Shows próximamente...</Text>
              </TabPanel>
              <TabPanel>
                <Text>Contenido de Shorts próximamente...</Text>
              </TabPanel>
              <TabPanel>
                <Text>Contenido de Sponsors próximamente...</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MainArea>
      </Box>
      <DarkModeSwitch />
      <ScrollButton />
      <Footer />
    </Container>
  )
}

export default Index

