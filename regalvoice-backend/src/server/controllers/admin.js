import db from "#root/db";
import generateUUID from "#root/helpers/generateUUID";

import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";
import HE from "#root/helpers/errorHandling";

const { Admin } = db;


const postNewAdmin = async (req, res, next) => {

    if (!req.body) return next(new Error("Invalid body!"));

    const { email, password, first_name, last_name } = req.body;

    try {
        const newAdmin = await Admin.create({
            email, first_name, last_name,
            id: generateUUID(),
            passwordHash: hashPassword(password)
        })
        return res.json({
            message: "New Admin succesfully created!",
            success: true,
            newAdmin
        });
    } catch (e) {
        return next(e);
    }
}

const postAdmin = async (req, res, next) => {
    if (!req.body) return next(new Error("Invalid body!"));

    // assign all the provided variables
    const { email, password } = req.body;

    try {

        let admin = await Admin.findOne({
            attributes: {},
            where: { email },
        })
        
        if (!admin) return next(HE(400, "Invalid email!"));

        admin = admin.toJSON()

        if (!passwordCompareSync(password, admin.passwordHash)) {
            return next(HE(400, "Incorrect password!"));
        }

        return res.json({
            message: "Admin successfully logged in.",
            success: true,
            admin: { ...admin, passwordHash: undefined }
        });

    } catch (e) {
        console.log(e)
        return next(e);
    }
}


export default {
    postNewAdmin,
    postAdmin
};

