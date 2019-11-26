import React, { useState, useContext } from 'react';

import AuthApi from '../Services/AuthApi';
import AuthContext from '../Contexts/AuthContext';

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
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email" className={"form-control "+ (error && "is-invalid")} id="username" name="username" placeholder="Votre adresse email" value={credentials.username} onChange={handleChange} />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Votre mot de passe" value={credentials.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Connexion</button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;