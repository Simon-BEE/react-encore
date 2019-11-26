import Axios from "axios";

function findAll() {
    return Axios.get('http://localhost:8180/api/customers')
        .then(response => response.data['hydra:member'])
}

function deleteCustomer(id) {
    return Axios.delete('http://localhost:8180/api/customers/'+id)
}

const find = (id) => {
    return Axios.get('http://localhost:8180/api/customers/'+id)
                .then(response => response.data);
}

const create = (customer) => {
    return Axios.post('http://localhost:8180/api/customers', customer);
}

const update = (id, customer) => {
    return Axios.put('http://localhost:8180/api/customers/'+id, customer);
}

export default {findAll, delete: deleteCustomer, find, create, update}