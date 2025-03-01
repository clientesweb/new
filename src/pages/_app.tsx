"use client"

import { useEffect } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

