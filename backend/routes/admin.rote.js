import express from 'express'
import { login, addUser, adsList, adsApproval, publishClassified, classifiedSettings, getDuration, getPages } from '../controllers/admin.controller.js';

const router = express();

router.post("/login", login);
router.post('/addUser', addUser);
router.get('/adslist', adsList);
router.post('/adsApproval', adsApproval);
router.post('/publish', publishClassified);
router.post('/settings', classifiedSettings);
router.get("/getDuration", getDuration);
router.post("/getPages", getPages)

export default router;