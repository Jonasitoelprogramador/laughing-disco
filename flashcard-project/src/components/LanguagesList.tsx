import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, 
  Button, 
  Box
}
 from '@chakra-ui/react' 

import { Language } from '../interfaces'
import Navbar from './Navbar';

interface Props {
  handleLanguageClick: (selectedPoint: number) => void;
  languagesListContent: Language[]
}


const LanguagesList = () => {
  return (
      <Navbar></Navbar>
  )
}

export default LanguagesList

