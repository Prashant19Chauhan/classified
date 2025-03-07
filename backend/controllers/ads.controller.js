import ads from '../models/Ad.js'

export const createAds = async(req, res) => {
    const {title, description, imageUrl, size, position, duration} = req.body;
    //needs to add condition for posting ads ++++++++++++++++++++++++++++++++++++++++++
    const isAvavilable = true;
    
    if(isAvavilable){
        const newAds = new ads({
            title,
            description,
            imageUrl: "dfdfdsfds",
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