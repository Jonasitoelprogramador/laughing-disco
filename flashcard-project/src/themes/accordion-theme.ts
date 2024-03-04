import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    border: '0'
  },
  button: {
    fontSize: '40px',
  }
})

const xl = defineStyle({
  fontSize: '20px',
  h: '10'
})

const sizes = {
  xl: definePartsStyle({ icon: xl }),
}

export const accordionTheme = defineMultiStyleConfig({ baseStyle, sizes })