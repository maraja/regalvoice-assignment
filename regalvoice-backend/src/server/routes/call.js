import express from 'express';
let router = express.Router();

import callRouter from "#root/server/controllers/calls";

const {
    getCalls,
    // completedCall
} = callRouter

router.get("/", getCalls)
// router.post("/completed", completedCall)


export default router;