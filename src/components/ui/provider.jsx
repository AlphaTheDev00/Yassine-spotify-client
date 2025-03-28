'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Create a theme
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export function Provider({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
