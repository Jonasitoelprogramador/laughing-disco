import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, 
  Box,
  Button
}
 from '@chakra-ui/react' 

import { Language } from '../interfaces'

interface Props {
  handleLanguageClick: (selectedPoint: number) => void;
  languagesListContent: Language[]
}


const LanguagesList = ({languagesListContent, handleLanguageClick}: Props) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {
      languagesListContent.map((item) => (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {item.language}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        {item.grammarPoints.map((p) => (
        <AccordionPanel pb={4}>
          <Button variant="link" onClick={() => handleLanguageClick(p.id)}>
            {p.point}
          </Button>
          
        </AccordionPanel>
        ))}
      </AccordionItem>
      ))}
    </Accordion>
  )
}

export default LanguagesList