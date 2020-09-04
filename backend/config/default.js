module.exports = {
    jwt: {
        secret: 'regalvoice123',
        // 1 hour
        // expiration: Math.floor(Date.now() / 1000) + (60 * 60)
        // 1 year
        expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 8760)
    },
    twilio: {
        number: '+15392861881',
        sid: 'AC98689740e051da628b76011982d6f632',
        token: '64854702f612bbedca3b64ff43d90391'
    }
};
