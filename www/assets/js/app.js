import React, {useState} from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import AuthContext from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import CustomersPage from './Pages/CustomersPage';
import InvoicesPages from './Pages/InvoicesPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AuthApi from './Services/AuthApi';
import PrivateRoute from './Components/PrivateRoute';
import CustomerPage from './Pages/CustomerPage';
import InvoicePage from './Pages/InvoicePage';

import 'react-toastify/dist/ReactToastify.css';
require('../css/app.css');

const App = () => { 
    
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated);
    
    const NavbarWithRouter = withRouter(Navbar);

    const contextValue = { 
        isAuthenticated, 
        setIsAuthenticated, 
        userId
    };

    const userId = AuthApi.setup();

    return(
        <AuthContext.Provider value={contextValue} >
            <HashRouter>
                <NavbarWithRouter />
                <main className="p-5 container">
                    <Switch>
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPages} />
                        <PrivateRoute path="/customer/:id" component={CustomerPage} />
                        <PrivateRoute path="/invoice/:id" component={InvoicePage} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/' component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position="bottom-left" />
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector("#app");

ReactDom.render(
    <App />, rootElement
);
