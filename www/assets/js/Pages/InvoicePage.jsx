import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';

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

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setInvoice({...invoice, [name] : value});
    }

    return ( 
        <>
            <h1>Ajouter une facture</h1>
            <form action="">
                <Field name="amount" label="Montant" placeholder="Montant de la facture" type="number"
                    value={InvoicePage.amount}
                    onChange={handleChange}
                    error={errors.amount}
                />
            </form>
        </>
    );
}

export default InvoicePage;