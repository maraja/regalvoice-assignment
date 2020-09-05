import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import cookieParser from 'cookie-parser';
import path from "path";

import accessEnv from "#root/helpers/accessEnv";

import formatSequelizeError from "./formatSequelizeError"

import setupRoutes from './routes';
import winston from 'winston';

import {connect} from '#root/server/queue/broker';

const PORT = accessEnv("PORT", 8001);

var OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const apiSpec = path.join(process.cwd(), 'src', 'spec', 'openapi.yml');

const app = express();

// 1. Install bodyParsers for the request types your API will support
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static(path.join(process.cwd(), 'src', 'public')));

app.use('/spec', express.static(apiSpec));

app.use(cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
}));

new OpenApiValidator({
    apiSpec, validateResponses: false, validateRequests: true, // default false
}).install(app).then(() => {
    setupRoutes(app);

    app.use((err, req, res, next) => {
        let formattedError = formatSequelizeError(err)
        let statusCode = err.status || 500;
        return res.status(statusCode).json({error: formattedError, success: false})
    });

    // connect to queue
    connect();      

    app.listen(PORT, "0.0.0.0", () => {
        console.info(`Regal Voice Backend listening on ${PORT}`);
    });
}).catch(error =>{ 
    console.debug(error);
}
)

export default app;
