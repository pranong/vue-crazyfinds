import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_PATH || `http://localhost:8085/api`

class UserService {
    getPublicContent() {
        return axios.get(API_URL + '/auth/all');
    }

    getUserBoard() {
        return axios.get(API_URL + '/auth/user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + '/auth/mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + '/auth/admin', { headers: authHeader() });
    }
}

export default new UserService();