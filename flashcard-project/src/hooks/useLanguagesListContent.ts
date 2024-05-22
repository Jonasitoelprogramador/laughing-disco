import { useEffect, useState } from 'react';
import axios from "axios";
import { Language } from '../interfaces';

export const useLanguagesListContent = (): Language[] => {
    const [languages, setLanguages] = useState<Language[]>([]);
    
    // This could be in your main App component or similar
    useEffect(() => {
        axios.get('https://flashcards-backend-ff2b7ae149b6.herokuapp.com/get-languages-content/')
        .then(response => {
            setLanguages(response.data[1])
        })
        .catch(error => {
            console.error('Error fetching languages/grammar dict', error);
        });
    }, []);

    return languages
}