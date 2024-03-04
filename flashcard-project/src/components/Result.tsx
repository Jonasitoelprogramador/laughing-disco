import { Badge, Box } from '@chakra-ui/react';
import { InputWithIndex } from "./DisplayCard";
import styles from '../css_modules/Result.module.css'

interface Props {
    // selectedInputs and result can't actually be undefined given the logic in the DisplayCard page
    // In order to keep TS happy, however, I have adding in an undefined possibility and logic in the function...
    // ...in order to legislate for if the values are undefined
    selectedInputs: InputWithIndex[] | undefined;
    index: number;
    result: boolean | undefined;
}

const Result = ({selectedInputs, index, result}: Props) => {
  function renderComponent() {
    if (selectedInputs && result !== undefined) {
        return (
          <Box lineHeight={'20px'} display={'inline'}>
            {result === true ?
            <>
                <Box display={'inline'} className={styles.CorrectResult}>{selectedInputs[index].input}</Box>
                <Badge colorScheme='green'>correct!</Badge>
            </>
            :
            <>
                <Box display={'inline'} className={styles.IncorrectResult}>{selectedInputs[index].input}</Box>
                <Badge colorScheme='red'>incorrect!</Badge>
            </>}
          </Box>
        )
      }
    else {
      return null
    }
  }
  return (
    renderComponent()
  )
}



export default Result