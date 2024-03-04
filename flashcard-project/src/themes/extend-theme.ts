import { extendTheme } from "@chakra-ui/react"
import { accordionTheme } from "./accordion-theme"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      green: "#6dd47e",
      yellow: "#ffd55a",
      blue: "#303454"
    },
  },
  components: { Accordion: accordionTheme }
})

export default theme


