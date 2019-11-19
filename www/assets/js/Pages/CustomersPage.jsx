import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8180/api/customers')
        .then(response => response.data['hydra:member'])
        .then(data => setCustomers(data))
        .catch(error => console.log('ici', error.response));
    }, []);

    const handleDelete = (id) => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete('http://localhost:8180/api/customers/'+id)
        .then(response => console.log(response))
        .catch(error => {
            console.log(error.response)
            setCustomers(originalCustomers);
        });
    }

    return ( 
        <>
        <h1>Liste des clients</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Société</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total facturé</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => 
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td><button disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Supprimer</button></td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    );
}

export default CustomersPage;