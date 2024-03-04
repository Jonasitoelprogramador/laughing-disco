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
  
  interface Props {
    handleLanguageClick: (selectedPoint: number) => void;
    languagesListContent: Language[]
  }
  
  
  const AccordionComp = ({languagesListContent, handleLanguageClick}: Props) => {
    return (
        <Accordion defaultIndex={[0]} allowMultiple textColor={'brand.green'} size="xl" border="1px" borderRadius= "10px" w='300px' borderColor='#e3e6e4'>
          {
          languagesListContent.map((item) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' fontFamily={'Lilita One'}>
                  {item.language}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {item.grammarPoints.map((p) => (
            <AccordionPanel pb={4}>
              <Button variant="link" onClick={() => handleLanguageClick(p.id)} fontFamily={'Lilita One'} textColor={'brand.yellow'}>
                {p.point}
              </Button>
            </AccordionPanel>
            ))}
          </AccordionItem>
          ))}
        </Accordion>
    )
  }
  
  export default AccordionComp
  
  