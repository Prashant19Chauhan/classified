import ads from '../models/Ad.js'

export const createAds = async(req, res) => {
    const {creator, title, description, image, size, position, duration} = req.body;
    //needs to add condition for posting ads ++++++++++++++++++++++++++++++++++++++++++
    const isAvavilable = true;
    
    if(isAvavilable){
        const newAds = new ads({
            creator,
            title,
            description,
            imageUrl:image,
            size,
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
    const fetchAds = await ads.find({ status: 'approved' });
    res.status(201).json(fetchAds);
}

export const fetchadbyId = async(req, res) => {
    try{
        const title = req.body;
        const checkTitle = title.title;
        if(checkTitle === 'adss'){
            
            res.status(201).json({title:"sample ads", imageUrl:"/assets/ads.jpg"})
        }
        const adsData = await ads.findOne(title);
        res.status(201).json(adsData);
    }
    catch(error){
        console.log(error);
    }
}

export const fetchadbyUser = async(req, res) => {
    const userId = req.body;
    const creator = userId.userId;
    const adsData = await ads.find({creator});
    res.status(201).json(adsData);
}