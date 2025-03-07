export const createAds = async(req, res) => {
    console.log(req.body);
    const isAvavilable = true;
    
    if(isAvavilable){
        return res.status(201).json({message: "success"})
    }
    else{
        return res.status(400).json({message: "fail"})
    }
}