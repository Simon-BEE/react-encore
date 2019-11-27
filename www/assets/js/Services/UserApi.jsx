import React from 'react'
import Axios from 'axios'

const register = (user) => {
    return Axios.post('http://localhost:8180/api/users', user);
}

export default {register};