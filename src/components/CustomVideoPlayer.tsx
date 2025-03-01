"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Box, IconButton, Slider, Flex } from "@chakra-ui/react"
import { FaPlay, FaPause, FaExpand } from "react-icons/fa"

interface CustomVideoPlayerProps {
  src: string
  poster?: string
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration
      videoRef.current.currentTime = time
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <Box position="relative">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        style={{ width: "100%", height: "auto" }}
        onTimeUpdate={handleProgress}
      />
      <Flex position="absolute" bottom={0} left={0} right={0} bg="rgba(0,0,0,0.7)" p={2} alignItems="center">
        <IconButton
          aria-label={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlay}
          size="sm"
          mr={2}
        />
        <Slider flex={1} value={progress} onChange={handleSeek} mr={2} />
        <IconButton aria-label="Fullscreen" icon={<FaExpand />} onClick={handleFullscreen} size="sm" />
      </Flex>
    </Box>
  )
}

