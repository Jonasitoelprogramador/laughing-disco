import { Box } from '@chakra-ui/react'
import { Sentence } from '../interfaces';
import { InputWithIndex } from '../interfaces';
import Result from './Result';
import InputButtonGroup from './InputButtonGroup';
import React from 'react';

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
                        <React.Fragment key={fragmentIndex}> {/* Added key prop here */}
                            <Box display={'inline'}>{fragment}</Box>
                            {fragmentIndex !== displayedSentence.fragments.length - 1 
                                ? (
                                    <>
                                        {selectedInputs && selectedInputs[fragmentIndex] && selectedInputs[fragmentIndex].result !== undefined 
                                            ? <Result selectedInputs={selectedInputs} index={fragmentIndex} result={selectedInputs[fragmentIndex].result} /> 
                                            : <InputButtonGroup handleButtonClick={handleButtonClick} displayedSentence={displayedSentence} fragmentIndex={fragmentIndex} selectedInputs={selectedInputs} />
                                        }
                                    </>
                                ) 
                                : null
                            }
                        </React.Fragment>
                    )}
                </Box>
            );
        } else {
            return null;
        }
    }
    return renderComponent();
}

export default InnerCard