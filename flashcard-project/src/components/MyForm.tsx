import styles from "../css_modules/MyForm.module.css"

import { Button, ButtonGroup } from '@chakra-ui/react'
import { InputWithIndex } from "./DisplayCard";

interface Props {
    handleButtonClick: (option: string, index: number) => void;
    buttonValues: string[];
    fragmentIndex: number;
    selectedInputs: InputWithIndex[]|[];
}

const MyForm = ({ buttonValues, handleButtonClick, fragmentIndex, selectedInputs }: Props) => {
    return (
        <form className={styles.buttonForm}>
          <ButtonGroup spacing='1'>
            {buttonValues.map(option => (
              <Button key={option} type="button" onClick={() => handleButtonClick(option, fragmentIndex)} colorScheme={selectedInputs.some(obj => obj.input === option && obj.fragmentIndex === fragmentIndex) ? "blue" : "gray"}>
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </form>
      );
};

export default MyForm;


