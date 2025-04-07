import ads from '../models/Ad.js'
import adsHistory from '../models/adsHistory.js';
import classified from '../models/classified.js';
import adsShedule from '../models/sheduleAds.js';
import setting from '../models/setting.js'

export const createAds = async(req, res) => {
    const {creator, title, description, position, duration, image} = req.body;
    const isAvavilable = true;
    
    if(isAvavilable){
        const newAds = new adsShedule({
            creator,
            title,
            description,
            imageUrl:image,
            position,
            duration,
        })
        await newAds.save();
        return res.status(201).json({message: "success"})
    }
    else{
        return res.status(400).json({message: "fail"})
    }
}


export const getAds = async(req, res) => {
    const fetchAds = await classified.find();
    res.status(201).json(fetchAds);
}


export const fetchadbyUser = async(req, res) => {
    const userId = req.body;
    const creator = userId.userId;
    const activeAdsData = await ads.find({creator});
    const sheduleAdsData = await adsShedule.find({creator});
    const historyAdsData = await adsHistory.find({creator});
    const adsData = {activeAdsData, sheduleAdsData, historyAdsData};
    res.status(201).json(adsData);
}

export const getDuration = async(req, res) => {
    const getData = await setting.find({
        status: "Active"
    })
    const durations = getData.flatMap(item => item.durations);
    console.log(durations)
    res.status(200).json(durations)
}

export const getPages = async(req, res) => {
    const { duration } = req.body;
    const getData = await setting.findOne({
        status: "Active",
        "durations.value": duration,
    });
    const pages = getData.numberOfPages;
    res.status(200).json(pages)
}

export const getAvailablePages = async(req, res) => {
    const { duration } = req.body;
    const getData = await adsShedule.find({
        duration
    })
    const position = getData.map(item => item.position);
    res.status(200).json(position)
}