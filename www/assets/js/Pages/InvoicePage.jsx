import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Field from '../Components/Forms/Field';
import Select from '../Components/Forms/Select';
import CustomersApi from '../Services/CustomersApi';
import InvoicesApi from '../Services/InvoicesApi';


const InvoicePage = ({history, match}) => {
    const {id = 'new'} = match.params;

    const [editing, setEditing] = useState(false);

    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: 'SENT'
    });

    const fetchInvoice = async (id) => {
        try {
            const data = await InvoicesApi.find(id);
            const {amount, customer, status} = data;
            setInvoice({amount, customer: customer.id, status});
            console.log('1',data);
        } catch ({response}) {
            console.log(response);
            history.replace('/invoices');
        }
    }

    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: ''
    });


    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll();
            setCustomers(data);
            if (!invoice.customer) {
                setInvoice({...invoice, customer: data[0].id});
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id !== 'new') {
            fetchInvoice(id);
            setEditing(true);
        }
        fetchCustomers();
    }, []);

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setInvoice({...invoice, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                await InvoicesApi.update(id, invoice);
            }else{
                await InvoicesApi.create(invoice);
            }
            setErrors({});
            history.replace("/invoices");
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    }

    return ( 
        <>
            {!editing ? <h1>Ajouter une facture</h1> : <h1>Modifier une facture</h1>}
            <form action="" onSubmit={handleSubmit}>
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number"
                    value={invoice.amount}
                    onChange={handleChange}
                    error={errors.amount}
                />

                <Select name="customer" label="Client" value={invoice.customer} error={errors.customer} onChange={handleChange}>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </Select>

                <Select name="status" label="Status" value={invoice.status} error={errors.status} onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group float-right">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
}

export default InvoicePage;