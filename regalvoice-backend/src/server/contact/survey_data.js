// Hard coded survey questions
export default [
    {
        name: "Block Renovation",
        initial: (first_name, MY_NAME, PUBLIC_URL) => `
            <Response>
                <Say>
                    Hi ${first_name} - This is ${MY_NAME} from Block Renovation. 
                    Thanks for visiting our site today. 
                    We'd love to offer you a first time customer discount in exchange for your honest feedback to a one-question survey.
                </Say>
                <Gather input="speech" action="${PUBLIC_URL}/v1/calls/completed" speechTimeout="auto">
                    <Say>
                        Since visiting our site, have you purchased a renovation service from another company or pro? (If No, say "No", If Yes, say the name of the company you purchased from)
                    </Say>
                </Gather>
            </Response>
        `,
        response_no: {
            text: `
                <Response>
                    <Say>
                        Block Renovation provides beautiful, 
                        architect-designed renovations completed reliably from start to end. 
                        We are offering $2,000 off your bath renovation if you stay on the line to speak to 
                        a member of our concierge team who can provide you with a free quote.
                    </Say>
                </Response>
            `
        },
        response_yes: {
            text: `
                <Response>
                    <Say>
                        We're sorry to lose your business, 
                        and we hope you enjoy your new bathroom. 
                        Use code RV20 at checkout to get $500 off 
                        if you decide to book with Block in the future.
                    </Say>
                </Response>
            `
        },
        response_other: {
            text: `
                <Response>
                    <Say>
                        Thanks for your response. Use code RV20 at checkout to get $500 
                        off if you decide to book with Block in the future.
                    </Say>
                </Response>
            `
        }
    }
];