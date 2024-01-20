import { Card, CardBody, Button, ButtonGroup, Flex } from '@chakra-ui/react'
import { DisplayedContent, Sentence } from '../interfaces';
import { useEffect, useState } from 'react';
import MyForm from './MyForm';
import Result from './Result'; 


interface Props {
    displayedContent?: DisplayedContent;
    error?: Error | null;
    finalMessageTrue: () => void;
    finalMessage: boolean;
}

export interface Option {
    id: number;
    value: string;
  }

export interface InputWithIndex {
    input: string;
    fragmentIndex: number;
    result?: boolean;
}

//get rid of the results array that we don't need

// how do we deal with buttonValues and sentences being undefined? 
// they can be undefined either at the beginning or when there is an error
const displayedSentenceCard = ({displayedContent, error, finalMessageTrue, finalMessage}: Props) => {
  // used to bring up correct sentence.  Used in handleNext.
  const [pageIndex, setPageIndex] = useState<number>(0);
  //the sentence currently being displayed on the forntend.  Set using an effect hook that uses the current index to slice the correct sentence.
  const [displayedSentence, setDisplayedSentence] = useState<Sentence>();
  // values and fragment index of the buttons that have been clicked. Set by handleButtonClick which is passed to MyForm.
  const [selectedInputs, setSelectedInputs] = useState<InputWithIndex[]>([]);

  //const totalLength = sentences.length
  const finalMessageContent = "All Done!"

  const handleButtonClick = (input: string, fragmentIndex: number) => {
    setSelectedInputs(prevItems => {
        // this gets all the items that were previously in the array and creates a new array with only the previous items that don't match the fragmentIndex in question
        // basically you are creating an array of objects whose fragmmentIndex does not match the current fragment index.
        // the point of this is to deal with siuations in which the user might click one input and then change their mind and choose another input before submission.
        const filteredItems = prevItems.filter(item => item.fragmentIndex !== fragmentIndex);
        // then, you take filteredItems and add the another InputWithIndex object with the current value and index.
        return [...filteredItems, { input, fragmentIndex }];
        });
    };

  // checks whether the selectedInputs values are correct and returns a results array.
  const handleSubmit = () => {
    // You first check that the length of the fragments array is the same as the length of the selected inputs.
    if (displayedSentence && displayedSentence?.fragments.length - 1 == selectedInputs.length) {
        //Then you loop through the selected inputs and for each input you define a “keyword” which is the keyword from displayedSentence related to the input in question.
        const updatedInputs = selectedInputs.map(input => {
        const keyword = displayedSentence.keywords[input.fragmentIndex];
        //You return the selectedInput element that has been spread as well as a boolean depending on if the keyword in question matches the input of the current selectedInput object.
        return {
          ...input,
          result: input.input === keyword
        };
      });
      setSelectedInputs(updatedInputs);
    } else {
      alert('Please select a value for all blanks!');
    }
  };
  
  const handleNext = () => {
    // checks that the selectedInputs isn't empty and that all the selectedInput objects have a result property that is a boolean...
    // ...this is to check that the submit has occured because if the submit doesn't happen, there will be no result property on the selectedInput elements
    const every = selectedInputs.length > 0 && selectedInputs.every(item => 
        typeof item.result === 'boolean'
    );
    // check setences isn't undefined incase this is run before sentences are displayed (this shouldn't happen anyway)
    if (displayedContent?.sentences) {
        // if submit has occurred... 
        if (every) {
            // ...and iterated over all sentences, set finalMessage to true and reset iindex and selectedInputs
            if (displayedContent.sentences.length - 1 === pageIndex) {
                finalMessageTrue();
                setPageIndex(0);
                setSelectedInputs([]);
            // increase index by 1 and delete current selectedInputs.
            } else {
                setPageIndex(pageIndex + 1);
                setSelectedInputs([]);
            }
        // catch if there is no submit
        } else {
            alert('Please submit before moving on!');
        }
    // if sentences have not been loaded in
    } else {
        alert('No sentences to display, please select a grammar point.');
    }
  };

  // Used to get the requisite sentence from the sentences array.
  useEffect(() => {
    if (displayedContent?.sentences && displayedContent.sentences.length > 0) {
        displayedContent.sentences[pageIndex] && setDisplayedSentence(displayedContent.sentences[pageIndex]);
    }
  }, [displayedContent, pageIndex]);
  
  // logic that checks various parameters and returns different options
  function renderComponent() {
    if (finalMessage) {
        return <span>{finalMessageContent}</span>
    }
    else if (error) {
        return <span>Error: {error.message}</span>
    }
    // checks that displayedSentence and buttonValues are not undefined 
    else if (displayedSentence && displayedContent?.buttonValues) {
        return (
            <>
                {displayedSentence?.fragments.map((fragment:string, fragmentIndex) => 
                fragmentIndex != displayedSentence?.fragments.length - 1 ?
                <>  
                    <span>{fragment}</span>
                    {selectedInputs[fragmentIndex] && selectedInputs[fragmentIndex].result !== undefined 
                    ? 
                    <Result selectedInputs={selectedInputs} index={fragmentIndex} result={selectedInputs[fragmentIndex].result}></Result> 
                    :
                    <MyForm handleButtonClick={handleButtonClick} buttonValues={displayedContent.buttonValues} fragmentIndex={fragmentIndex} selectedInputs={selectedInputs}></MyForm>}
                </>
                :
                <>
                    <span>{fragment}</span>
                </>
                )}
                <Flex justify="center">
                    <ButtonGroup spacing='1'>
                        {!finalMessage && 
                        <>
                            <Button type="submit" onClick={() => handleSubmit()}>Submit</Button>
                            <Button onClick={() => handleNext()}>Next</Button>
                        </>
                        }
                    </ButtonGroup>
                </Flex>
            </>
        )
    }
    // if no error, no final message and displayedSentence but buttonValues are undefined return loading
    else {
        return <span>Loading...</span>
    }
  }

  return (
    <Card>
        <CardBody>
            {renderComponent()}
        </CardBody>
    </Card>
  )
}

export default displayedSentenceCard