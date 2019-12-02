import Axios from "axios";
import Cache from "./Cache";

async function findAll() {
    const cachedInvoices = await Cache.get('invoices');

    if (cachedInvoices) {
        return cachedInvoices;
    }

    return Axios.get('http://localhost:8180/api/invoices')
        .then(response => {
            const invoices = response.data['hydra:member'];
            Cache.set('invoices', invoices);
            return invoices;
        });
}

const find = (id) => {
    return Axios.get('http://localhost:8180/api/invoices/'+id)
                .then(response => response.data);
}

function deleteInvoice(id) {
    return Axios.delete('http://localhost:8180/api/invoices/'+id)
                .then(async response => {
                    const cachedInvoices = await Cache.get('invoices');
                    if (cachedInvoices) {
                        Cache.set('customers', cachedInvoices.filter(i => i.id !== id))
                    }
                    return response;
                })
}

const create = (invoice) => {
    return Axios.post('http://localhost:8180/api/invoices',
                    {...invoice, customer: 'api/customers/'+invoice.customer})
                    .then(async response => {
                        const cachedInvoices = await Cache.get('invoices');
                        if (cachedInvoices) {
                            Cache.set('customers', [...cachedInvoices, response.data]);
                        }
                        return response;
                    });
}

const update = (id, invoice) => {
    return Axios.put('http://localhost:8180/api/invoices/'+id, 
                    {...invoice, customer: 'api/customers/'+invoice.customer})
                    .then(async response => {
                        const cachedInvoices = await Cache.get('invoices');
                        if (cachedInvoices) {
                            const index = cachedInvoices.findIndex(i => i.id == id);
                            cachedInvoices[index] = response.data;
                            Cache.set('customers', cachedInvoices);
                        }
                        return response;
                    });
}

export default {findAll, delete: deleteInvoice, find, create, update}