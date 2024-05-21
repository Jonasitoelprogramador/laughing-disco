import { Button, ButtonGroup, Flex } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

interface Props {
  checkSubmit: () => boolean | undefined | null;
  finalMessage: boolean;
  handleSubmit: () => void;
  handleNext: () => void;
  handleSkip: () => void;
}

const ButtonPanel = ({finalMessage, handleSubmit, handleNext, handleSkip, checkSubmit}: Props) => {
  
  const buttonStyles = {
    bgColor:'brand.yellow',
    fontSize: { base: '20px', sm: '25px', md: '30px' }, // Responsive font size
    _hover: { padding: '17px' },
    _active: {shadow: 'none'},
    shadow:'3px 3px #b2953e'
  }
  
  function renderComponent() {
    const submitted = checkSubmit()
    if (!finalMessage && !submitted) { 
        return  <Button type="submit" onClick={() => handleSubmit()} {...buttonStyles}>Submit</Button>
    }
    else if (!finalMessage && submitted) {
      return <Button onClick={() => handleNext()} {...buttonStyles}>Next</Button>
    }
  }
  return (
    <>
      <Flex alignItems="center" justifyContent="center" position={'absolute'} bottom={'65px'} left={'0'} right={'0'} textAlign={'center'}>
          <ButtonGroup spacing='1'>
            {renderComponent()}
          </ButtonGroup>
      </Flex>
      <Button position={'absolute'} bottom={'10px'} right={'10px'} onClick={() => handleSkip()} {...buttonStyles}>Skip<FontAwesomeIcon icon={faRightLong} size='sm'/></Button>
    </>
  )
}

export default ButtonPanel