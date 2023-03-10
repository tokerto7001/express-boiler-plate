import express from 'express';
import { loginUser, registerUser, verifyUser } from '../controllers/authController';
import { checkBodyProperties } from '../middlewares/checkBodyProperties';

const router = express.Router();

router
    .post('/register',
        checkBodyProperties(['firstName', 'lastName', 'email', 'password']),
        registerUser)
    .get('/verify/:token',
        verifyUser)
    .post('/login',
        checkBodyProperties(['email', 'password']),
        loginUser)

export default router;