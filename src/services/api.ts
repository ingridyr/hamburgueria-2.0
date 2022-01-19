import axios from 'axios';

const api = axios.create({
    baseURL: "https://kenzie-burguer2.herokuapp.com",
})

export default api;