import Axios from "axios";

function findAll() {
    return Axios.get('http://localhost:8180/api/invoices')
        .then(response => response.data['hydra:member'])
}

function deleteInvoice(id) {
    return Axios.delete('http://localhost:8180/api/invoices/'+id)
}

export default {findAll, delete: deleteInvoice}