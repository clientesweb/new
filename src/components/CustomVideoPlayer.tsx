"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Box, IconButton, Slider, Flex, Text, Progress } from "@chakra-ui/react"
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from "react-icons/fa"

interface CustomVideoPlayerProps {
  src: string
  poster?: string
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener("loadedmetadata", () => setDuration(video.duration))
      video.addEventListener("timeupdate", handleTimeUpdate)
      return () => {
        video.removeEventListener("loadedmetadata", () => setDuration(video.duration))
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [])

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration
      videoRef.current.currentTime = time
      setProgress(value)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value
      setVolume(value)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Box position="relative" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      <video ref={videoRef} src={src} poster={poster} style={{ width: "100%", height: "auto" }} />
      {showControls && (
        <Flex
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0,0,0,0.7)"
          p={2}
          alignItems="center"
          transition="opacity 0.3s"
          opacity={showControls ? 1 : 0}
        >
          <IconButton
            aria-label={isPlaying ? "Pause" : "Play"}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={togglePlay}
            size="sm"
            mr={2}
          />
          <Text fontSize="sm" color="white" mr={2}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <Slider flex={1} value={progress} onChange={handleSeek} mr={2} />
          <Flex alignItems="center" width="100px">
            <IconButton
              aria-label={volume === 0 ? "Unmute" : "Mute"}
              icon={volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
              size="sm"
              mr={2}
            />
            <Slider value={volume} onChange={handleVolumeChange} min={0} max={1} step={0.1} width="60px" />
          </Flex>
          <IconButton
            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            icon={isFullscreen ? <FaCompress /> : <FaExpand />}
            onClick={handleFullscreen}
            size="sm"
          />
        </Flex>
      )}
      <Progress value={progress} position="absolute" bottom={0} left={0} right={0} height="2px" />
    </Box>
  )
}

