import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Field from '../Components/Forms/Field';
import CustomersApi from '../Services/CustomersApi';


const CustomerPage = ({match, history}) => {
    //recuperation du paramètre dans l'url
    const {id = 'new'} = match.params;

    //initialisation d'un customer vide
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    });

    //initialisation d'une erreur vide
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
    });

    //initialisation de variable d'édition à faux
    const [editing, setEditing] = useState(false);


    //recupère les données d'un customer si son id est dans l'url
    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersApi.find(id);
            //insère ces données dans la variable customer
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
            //affichage d'erreur et redirection
            console.log(error.response);
            history.replace('/customers');
        }
    }

    //vérifie si le paramètre est différent de 'new' si c'est le cas on va chercher le customer grâce au paramètre et on définie la variable d'edition à vrai
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    //permet la modification des inputs, en insérant les données dans la variable customer
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCustomer({...customer, [name] : value});
    }

    // traite l'envoie du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                // si édition on update un customer
                await CustomersApi.update(id, customer);
                //TODO flash
                history.replace('/customers');
            }else{
                //sinon crée un customer
                await CustomersApi.create(customer);
                //TODO flash
                history.replace('/customers');
            }
            setError({});
        } catch ({response}) {
            //traite des erreurs grâce au message déjà défini dans le propertyPath
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
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