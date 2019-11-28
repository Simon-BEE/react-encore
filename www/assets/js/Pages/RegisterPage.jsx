import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import UserApi from '../Services/UserApi';

const RegisterPage = ({history}) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setUser({...user, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Les mots de passe ne correspondent pas"
            setErrors(apiErrors);
            return;
        }
        try {
            await UserApi.register(user);
            setErrors('');
            history.replace('/login');
        } catch (error) {
            console.log(error);
            const {violations} = error.response.data;
            violations.map(({propertyPath, message}) => apiErrors[propertyPath] = message );
            setErrors(apiErrors);
        }
    }

    return ( 
        <>
            <h1>Inscription</h1>
            <form action="" onSubmit={handleSubmit}>
                <Field name="firstName" label="Prénom" placeholder="Votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field name="lastName" label="Nom de famille" placeholder="Votre nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field name="email" label="Adresse email" placeholder="Votre adresse email"
                    type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field name="password" label="Mot de passe" placeholder="Votre mot de passe"
                    type="password"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field name="passwordConfirm" label="Confirmation mot de passe" placeholder="Confirmation du mot de passe"
                    type="password"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-info">Enregistrer</button>
                    <Link to="/login" className="btn btn-link">Je suis déjà inscrit</Link>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;