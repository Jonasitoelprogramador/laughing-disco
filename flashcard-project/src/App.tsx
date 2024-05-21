import { Grid, GridItem } from '@chakra-ui/react'

import DisplayCard from "./components/DisplayCard"
import { InputWithIndex } from "./interfaces"
import Title from "./components/Title"
import LanguagesList from "./components/LanguagesList"

import { useState } from "react"

import { useToken } from './hooks/useToken'
import { useLanguagesListContent } from './hooks/useLanguagesListContent'
import { useSentenceObjects } from './hooks/useSentenceObjects'
import { Language } from './interfaces'

function App() {
  // decides whether finalMessage should be displayedSentenceed in the UI
  const [finalMessage, setFinalMessage] = useState<boolean>(false)
  // gets CSRF token
  useToken() 
  // gets the list of languages and points that are displayed in the sidebar
  const languagesListContent = useLanguagesListContent()
  //id of the grammar point as defined in backend.  Set by handleLanguageClick function that is passed to LanguagesList component.
  const [grammarPointId, setGrammarPointId] = useState<number>()
  // used to in useDisplayedContent's dependency array to ensure consistent refreshes
  const [counter, setCounter] = useState<number>(0);
  // takes grammar point ID from LanguageList and passes to the API to get sentences and buton values.
  const {sentenceObjects, setSentenceObjects, errorMessage, setErrorMessage} = useSentenceObjects(grammarPointId, counter)
  // values and fragment index of the buttons that have been clicked. Set by handleButtonClick which is passed to InputButtonGroup.
  const [selectedInputs, setSelectedInputs] = useState<InputWithIndex[]|null>();
  // used to bring up correct sentence.  Used in handleNext.
  const [pageIndex, setPageIndex] = useState<number>(0);
  // used to set the Language that the user has selected
  const [selectedLanguage, setSelectedLanguage] = useState<Language>()


  const finalMessageTrue = () => {
    setFinalMessage(true)
  }
  
  // this is passed to LanguagesList in order to "raise the state" of the grammar point ID
  const handleLanguageClick = (pointId: number, language: Language) => {
    setFinalMessage(false)
    setSentenceObjects(null)
    setGrammarPointId(pointId);
    setCounter(prev => prev + 1);
    setErrorMessage(null);
    setSelectedInputs(null);
    setPageIndex(0)
    setSelectedLanguage(language)
  }
  console.log(selectedLanguage)

  return (
    <>
      <Grid
      height={
        "100vh"
      }
      width={
        "100vw"
      }
      templateAreas={{
        base: `"head"
               "nav" 
               "main"`
        //lg: `"nav nav" "aside main"`
      }}
      templateRows= {{
        base: "100px 50px 1fr",
        sm: "100px 75px 1fr" 
      }}
      >
        <GridItem gridArea="head" display="flex" alignItems="center" justifyContent="center" bgColor={'brand.blue'}>
          <Title></Title>
        </GridItem>
        <GridItem gridArea="nav" bgColor={'brand.green'}>
          <LanguagesList languagesListContent={languagesListContent} handleLanguageClick={handleLanguageClick} selectedLanguage={selectedLanguage}></LanguagesList>
        </GridItem>
        <GridItem gridArea="main" display={'flex'} justifyContent="center" alignItems="center">
            <DisplayCard sentenceObjects={sentenceObjects && sentenceObjects} errorMessage={errorMessage && errorMessage} finalMessageTrue={finalMessageTrue} finalMessage={finalMessage} selectedInputs={selectedInputs} setSelectedInputs={setSelectedInputs} pageIndex={pageIndex} setPageIndex={setPageIndex}></DisplayCard>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
