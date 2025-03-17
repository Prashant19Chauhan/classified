import ads from '../models/Ad.js'

export const createAds = async(req, res) => {
    const {creator, title, description, imageUrl, size, position, duration} = req.body;
    //needs to add condition for posting ads ++++++++++++++++++++++++++++++++++++++++++
    const isAvavilable = true;
    
    if(isAvavilable){
        const newAds = new ads({
            creator,
            title,
            description,
            imageUrl,
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
    const fetchAds = await ads.find();
    res.status(201).json(fetchAds);
}