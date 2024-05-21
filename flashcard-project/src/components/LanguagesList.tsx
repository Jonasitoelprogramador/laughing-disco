import { Language } from '../interfaces'
import Navbar from './Navbar';

interface Props {
  handleLanguageClick: (selectedPoint: number, selectedLanguage: Language) => void;
  languagesListContent: Language[];
  selectedLanguage: Language|undefined;
}


const LanguagesList = ({languagesListContent, handleLanguageClick, selectedLanguage}: Props) => {
  return (
      <Navbar languagesListContent={languagesListContent} handleLanguageClick={handleLanguageClick} selectedLanguage={selectedLanguage}></Navbar>
  )
}

export default LanguagesList

