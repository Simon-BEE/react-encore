import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import CustomersApi from '../Services/CustomersApi';


const CustomerPage = ({match, history}) => {
    
    const {id = 'new'} = match.params;

    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    });

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    });

    const [editing, setEditing] = useState(false);

    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersApi.find(id);;
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
            console.log(error.response);
            history.replace('/customers');
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCustomer({...customer, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                await CustomersApi.update(id, customer);
                //TODO flash
                history.replace('/customers');
            }else{
                await CustomersApi.create(customer);
                //TODO flash
                history.replace('/customers');
            }
            setError({});
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map((violation) => {
                    apiErrors[propertyPath] = message;
                });
                setError(apiErrors);
            }
        }
    }

    return ( 
        <>
        {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
        <form action="" onSubmit={handleSubmit}>
            <Field name={'lastName'} label={'Nom de famille'} placeholder={'Nom de famille du client'} 
            value={customer.lastName} onChange={handleChange} error={error.lastName} />
            <Field name={'firstName'} label={'Prénom'} placeholder={'Prénom du client'} 
            value={customer.firstName} onChange={handleChange} error={error.firstName} />
            <Field name={'email'} type={'email'} label={'Adresse email'} placeholder={'Adresse email du client'} 
            value={customer.email} onChange={handleChange} error={error.email} />
            <Field name={'company'} label={'Entreprise'} placeholder={'Entreprise du client'} 
            value={customer.company} onChange={handleChange} error={error.company} />

            <div className="form-group float-right">
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
            </div>
        </form>
        </>
    );
}

export default CustomerPage;