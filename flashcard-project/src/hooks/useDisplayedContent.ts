import { useEffect, useState } from 'react';
import { DisplayedContent, SentencesResponse } from "../interfaces"
import axios from "axios";


export const useDisplayedContent = (id: number | undefined, counter: number) => {
    const [displayedContent, setDisplayedContent] = useState<DisplayedContent|null>();
    const [errorMessage, setErrorMessage] = useState<string|null>();
    const isDisplayedContent = (obj: any): obj is DisplayedContent => {
        return 'sentences' in obj && Array.isArray(obj.sentences) &&
               'buttonValues' in obj && Array.isArray(obj.buttonValues);
    };

    useEffect(() => {
        if (id) {
            const transformSentences = (data: SentencesResponse): DisplayedContent => {
                if (data[1] && Array.isArray(data[1]) && data[2]) {
                    const sentences =  data[1].map((point) => ({
                        fragments: point[0],
                        keywords: point[1],
                    }));
                    const displayedContent = { sentences: sentences, buttonValues: data[2] };
                    console.log(displayedContent)
                    if (isDisplayedContent(displayedContent)) {
                        return displayedContent;
                    } else {
                        throw new Error('Invalid data structure created');
                    }
                }
                throw new Error('Invalid data structure returned from API');
            };

            const fetchSentences = async () => {
                const getCsrfToken = () => {
                    const allCookies = document.cookie.split(';');
                    const csrfCookie = allCookies.find(cookie => cookie.trim().startsWith('csrftoken='));
                    if (!csrfCookie) return null;
                    return csrfCookie.split('=')[1];
                };
            
                const csrfToken = getCsrfToken();
                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = "X-CSRFToken"
                axios.defaults.withCredentials = true;
                try {
                    const response = await axios.post('http://127.0.0.1:8000/', id, {
                        headers: {
                            'X-CSRFToken': csrfToken,
                        }
                    });
                    const transformedData = transformSentences(response.data);
                    return transformedData;
                // Axios interprets the Status Code 400 as an error and throws a JS object error
                } catch (error: any) {
                    if (error.response && error.response.data) {
                        // Access custom error message from the server
                        const customErrorMessage = error.response.data.error;
                        throw  customErrorMessage
                    }
                    else {
                        throw error.message
                    }
                }
            };

            fetchSentences().then(transformedData => {
                setDisplayedContent(transformedData);
            }).catch(error => {
                console.error('Failed to fetch sentences:', error);
                setErrorMessage(error);
            });
        }
    }, [counter]); // Dependency array ensures this effect runs when `id` changes

    return { displayedContent, setDisplayedContent, errorMessage, setErrorMessage } ;
}
