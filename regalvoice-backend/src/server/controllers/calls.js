import db from "#root/db";
import generateUUID from "#root/helpers/generateUUID";

import got from 'got';
import accessEnv from "#root/helpers/accessEnv";
import moment from 'moment';
import hashSSN from "#root/helpers/hashSSN";

const { Call } = db;


const getCalls = async (req, res, next) => {

    try {

        // get the users and obfuscate the ssn
        let calls = await Call.findAll().map(u => u.get({nest: true, plain:true, raw:true}));

        return res.json({
            success: true,
            message: "Calls retrieved.",
            calls
        });
    } catch (e) {
        return next(e);
    }
}

// // testing webhook for programatic call flow
// const completedCall = async (req, res, next) => {

//     try {

//         console.log(req.body)
//         let twiml = null

//         if (req.body.speechResult.startsWith("yes")) {
//             // do something
//             twiml = completeCall(req.body.CallSid, "yes")
//         } else if (req.body.speechResult.startsWith("no")) {
//             // do something else
//             twiml = completeCall(req.body.CallSid, "no")
//         } else {
//             twiml = completeCall(req.body.CallSid, "other")
//         }

//         // res.type('text/xml');
//         // res.send(twiml.toString());

//         return res.json({
//             success: true
//         });
//     } catch (e) {
//         return next(e);
//     }
// }


export default {
    getCalls,
    // completedCall
};

