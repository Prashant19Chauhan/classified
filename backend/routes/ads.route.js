import express from 'express'
import { createAds, getAds } from '../controllers/ads.controller.js';


const router = express()

router.post("/createAds", createAds);
router.get("/getAds", getAds);

export default router;