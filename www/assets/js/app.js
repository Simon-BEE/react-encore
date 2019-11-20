import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import CustomersPage from './Pages/CustomersPage';
import InvoicesPages from './Pages/InvoicesPage';

require('../css/app.css');

const App = () => { 
    return(
        <HashRouter>
            <Navbar />
            <main className="p-5 container">
                <Switch>
                    <Route path='/customers' component={CustomersPage} />
                    <Route path='/invoices' component={InvoicesPages} />
                    <Route path='/' component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    )
};

const rootElement = document.querySelector("#app");

ReactDom.render(
    <App />, rootElement
);
