import React from 'react'

const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">REACT<span className="text-primary">BAR</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#customers">Client</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#invoices">Factures</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="btn btn-info" href="#">Inscription</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-primary" href="#login">Connexion</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-danger" href="#">Deconnexion</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;