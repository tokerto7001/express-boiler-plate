import express from 'express';
import { registerUser } from '../controllers/authController';
import { checkBodyProperties } from '../middlewares/checkBodyProperties';
const router = express.Router();

router.post('/register', checkBodyProperties(['firstName', 'lastName', 'email', 'password']), registerUser)

export default router;