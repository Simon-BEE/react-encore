import Axios from "axios";
import Cache from "./Cache";
import { INVOICES_API } from "../config";


async function findAll() {
    const cachedInvoices = await Cache.get('invoices');

    if (cachedInvoices) {
        return cachedInvoices;
    }

    return Axios.get(INVOICES_API)
        .then(response => {
            const invoices = response.data['hydra:member'];
            Cache.set('invoices', invoices);
            return invoices;
        });
}

const find = (id) => {
    return Axios.get(INVOICES_API + '/' +id)
                .then(response => response.data);
}

function deleteInvoice(id) {
    return Axios.delete(INVOICES_API + '/' +id)
                .then(async response => {
                    const cachedInvoices = await Cache.get('invoices');
                    if (cachedInvoices) {
                        Cache.set('customers', cachedInvoices.filter(i => i.id !== id))
                    }
                    return response;
                })
}

const create = (invoice) => {
    return Axios.post(INVOICES_API,
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
    return Axios.put(INVOICES_API+ '/' +id, 
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