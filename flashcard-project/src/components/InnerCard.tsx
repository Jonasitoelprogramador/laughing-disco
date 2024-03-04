import { Box } from '@chakra-ui/react'
import { DisplayedContent, Sentence } from '../interfaces';
import { InputWithIndex } from './DisplayCard';
import Result from './Result';
import InputButtonGroup from './InputButtonGroup';

interface Props {
    displayedSentence: Sentence | undefined; 
    selectedInputs?: InputWithIndex[] | undefined | null;
    handleButtonClick: (input: string, fragmentIndex: number) => void;
    displayedContent: DisplayedContent | undefined | null;
}

const InnerCard = ({displayedSentence, selectedInputs, handleButtonClick, displayedContent}: Props) => {
    function renderComponent() {
        if (displayedContent && displayedSentence) {
            return (
            <Box marginBottom={'120px'} fontSize={'40px'} lineHeight={'60px'}>
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
                <InputButtonGroup handleButtonClick={handleButtonClick} buttonValues={displayedContent.buttonValues} fragmentIndex={fragmentIndex} selectedInputs={selectedInputs}></InputButtonGroup>}
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