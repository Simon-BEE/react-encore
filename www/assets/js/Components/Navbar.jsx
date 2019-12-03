import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';

import AuthApi from '../Services/AuthApi';
import AuthContext from '../Contexts/AuthContext';

const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast('Vous êtes bien déconnecté.');
        history.replace('/');
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">REACT<span className="text-primary">BAR</span></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Client</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated ? 
                        <>
                            <li className="nav-item">
                                <NavLink className="btn btn-info" to="/register">Inscription</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="btn btn-primary" to="/login">Connexion</NavLink>
                            </li>
                        </>
                    :
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Deconnexion</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;