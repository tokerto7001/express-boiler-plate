import express from 'express';
import { registerUser, verifyUser } from '../controllers/authController';
import { registerSchema, verifyUserSchema } from '../schemas/authSchemas';
import { TRequestObjectType, validateRequestObject } from '../middlewares/validateRequestObject';

const router = express.Router();

router
    .post('/register',
        validateRequestObject(registerSchema, TRequestObjectType.body),
        registerUser
        )
    .get('/verify/:token',
        validateRequestObject(verifyUserSchema, TRequestObjectType.params),
        verifyUser
        )
    // .post('/login',
    //     checkBodyProperties(['email', 'password']),
    //     loginUser)

export default router;