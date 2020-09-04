import express from 'express';
let router = express.Router();

import adminController from "#root/server/controllers/admin";

const {
    postAdmin,
    postNewAdmin
} = adminController

router.post("/", postAdmin)
router.post("/new", postNewAdmin)


export default router;