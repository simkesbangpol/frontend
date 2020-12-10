import axios from 'axios';
import { store } from '@/store'
import router from '@/router'

const client = axios.create({ baseURL: 'http://localhost:8000/', json: true });
client.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401) {
        store.dispatch('userLogout')
        router.push({name: 'Login'})
        console.info('auth token expired')
    } else if (error.response.status === 403) {
        router.push({name: 'Login'})
    } else {
        return Promise.reject(error)
    }
})
client.interceptors.request.use(function (config) {
    const token = store.state.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

export default client