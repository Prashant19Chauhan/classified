import express from 'express'
import { createAds, getAds, fetchadbyUser, getDuration, getPages, getAvailablePages } from '../controllers/ads.controller.js';


const router = express()

router.post("/createAds", createAds);
router.get("/getAds", getAds);
router.post("/getAdsbyUser", fetchadbyUser)
router.get("/getDuration", getDuration)
router.post("/getPages", getPages)
router.post("/availablePage", getAvailablePages)

export default router;