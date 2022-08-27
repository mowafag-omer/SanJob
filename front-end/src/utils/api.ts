import axios from 'axios';

const instance = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:4001/api/v1"
})

instance.defaults.headers.common["Access-Control-Allow-Origin"]= "*"
// export const addAuth = token => {
//     // instance.defaults.headers.common["Authorization"] = "Bearer " + token;
//     instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

export default instance;