
import { ButtonGroup } from '@chakra-ui/react'
import { InputWithIndex, Sentence } from "../interfaces";
import InputButton from "./InputButton";

interface Props {
    handleButtonClick: (option: string, index: number) => void;
    displayedSentence: Sentence;
    fragmentIndex: number;
    selectedInputs: InputWithIndex[]|null|undefined;
}

// Main component
const InputButtonGroup = ({ displayedSentence, handleButtonClick, selectedInputs, fragmentIndex }: Props) => {
  const keywordObject = displayedSentence.keywords[fragmentIndex]
  const buttonValues: string[] = [...keywordObject.contrastives, keywordObject.form]
  return (
    <ButtonGroup spacing='1'>
      {buttonValues.map(option => {
        const isSelected = !!selectedInputs && selectedInputs.some(obj => obj.input === option && obj.fragmentIndex === fragmentIndex);
        return (
          <InputButton 
            key={option} 
            option={option} 
            fragmentIndex={fragmentIndex} 
            isSelected={isSelected} 
            handleButtonClick={handleButtonClick}
          />
        );
      })}
    </ButtonGroup>
  );
};


export default InputButtonGroup;


