import { Flex, Grid, GridItem } from '@chakra-ui/react'

import  DisplayCard from "./components/DisplayCard"
import Title from "./components/Title"
import LanguagesList from "./components/LanguagesList"

import { useState } from "react"

import { useToken } from './hooks/useToken'
import { useLanguagesListContent } from './hooks/useLanguagesListContent'
import { useDisplayedContent } from './hooks/useDisplayedContent'

function App() {
  // decides whether finalMessage should be displayedSentenceed in the UI
  const [finalMessage, setFinalMessage] = useState<boolean>(false)
  // gets CSRF token
  useToken() 
  // gets the list of languages and  points that are displayed in the sidebar
  const languagesListContent = useLanguagesListContent()
  //id of the grammar point as defined in backend.  Set by handleLanguageClick function that is passed to LanguagesList component.
  const [grammarPointId, setGrammarPointId] = useState<number|null>(null)
  // used to in useDisplayedContent's dependency array to ensure consistent refreshes
  const [counter, setCounter] = useState<number>(0);
  // takes grammar point ID from LanguageList and passes to the API to get sentences and buton values.
  const {displayedContent, setDisplayedContent, error} = useDisplayedContent(grammarPointId, counter)

  //const [loading, setLoading] = useState(false);

  const finalMessageTrue = () => {
    setFinalMessage(true)
  }
  
  // this is passed to LanguagesList in order to "raise the state" of the grammar point ID
  const handleLanguageClick = (pointId: number) => {
    setFinalMessage(false)
    setDisplayedContent(undefined)
    setGrammarPointId(pointId);
    setCounter(prev => prev + 1);
  }
  
  //useEffect(() => {
    // When displayedContent changes, check if it's available and update loading accordingly
  //  if (displayedContent) {
  //    setLoading(false); // Set loading to false once displayedContent is available
  //  }
  //}, [displayedContent]);

  return (
    <>
      <Grid
      height={
        "100%"
      } 
      templateAreas={{
        base: `"head head"
               "nav main"`
        //lg: `"nav nav" "aside main"`
      }}
      templateColumns= {{
        base: "250px 1fr" 
        //lg: "250px 1fr" 
      }}
      
      >
        <GridItem gridArea="head">
          <Title></Title>
        </GridItem>
        <GridItem gridArea="nav">
          <LanguagesList languagesListContent={languagesListContent} handleLanguageClick={handleLanguageClick}></LanguagesList>
        </GridItem>
        <GridItem gridArea="main">
          <Flex justifyContent="center" alignItems="center" margin="20px">
            <DisplayCard displayedContent={displayedContent && displayedContent} error={error && error} finalMessageTrue={finalMessageTrue} finalMessage={finalMessage}></DisplayCard>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
