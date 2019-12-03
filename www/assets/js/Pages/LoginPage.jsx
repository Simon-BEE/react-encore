import React, { useState, useContext } from 'react';
import {toast} from 'react-toastify';

import AuthApi from '../Services/AuthApi';
import AuthContext from '../Contexts/AuthContext';
import Field from '../Components/Forms/Field';

const LoginPage = ({history}) => {

    const [credentials, setCredentials] = useState({'username':'', 'password':''});
    const [error, setError] = useState('');
    const {setIsAuthenticated} = useContext(AuthContext);

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name] : value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('USER: ',credentials);

        try {
            await AuthApi.authenticate(credentials);
            setError('');
            setIsAuthenticated(true);
            toast.info('Connexion réussie');
            history.replace('/customers');
            
        } catch (error) {
            console.log('ERROR: ',error.response);
            setError('Identifiants inconnus !');
        }
    }

    return ( 
        <>
            <h1>Connexion à l'application</h1>
            <div className="form">
                <Field name={'username'}
                    type={"email"}
                    label={'Adresse email'}
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder={"Votre adresse email"}
                    error={error}
                />
                <Field name={'password'}
                    type={'password'}
                    label={'Mot de passe'}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder={"Votre mot de passe"}
                    error={error}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Connexion</button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;