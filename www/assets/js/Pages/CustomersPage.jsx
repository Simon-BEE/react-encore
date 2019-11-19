import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PaginationComponent from '../Components/PaginationComponent';
import CustomersApi from '../Services/CustomersApi';


const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;
    const paginatedComponent = PaginationComponent.getData(customers, currentPage, itemsPerPage);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll();
            setCustomers(data);
        } catch {
            console.log(error.response)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomerApi.delete(id);
        } catch {
            console.log(error.response);
            setCustomers(originalCustomers);
        }
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
                {paginatedComponent.map(customer => 
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-pill badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td><button disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Supprimer</button></td>
                    </tr>
                )}
            </tbody>
        </table>
            <PaginationComponent 
            currentPage={ currentPage }
            itemsPerPage={ itemsPerPage }
            length={ customers.length }
            onPageChange={ handlePageChange }
            />
        </>
    );
}

export default CustomersPage;