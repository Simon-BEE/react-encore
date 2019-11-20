import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({'username':'', 'password':''});
    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) => {
        const value = currentTarget.value;
        const name = currentTarget.name;
        setCredentials({...credentials, [name] : value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(credentials);
        try {
            const token = await Axios.post('http://localhost:8180/api/login_check', credentials)
            .then(response => response.data.token);
            setError('');
            window.localStorage.setItem('authToken', token)
        } catch (error) {
            console.log(error);
            setError('Identifiants inconnus !');
        }
    }

    console.log(window.localStorage.getItem('authToken'));

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