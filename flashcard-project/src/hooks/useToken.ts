import { useEffect } from 'react';
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useToken = () => {

    // This could be in your main App component or similar
    useEffect(() => {
        axios.get(`${backendUrl}/get-csrf-token/`, { withCredentials: true })
        .then(response => {
            // CSRF token is now set as a cookie
            return response
        })
        .catch(error => {
            console.error('Error fetching CSRF token', error);
        });
    }, []);
}


