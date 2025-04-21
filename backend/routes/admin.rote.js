import express from 'express'
import { login, addUser, adsList, adsApproval, publishClassified, classifiedSettings, getDuration, getPages } from '../controllers/admin.controller.js';
import multer from 'multer'

const router = express();
const upload = multer({ dest: 'classifieds/' });

router.post("/login", login);
router.post('/addUser', addUser);
router.get('/adslist', adsList);
router.post('/adsApproval', adsApproval);
router.post('/publish', upload.fields([{ name: "file", maxCount: 1 },{ name: "image", maxCount: 1 },]), publishClassified);
router.post('/settings', classifiedSettings);
router.get("/getDuration", getDuration);
router.post("/getPages", getPages)

export default router;