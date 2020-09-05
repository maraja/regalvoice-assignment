import accessEnv from "#root/helpers/accessEnv";

import db from "#root/db";
import generateUUID from "#root/helpers/generateUUID";

const { Call } = db;

const TWILIO_NUMBER = accessEnv("TWILIO_NUMBER");
const TWILIO_SID = accessEnv("TWILIO_SID");
const TWILIO_TOKEN = accessEnv("TWILIO_TOKEN");
const MY_NAME = accessEnv("MY_NAME");
const PUBLIC_URL = accessEnv("PUBLIC_URL");

const client = require('twilio')(TWILIO_SID, TWILIO_TOKEN);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

import survey_data from './survey_data';

export const call = async (first_name, id, number) => {
    try {
        // // OLD CODE testing manual call flow.
        // const result = await client.calls.create({
        //     twiml: survey_data[0].initial(first_name, MY_NAME, PUBLIC_URL),
        //     to: number,
        //     from: TWILIO_NUMBER
        // })

        // await Call.update(
        //     { callSid: result.sid, callStatus: result.status },
        //     { returning: true, where: { customerId: id } }
        // )

        // use built in twilio flow instead to reduce the complexity needed
        // for webhooks and such.
        const execution = await client.studio.flows('FWbcefa66de7dee422ecc07a56a3f04748')
            .executions
            .create({parameters: {
                first_name: first_name,
                my_name: MY_NAME
            }, to: number, from: TWILIO_NUMBER});


        // console.log(execution)
            
        let call = await Call.create({
            id: generateUUID(),
            customerId: id,
            callSid: execution.sid
        })

        // console.log(result)
    } catch(e) {
        console.log("Error", e)
    }
}

// // testing function for programatically handling the conversational flow.
// export const completeCall = async (callSid, response) => {
//     try {

//         const result = await client.calls(callSid)
//         .update({
//             twiml: survey_data[0][`response_${response}`].text
//         })

//         console.log(result)

//         await Call.update(
//             { callStatus: 'complete' },
//             { returning: true, where: { callSid } }
//         )

//     } catch(e) {
//         console.log("Error", e)
//     }
// }



// helper to append a new "Say" verb with alice voice
function say(text, twiml) {
    twiml.say({ voice: 'alice'}, text);
}
