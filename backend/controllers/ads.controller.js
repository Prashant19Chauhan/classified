import ads from '../models/Ad.js'
import adsHistory from '../models/adsHistory.js';
import adsShedule from '../models/sheduleAds.js'

export const createAds = async(req, res) => {
    const {creator, title, description, image, size, position, startDate, endDate} = req.body;
    //needs to add condition for posting ads ++++++++++++++++++++++++++++++++++++++++++
    const isAvavilable = true;
    
    if(isAvavilable){
        const newAds = new adsShedule({
            creator,
            title,
            description,
            imageUrl:image,
            size,
            position,
            startDate,
            endDate,
        })
        await newAds.save();
        return res.status(201).json({message: "success"})
    }
    else{
        return res.status(400).json({message: "fail"})
    }
}


export const getAds = async(req, res) => {
    const fetchAds = await ads.find({ status: 'Active' });
    res.status(201).json(fetchAds);
}

export const fetchadbyId = async(req, res) => {
    try{
        const id = req.body?.id;
        console.log(id)
        if(id === 'sample'){
            
            res.status(201).json({title:"sample ads", imageUrl:"/assets/ads.jpg"})
        }
        const adsData = await ads.findById(id);
        res.status(201).json(adsData);
    }
    catch(error){
        console.log(error);
    }
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

export const findPosition = async(req, res) => {
    const {startDate, endDate} = req.body;

    try{
        const start = new Date(startDate);
        const end = endDate? new Date(endDate) : null ;

        let overlappingAds = await adsShedule.find({
            $or: [
                {
                    startDate: {$lte: start},
                    endDate: {$gte: start},
                },
                end
                ?{
                    $or: [
                        { startDate: { $gte: start, $lte: end } },
                        { endDate: { $gte: start, $lte: end } },
                        { startDate: { $lte: start }, endDate: { $gte: end } }
                    ]
                }
                :null
            ].filter(Boolean)
        })

        let overlappingAds1 = await ads.find({
            $or: [
                {
                    startDate: {$lte: start},
                    endDate: {$gte: start},
                },
                end
                ?{
                    $or: [
                        { startDate: { $gte: start, $lte: end } },
                        { endDate: { $gte: start, $lte: end } },
                        { startDate: { $lte: start }, endDate: { $gte: end } }
                    ]
                }
                :null
            ].filter(Boolean)
        })
        console.log(overlappingAds1);

        const allPositions =  Array.from({ length: 64 }, (_, i) => i + 1); 

        let unavailablePosition = overlappingAds.map((ad) => Number(ad.position));
        unavailablePosition = overlappingAds1.map((ad) => Number(ad.position));

        const availablePositions = allPositions.filter(
            (pos) => !unavailablePosition.includes(pos)
        );
        console.log(availablePositions);
        res.status(201).json(availablePositions);

    }
    catch(error){
        console.log(error);
    }
}