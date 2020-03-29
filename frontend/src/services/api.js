import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:3333',
//Utilizada para definir a base de url em sí da aplicação, que não será alterada
})

export default api;