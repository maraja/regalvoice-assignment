export default {
    jwt: {
        secret: 'regalvoice123',
        // 1 hour
        // expiration: Math.floor(Date.now() / 1000) + (60 * 60)
        // 1 year
        expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 8760)
    }
};
