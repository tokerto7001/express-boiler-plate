import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { checkBodyProperties } from '../middlewares/checkBodyProperties';
const router = express.Router();

router
    .post('/register',
        checkBodyProperties(['firstName', 'lastName', 'email', 'password']),
        registerUser)
    .post('/login',
        checkBodyProperties(['email', 'password']),
        loginUser)

export default router;