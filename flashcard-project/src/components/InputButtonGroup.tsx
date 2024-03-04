
import { ButtonGroup } from '@chakra-ui/react'
import { InputWithIndex } from "./DisplayCard";
import InputButton from "./InputButton";

interface Props {
    handleButtonClick: (option: string, index: number) => void;
    buttonValues: string[];
    fragmentIndex: number;
    selectedInputs: InputWithIndex[]|null|undefined;
}

// Main component
const InputButtonGroup = ({ buttonValues, handleButtonClick, selectedInputs, fragmentIndex }: Props) => {
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


