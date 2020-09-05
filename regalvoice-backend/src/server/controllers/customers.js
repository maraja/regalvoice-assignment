import db from "#root/db";
import generateUUID from "#root/helpers/generateUUID";

import got from 'got';
import accessEnv from "#root/helpers/accessEnv";
import moment from 'moment';
import hashSSN from "#root/helpers/hashSSN";

import { sendToQueue } from "#root/server/queue/broker";
import { call, voicemail, sms } from '#root/server/contact';

const { Customer, Call } = db;


const getCustomers = async (req, res, next) => {

    try {

        // get the customers and obfuscate the ssn
        let customers = await Customer.findAll().map(c => c.get({nest: true, plain:true, raw:true}));

        return res.json({
            success: true,
            message: "Customers retrieved.",
            customers
        });
    } catch (e) {
        return next(e);
    }
}

const postCustomer = async (req, res, next) => {
    if (!req.body) return next(new Error("Invalid body!"));

    // assign all the provided variables
    const { first_name, phone_number } = req.body;

    try {

        let exists = false
        let customer = await Customer.findOne({ where: { phone_number } })

        if (!customer) {
            customer = await Customer.create({
                id: generateUUID(),
                first_name, phone_number
            })
        } else { exists = true }
        

        // if the connection the queue is not established for whatever reason, ignore and call immediately.
        if (!sendToQueue) {
            call(first_name, id, phone_number)
        } else {
            sendToQueue({ 
                user: { 
                    // instead of using the first name from the database,
                    // use the first name provided by the user within this transaction
                    // allowing users to enter different first names at each time.
                    first_name: first_name, 
                    id: customer.id, 
                    phone_number: customer.phone_number
                } 
            })
        }

        return res.json({
            success: true,
            message: !exists 
                ? "Customer created. Request successfully sent. Email with report will be sent to provided email." 
                : "Customer already exists. Request successfully sent. Email with report will be sent to provided email.",
            customer
        });
    } catch (e) {
        return next(e);
    }
}


export default {
    getCustomers,
    postCustomer
};

