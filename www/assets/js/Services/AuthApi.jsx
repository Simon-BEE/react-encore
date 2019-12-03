import Axios from "axios";
import jwtDecode from 'jwt-decode';
import { LOGIN_API } from "../config";


const setAxiosToken = (token) => {
    Axios.defaults.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('authToken');
    console.log('setToken with Axios')
}

const setup = () => {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const jwtData = jwtDecode(token);
        console.log('decode', jwtData);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log("Connexion établie");
            return jwtData.id;
        }else{
            logout();
        }
    }else{
        logout();
    }
}

const authenticate = (credentials) => {
    return Axios.post(LOGIN_API, credentials)
                .then(response => response.data.token)
                .then(token => {
                    window.localStorage.setItem('authToken', token);
                    setAxiosToken(token);
                    return true;
                });
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const {exp:expiration} =  jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

const logout = () => {
    window.localStorage.removeItem('authToken');
    delete Axios.defaults.headers['Authorization'];
    console.log('Déconnecté');
}

export default {
    authenticate,
    isAuthenticated,
    setup,
    logout
}