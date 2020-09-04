import axios from 'axios';

// import accessEnv from "#root/helpers/accessEnv"

const REGALVOICE_BACKEND_API = 'http://localhost:8001/v1'

export default class RegalVoiceService {

    // CUSTOMERS
    static async fetchCustomers() {
        const body = await axios.get(`${REGALVOICE_BACKEND_API}/customers`);
        return body.data.customers;
    }

    static async createCustomerAndCall({ first_name, phone_number }) {
        return await axios.post(`${REGALVOICE_BACKEND_API}/customers`, { 
            first_name, phone_number
        });
    }

    // ADMIN
    static async authenticate({ email, password }) {
        return await axios.post(`${REGALVOICE_BACKEND_API}/admin`, { 
            email, password
        });
    }

    // CALLS
    static async fetchCalls() {
        const body = await axios.get(`${REGALVOICE_BACKEND_API}/calls`);
        return body.data.calls;
    }

}