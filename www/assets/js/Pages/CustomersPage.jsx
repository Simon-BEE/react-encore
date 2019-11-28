import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

import PaginationComponent from '../Components/PaginationComponent';
import CustomersApi from '../Services/CustomersApi';
import AuthContext from '../Contexts/AuthContext';


const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const { userId } = useContext(AuthContext);

    const itemsPerPage = 10;
    const filteredCustomers = customers.filter(c => 
        c.firstName.toLowerCase().includes(search.toLowerCase()) || 
        c.lastName.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.user.id == userId ||
        c.totalAmount > search
        );
    const paginatedComponent = PaginationComponent.getData(filteredCustomers, currentPage, itemsPerPage);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchCustomers();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleDelete = async (id) => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomersApi.delete(id);
            toast.success('Client supprimé !');
        } catch (error) {
            console.log(error);
            setCustomers(originalCustomers);
            toast.error('Erreur de suppression !');
        }
    }

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(0);
    }
    
    return ( 
        <>
            <div className="d-flex justify-content-between">
                <h1>Liste des clients</h1>
                <div className=""><Link className="btn btn-sm btn-primary" to="/customer/new">Créer un client</Link></div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Rechercher .." onChange={handleSearch} value={search} />
                </div>
            </div>
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
                length={ filteredCustomers.length }
                onPageChange={ handlePageChange }
            />
        </>
    );
}

export default CustomersPage;