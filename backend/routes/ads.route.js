import express from 'express'
import { createAds } from '../controllers/ads.controller.js';


const router = express()

router.post("/createAds", createAds);

export default router;