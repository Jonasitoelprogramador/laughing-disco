import { Badge } from '@chakra-ui/react';
import { InputWithIndex } from "./DisplayCard";
import styles from '../css_modules/Result.module.css'

interface Props {
    selectedInputs: InputWithIndex[];
    index: number;
    result: boolean | undefined;
}

const Correct = ({selectedInputs, index, result}: Props) => {
  
  return (
    result === true ?
    <>
        <span className={styles.CorrectResult}>{selectedInputs[index].input}</span>
        <Badge colorScheme='green'>correct!</Badge>
    </>
    :
    <>
        <span className={styles.IncorrectResult}>{selectedInputs[index].input}</span>
        <Badge colorScheme='red'>incorrect!</Badge>
    </>
    
  )
}

export default Correct