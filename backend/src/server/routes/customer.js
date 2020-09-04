import express from 'express';
let router = express.Router();

import customerController from "#root/server/controllers/customers";

const {
    postCustomer,
    getCustomers
} = customerController

router.get("/", getCustomers)
router.post("/", postCustomer)


export default router;