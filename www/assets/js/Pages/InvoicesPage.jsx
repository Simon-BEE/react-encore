import React, { useEffect, useState } from 'react';

import moment from "moment";
import PaginationComponent from '../Components/PaginationComponent';
import InvoicesApi from '../Services/InvoicesApi';


const InvoicesPages = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;
    const filteredInvoices = invoices.filter(i => 
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) || 
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) || 
        i.status.toLowerCase().includes(search.toLowerCase()) || 
        i.amount > search
        );
    const paginatedComponent = PaginationComponent.getData(filteredInvoices, currentPage, itemsPerPage);

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchInvoices();
    }, [])

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesApi.delete(id);
        } catch (error) {
            console.log(error);
            setInvoices(originalInvoices);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(0);
    }

    const formatDate = (str) => moment(str).format('DD/MM/YY');

    const STATUS_CLASSES = {
        PAID: "success",
        SENT: "primary",
        CANCELLED: "danger"
    };

    const STATUS_LABEL = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    };

    return ( 
        <>
            <div className="d-flex justify-content-between">
                <h1>Liste des factures</h1>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Rechercher .." onChange={handleSearch} value={search} />
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Montant</th>
                        <th className="text-center">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedComponent.map(invoice => 
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td><a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a></td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td className="text-center"><span className={"badge badge-pill badge-"+STATUS_CLASSES[invoice.status]}>{STATUS_LABEL[invoice.status]}</span></td>
                        <td>
                            <button className="btn btn-sm btn-info">Editer</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <PaginationComponent
                currentPage={ currentPage }
                itemsPerPage={ itemsPerPage }
                length={ filteredInvoices.length }
                onPageChange={ handlePageChange }
            />
        </>
    );
}

export default InvoicesPages;