import axios from "axios";
let endpoint = 'http://127.0.0.1:8000/'

const response = await axios.get(endpoint, {
    params: {
        key: import.meta.env.VITE_API_KEY,
    }})

console.log(response)