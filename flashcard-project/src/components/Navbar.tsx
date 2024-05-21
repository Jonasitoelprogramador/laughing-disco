import { Box, Button, Menu, MenuButton, MenuItem, MenuList,  } from '@chakra-ui/react'
import { Language } from '../interfaces';

interface Props {
  handleLanguageClick: (selectedPoint: number, selectedLanguage: Language) => void;
  languagesListContent: Language[];
  selectedLanguage: Language|undefined; 
}

const Navbar = ({languagesListContent, handleLanguageClick, selectedLanguage}: Props) => {
  return (
    <>
      {
      languagesListContent.map((item) => (  
        <Menu>
          <MenuButton as={Button} h={{ base: '50px', sm: '75px' }} w={{ base: '100px', sm: '120px', md: '190px' }} bgColor={selectedLanguage && selectedLanguage.language === item.language ? "brand.blue" : "brand.green"} color={selectedLanguage && selectedLanguage.language === item.language ? "white" : "brand.blue"} _hover={{ fontSize: { base: '16px', sm: '20px', md: '27px' } }} _active={{  }} fontSize={{base: '14px', sm: '18px', md: '25px'}} borderRadius={'0'}>
            <Box as="span" flex='1' textAlign='left' fontFamily={'Lilita One'} padding={'2px'}>
              {item.language}
            </Box>
          </MenuButton>
          <MenuList bgColor='brand.blue'>
            {item.grammarPoints.map((p) => (
            <MenuItem minH='48px' bgColor='brand.blue' onClick={() => handleLanguageClick(p.id, item)} _hover={{bgColor:'brand.green'}}>
              <Button variant="link" fontFamily={'Lilita One'} textColor={'white'}>
                {p.point}
              </Button>
            </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ))  
      }
    </>
  )
}

export default Navbar

