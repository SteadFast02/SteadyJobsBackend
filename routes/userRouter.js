import express from "express";
import { getUser, login, logout, Register } from "../controllers/userController.js";
import isAuthorized from "../middleware/auth.js"
const router = express.Router()

router.post('/register',Register);
router.post('/login',login);
router.get('/logout',isAuthorized,logout);
router.get('/getuser', isAuthorized, getUser)


export default router;