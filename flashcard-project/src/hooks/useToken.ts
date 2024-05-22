import { useEffect } from 'react';
import axios from "axios";

export const useToken = () => {

    // This could be in your main App component or similar
    useEffect(() => {
        axios.get('https://flashcards-backend-ff2b7ae149b6.herokuapp.com/get-csrf-token/', { withCredentials: true })
        .then(response => {
            // CSRF token is now set as a cookie
            return response
        })
        .catch(error => {
            console.error('Error fetching CSRF token', error);
        });
    }, []);
}
