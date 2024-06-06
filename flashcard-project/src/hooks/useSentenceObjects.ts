import { useEffect, useState } from 'react';
import { Sentence, Keyword  } from "../interfaces"
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const useSentenceObjects = (id: number | undefined, counter: number) => {
    const [sentenceObjects, setSentenceObjects] = useState<Sentence[]|null>();
    const [errorMessage, setErrorMessage] = useState<string|null>();
    
    function isValidSentence(sentence: Sentence): sentence is Sentence {
        return typeof sentence.text === 'string' &&
               Array.isArray(sentence.fragments) &&
               sentence.fragments.every((fragment: string) => typeof fragment === 'string') &&
               Array.isArray(sentence.keywords) &&
               sentence.keywords.every((keyword: Keyword) => 
                   typeof keyword.form === 'string' &&
                   typeof keyword.verb === 'boolean' &&
                   Array.isArray(keyword.contrastives) &&
                   keyword.contrastives.every((form: string) => typeof form === 'string')
               );
    }

    function processSentence(sentence: Sentence): Sentence {
            if (isValidSentence(sentence)) {
                return sentence
            } else {
                console.error("Invalid Sentence object structure:", sentence);
                const customErrorMessage = "Data not in Sentence Object structure";
                throw  customErrorMessage
            }
        }
    
    useEffect(() => {
        if (id) {
            
            const transformSentences = (receivedData: string): Sentence[]|null => {
                try{
                    const parsedData = JSON.parse(receivedData) as Sentence[];   
                    const validatedObjArray: Sentence[] = []
                    parsedData.map((sentence: Sentence) => validatedObjArray.push(processSentence(sentence)));
                    return parsedData
                }   catch (error: any) {
                    return null
                }
            }

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
                    const response = await axios.post(backendUrl, id, {
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
                if (transformedData) {
                    setSentenceObjects(transformedData);
                } else {
                    ;
                }

            }).catch(error => {
                console.error('Failed to fetch sentences:', error);
                setErrorMessage(error);
            });
        }
    }, [counter]); 

    return { sentenceObjects, setSentenceObjects, errorMessage, setErrorMessage } ;
}
