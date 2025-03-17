import express from 'express'
import { createAds, fetchadbyId, getAds, fetchadbyUser } from '../controllers/ads.controller.js';


const router = express()

router.post("/createAds", createAds);
router.get("/getAds", getAds);
router.post("/getAdsbyId", fetchadbyId)
router.post("/getAdsbyUser", fetchadbyUser)
router

export default router;