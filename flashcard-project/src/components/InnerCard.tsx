import { Box } from '@chakra-ui/react'
import { Sentence } from '../interfaces';
import { InputWithIndex } from '../interfaces';
import Result from './Result';
import InputButtonGroup from './InputButtonGroup';

interface Props {
    displayedSentence: Sentence | undefined; 
    selectedInputs?: InputWithIndex[] | undefined | null;
    handleButtonClick: (input: string, fragmentIndex: number) => void;
    sentenceObjects: Sentence[] | undefined | null;
}

const InnerCard = ({displayedSentence, selectedInputs, handleButtonClick, sentenceObjects}: Props) => {
    function renderComponent() {
        if (sentenceObjects && displayedSentence) {
            return (
            <Box marginBottom={'120px'} fontSize={{base: '20px', sm:'30px', md: '40px'}} lineHeight={{base: '35px', sm:'45px', md: '60px'}}>
            {displayedSentence?.fragments.map((fragment:string, fragmentIndex) => 
            fragmentIndex != displayedSentence?.fragments.length - 1 ?
            <>  
                <Box display={'inline'}>{fragment}</Box>
                {/* Checks that selectedInputs exists and has a result property.
                    If this is the case, the InputButtonGroup component is rendered.  */ }
                {selectedInputs && selectedInputs[fragmentIndex] && selectedInputs[fragmentIndex].result !== undefined 
                ? 
                <Result selectedInputs={selectedInputs} index={fragmentIndex} result={selectedInputs[fragmentIndex].result}></Result> 
                :
                <InputButtonGroup handleButtonClick={handleButtonClick} displayedSentence={displayedSentence} fragmentIndex={fragmentIndex} selectedInputs={selectedInputs}></InputButtonGroup>}
            </>
            :
            <>
                <Box display={'inline'}>{fragment}</Box>
            </>
            )
            }
            </Box>)
        }
        else {
            return null
        }
    }
  return (
    renderComponent()
  )
}

export default InnerCard