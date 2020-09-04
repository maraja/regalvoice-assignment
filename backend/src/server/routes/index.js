import customerRouter from './customer';
import adminRouter from './admin';
import callRouter from './call';

const API_VERSION = 1
const API_PREFIX = '/v'+API_VERSION

const setupRoutes = app => {
    app.use(`${API_PREFIX}/customers`, customerRouter);
    app.use(`${API_PREFIX}/admin`, adminRouter);
    app.use(`${API_PREFIX}/calls`, callRouter);
}

export default setupRoutes;