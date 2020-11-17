import { isPropertyAccessChain } from "typescript";

export default {
    jwt: {
        secret: process.env.APP_SECRET,
        expiresIn: '1d'
    }
};
