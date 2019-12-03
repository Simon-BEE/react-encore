import Axios from "axios";
import Cache from "./Cache";
import { CUSTOMERS_API } from "../config";


async function findAll() {

    const cachedCustomers = await Cache.get('customers');
    if (cachedCustomers) {
        return cachedCustomers;
    }

    return Axios.get(CUSTOMERS_API)
        .then(response => {
            const customers = response.data['hydra:member'];
            Cache.set('customers', customers);
            return customers;
        });
}

const find = (id) => {
    return Axios.get(CUSTOMERS_API+ '/' +id)
                .then(response => response.data);
}

function deleteCustomer(id) {
    return Axios.delete(CUSTOMERS_API + '/' +id)
                .then(async response => {
                    const cachedCustomers = await Cache.get('customers');
                    if (cachedCustomers) {
                        Cache.set('customers', cachedCustomers.filter(c => c.id !== id))
                    }
                    return response;
                })
}


const create = (customer) => {
    return Axios.post(CUSTOMERS_API, customer)
                .then(async response => {
                    const cachedCustomers = await Cache.get('customers');
                    if (cachedCustomers) {
                        Cache.set('customers', [...cachedCustomers, response.data]);
                    }
                    return response;
                });
}

const update = (id, customer) => {
    return Axios.put(CUSTOMERS_API + '/' +id, customer)
                .then(async response => {
                    const cachedCustomers = await Cache.get('customers');
                    if (cachedCustomers) {
                        const index = cachedCustomers.findIndex(c => c.id == id);
                        cachedCustomers[index] = response.data;
                        Cache.set('customers', cachedCustomers);
                    }
                    return response;
                });
    /**
     * Seconde méthode avec invalidate
     * return Axios.put('http://localhost:8180/api/customers/'+id, customer)
     *              .then(response => {
     *                  Cache.invalidate('customers);
     *                  return response;
     * })
     */
}

export default {findAll, delete: deleteCustomer, find, create, update}