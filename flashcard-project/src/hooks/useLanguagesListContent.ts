import { useEffect, useState } from 'react';
import axios from "axios";
import { Language } from '../interfaces';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useLanguagesListContent = (): Language[] => {
    const [languages, setLanguages] = useState<Language[]>([]);
    
    // This could be in your main App component or similar
    useEffect(() => {
        axios.get(`${backendUrl}/get-languages-content/`)
        .then(response => {
            setLanguages(response.data[1])
        })
        .catch(error => {
            console.error('Error fetching languages/grammar dict', error);
        });
    }, []);

    return languages
}