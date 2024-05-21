import { Card, CardBody, Flex, Box } from '@chakra-ui/react'
import { InputWithIndex, Sentence } from '../interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ButtonPanel from './ButtonPanel';
import InnerCard from './InnerCard';

export interface Option {
    id: number;
    value: string;
  }

interface Props {
    sentenceObjects?: Sentence[]|null;
    errorMessage?: string | null;
    finalMessageTrue: () => void;
    setSelectedInputs: Dispatch<SetStateAction<InputWithIndex[] | null | undefined>>;
    finalMessage: boolean;
    selectedInputs: InputWithIndex[]|undefined|null;
    setPageIndex: Dispatch<SetStateAction<number>>;
    pageIndex: number;
}

const displayedSentenceCard = ({sentenceObjects, errorMessage, finalMessageTrue, finalMessage, selectedInputs, setSelectedInputs, pageIndex, setPageIndex}: Props) => {
  //the sentence currently being displayed on the forntend.  Set using an effect hook that uses the current index to slice the correct sentence.
  const [displayedSentence, setDisplayedSentence] = useState<Sentence>();

  //const totalLength = sentences.length
  const finalMessageContent = "All Done!"

  // Important: handleButtonClick is passed as an argument to the InputButtonGroup component, for this reason, it requires arguments tha are passed to it
  
  const checkSubmit = () => {
    const every = selectedInputs && selectedInputs.length > 0 && selectedInputs.every(item => 
        typeof item.result === 'boolean'
    );
    return every
  }

  const handleButtonClick = (input: string, fragmentIndex: number) => {
    if (selectedInputs == undefined) {
        setSelectedInputs([{ input, fragmentIndex }])
    } else {
        setSelectedInputs((prevItems: InputWithIndex[] | null | undefined) => {
            const currentItems = prevItems || [];
            // this gets all the items that were previously in the array and creates a new array with only the previous items that don't match the fragmentIndex in question
            // basically you are creating an array of objects whose fragmentIndex does not match the current fragment index.
            // the point of this is to deal with situations in which the user might click one input and then change their mind and choose another input before submission.
            const filteredItems = currentItems.filter(item => item.fragmentIndex !== fragmentIndex);
            // then, you take filteredItems and add another InputWithIndex object with the current value and index.
            return [...filteredItems, { input, fragmentIndex }];
        });
    }
    };

  // Important: iteratePage, handleSubmit, handleNext and handleSkip use component scope variables.  I have decided that this is reasonable because... 
  // ...the functionality of these functions is closely tied with the component.

  const iteratePage = () => {
    // ...and iterated over all sentences, set finalMessage to true and reset index and selectedInputs
    if (sentenceObjects && sentenceObjects.length - 1 <= pageIndex) {
        finalMessageTrue();
        setPageIndex(0);
        setSelectedInputs([]);
    // increase index by 1 and delete current selectedInputs.
    } else {
        setPageIndex(pageIndex + 1);
        setSelectedInputs([]);
    }
    }

  // checks whether the selectedInputs values are correct and returns a results array.
  const handleSubmit = () => {
    // You first check that the length of the fragments array is the same as the length of the selected inputs.
    if (selectedInputs && displayedSentence && displayedSentence?.fragments.length - 1 == selectedInputs.length) {
        //Then you loop through the selected inputs and for each input you define a “keyword” which is the keyword from displayedSentence related to the input in question.
        const updatedInputs = selectedInputs.map(input => {
        const keyword = displayedSentence.keywords[input.fragmentIndex];
        //You return the selectedInput element that has been spread as well as a boolean depending on if the keyword in question matches the input of the current selectedInput object.
        return {
          ...input,
          result: input.input === keyword.form
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
    const every = checkSubmit()
    // check setences isn't undefined incase this is run before sentences are displayed (this shouldn't happen anyway)
    if (sentenceObjects) {
        // if submit has occurred... 
        if (every) {
            iteratePage()
        // catch if there is no submit
        } else {
            alert('Please submit before moving on!');
        }
    // if sentences have not been loaded in
    } else {
        alert('No sentences to display, please select a grammar point.');
    }
  };

  const handleSkip = () => {
    iteratePage()
  }

  // Used to get the requisite sentence from the sentences array.
  useEffect(() => {
    if (sentenceObjects && sentenceObjects.length > 0) {
        sentenceObjects[pageIndex] && setDisplayedSentence(sentenceObjects[pageIndex]);
    }
  }, [sentenceObjects, pageIndex]);
  
  // logic that checks various parameters and returns different options
  function renderComponent() {
    if (finalMessage) {
        return <Box>{finalMessageContent}</Box>
    }
    else if (errorMessage) {
        return <Box>Error: {errorMessage}</Box>
    }
    // checks that displayedSentence and buttonValues are not undefined 
    else if (sentenceObjects) {
        return (
            <Box position={'relative'}>
                <InnerCard displayedSentence={displayedSentence} selectedInputs={selectedInputs} handleButtonClick={handleButtonClick} sentenceObjects={sentenceObjects}></InnerCard>
                <ButtonPanel finalMessage={finalMessage} handleNext={handleNext} handleSkip={handleSkip} handleSubmit={handleSubmit} checkSubmit={checkSubmit}></ButtonPanel>
            </Box>
        )
    }
    // if no error, no final message and displayedSentence but buttonValues are undefined return loading
    else if (sentenceObjects === undefined) {
        return <Flex justifyContent="center" alignItems="center" h={'100%'} position={'relative'}>
                  Click a grammar point to get started!
                </Flex>
    }
    else {
        return <Box>Loading...</Box>
    }
  }

  return (
    // The structure is that we have the Flex item in App component that acts as the flex container...
    // The DisplayCard is a flex item that has no set width - it will just expand to accomodate its children.
    //  When I set the card width here as 80%, the DisplayCard automatically expands to fill its container so...
    // you end up with a situation in which this Card ends up taking up 80% of the flex container
    // You can't add these specifications directions to DisplayCard because it is a custom component.
    <Card boxShadow='10px 10px 5px 0px rgba(0, 0, 0, 0.3)' border='1px' borderColor='#e3e6e4' p='6' rounded='md' w={'70%'} justifyContent="center" alignItems="center" textColor={'brand.blue'} marginTop={'40px'} marginBottom={'40px'}>
        <CardBody fontFamily={'Lilita One'} fontSize="50px" h={"100%"} display={'flex'} justifyContent="center" alignItems="stretch">
            {renderComponent()}
        </CardBody>
    </Card>
  )
}

export default displayedSentenceCard