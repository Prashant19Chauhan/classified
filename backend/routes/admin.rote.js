import express from 'express'
import { login, addUser, adsList, adsApproval } from '../controllers/admin.controller.js';

const router = express();

router.post("/login", login);
router.post('/addUser', addUser);
router.get('/adslist', adsList);
router.post('/adsApproval', adsApproval);

export default router;