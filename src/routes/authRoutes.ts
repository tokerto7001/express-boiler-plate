import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { checkBodyProperties } from '../middlewares/checkBodyProperties';
import { isLoggedIn } from '../middlewares/isLoggedIn';
const router = express.Router();

router
    .post('/register',
        checkBodyProperties(['firstName', 'lastName', 'email', 'password']),
        registerUser)
    .post('/login',
        isLoggedIn,
        checkBodyProperties(['email', 'password']),
        loginUser)

export default router;