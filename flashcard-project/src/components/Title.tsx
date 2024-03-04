import { Flex, Box } from '@chakra-ui/react'

const Title = () => {
  return (
    <Flex justifyContent={"center"} padding={'20px'} fontSize={'30px'} fontFamily={'Lilita One'} textColor={'brand.green'}>
        <Box>Jonah's Grammar Studio</Box>
    </Flex>
  )
}

export default Title