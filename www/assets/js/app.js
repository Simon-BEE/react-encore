import React, {useState} from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';

import AuthContext from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import CustomersPage from './Pages/CustomersPage';
import InvoicesPages from './Pages/InvoicesPage';
import LoginPage from './Pages/LoginPage';
import AuthApi from './Services/AuthApi';

require('../css/app.css');

const App = () => { 
    const contextValue = { isAuthenticated, setIsAuthenticated };

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated);
    AuthApi.setup();

    const NavbarWithRouter = withRouter(Navbar);

    const PrivateRoute = ({path, isAuthenticated, component}) => {
        return isAuthenticated ? (<Route path={path} component={component} />) : (<Redirect to="/login" />);
    }

    return(
        <AuthContext.Provider value={contextValue} >
            <HashRouter>
                <NavbarWithRouter />
                <main className="p-5 container">
                    <Switch>
                        <Route path='/login' render={ props => <LoginPage onLogin={setIsAuthenticated} {...props} />} />
                        <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomersPage} />
                        <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicesPages} />
                        <Route path='/' component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector("#app");

ReactDom.render(
    <App />, rootElement
);
