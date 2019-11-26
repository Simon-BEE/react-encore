import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import Select from '../Components/Forms/Select';

const InvoicePage = (props) => {
    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        statut: ''
    });

    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        statut: ''
    });

    console.log(invoice)

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setInvoice({...invoice, [name] : value});
    }

    return ( 
        <>
            <h1>Ajouter une facture</h1>
            <form action="">
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number"
                    value={invoice.amount}
                    onChange={handleChange}
                    error={errors.amount}
                />

                <Select name="customer" label="Client" value={invoice.customer} error={errors.customer} onChange={handleChange}>
                    <option value="pomme">Pomme</option>
                    <option value="poire">Poire</option>
                    <option value="fraise">Fraise</option>
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