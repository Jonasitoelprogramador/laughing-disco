import axios from "axios";
import { GrammarInfo } from "./interfaces";


const getCsrfToken = () => {
    const allCookies = document.cookie.split(';');
    const csrfCookie = allCookies.find(cookie => cookie.trim().startsWith('csrftoken='));
    if (!csrfCookie) return null;
    return csrfCookie.split('=')[1];
  };
  
  
export const getDataFromAPI = async <T>(
    endpoint: string,
    dataToSend: GrammarInfo, 
    transformFn: (data: any) => T[]
): Promise<T[]> => {
    const csrfToken = getCsrfToken();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = "X-CSRFToken"
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.post(endpoint, dataToSend, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        });

        const transformedData = transformFn(response.data[1]);
        
        return transformedData;
    } catch (error) {
        console.error("API Error:", error);
        throw error; 
    }
}

