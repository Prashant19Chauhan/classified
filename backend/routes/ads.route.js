import express from 'express'
import { createAds, getAds, fetchadbyUser, getDuration, getPages, getAvailablePages } from '../controllers/ads.controller.js';
import multer from 'multer'


const router = express()
const upload = multer({ dest: 'uploads/' });

router.post("/createAds", upload.single('image'), createAds);
router.get("/getAds", getAds);
router.post("/getAdsbyUser", fetchadbyUser)
router.get("/getDuration", getDuration)
router.post("/getPages", getPages)
router.post("/availablePage", getAvailablePages)

export default router;