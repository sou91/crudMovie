import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://crudmovie-default-rtdb.firebaseio.com/'
})

export default instance;