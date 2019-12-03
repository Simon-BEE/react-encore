import React from 'react'
import Axios from 'axios'
import { USERS_API } from '../config';


const register = (user) => {
    return Axios.post(USERS_API, user);
}

export default {register};