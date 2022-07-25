import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4001/api/v1"
})

// export const addAuth = token => {
//     // instance.defaults.headers.common["Authorization"] = "Bearer " + token;
//     instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

export default instance;