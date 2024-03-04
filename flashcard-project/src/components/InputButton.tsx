import { Box, Button } from '@chakra-ui/react';

interface Props {
    option: string;
    fragmentIndex: number;
    isSelected: boolean|undefined;
    handleButtonClick: (option: string, index: number) => void;
}

const InputButton = ({ option, fragmentIndex, isSelected, handleButtonClick }: Props) => {
    const buttonStyles = 
     {
        _hover: {
          paddingLeft: "11px",
          paddingRight: "11px"
        },
        border: '1px',
        borderColor: '#e3e6e4',
        paddingLeft: '10px',
        paddingRight: '10px',
        size: '2',
        textColor: isSelected ? "orange" : "brand.green",
        shadow: isSelected ? "" : "3px 3px #949492"
    };
  
    return (
        <Box display={'inline'} paddingLeft={'1px'} paddingRight={'1px'} _hover= {{paddingLeft: "0",paddingRight: "0"}}>
            <Button {...buttonStyles} onClick={() => handleButtonClick(option, fragmentIndex)}>
                {option}
            </Button>
        </Box>
    );
  };

export default InputButton