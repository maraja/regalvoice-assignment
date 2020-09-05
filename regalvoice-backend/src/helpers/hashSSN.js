import bcrypt, { hashSync } from "bcryptjs";

const hashSSN = ssn => bcrypt.hashSync(ssn, bcrypt.genSaltSync(12));

export default hashSSN;