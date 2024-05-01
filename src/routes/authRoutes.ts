import express from 'express';
import { registerUser } from '../controllers/authController';
import { checkBodyProperties } from '../middlewares/checkBodyProperties';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { registerSchema } from '../schemas/authSchemas';

const router = express.Router();

router
    .post('/register',
        validateRequestBody(registerSchema),
        registerUser
        )
    // .get('/verify/:token',
    //     verifyUser)
    // .post('/login',
    //     checkBodyProperties(['email', 'password']),
    //     loginUser)

export default router;