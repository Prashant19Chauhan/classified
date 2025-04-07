import AdminUser from '../models/admin.js'
import ads from '../models/Ad.js'
import adsShedule from '../models/sheduleAds.js'
import Classified from '../models/classified.js'
import historyAds from '../models/adsHistory.js'
import setClassified from '../models/setting.js'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import setting from '../models/setting.js'

export const login = async(req, res) => {
    const {email, password} = req. body;

    const user = await AdminUser.findOne({email});
    if(!user){
        return res.status(400).json({ message: "user doesn't exist" });
    }
    else if(user.role=="user"){
        return res.status(400).json({ message: "user not admin" });
    }
    else if(user.role!="user"){
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        else{
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
            
            res.status(200).cookie("access_token", token,{
                httpOnly: true,
            }).json({
                message: "Login successful!",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    permissions: user.permissions,
                }
            })
        }
    }
}

export const addUser = async(req, res) => {
    const {name, username, email, phoneNumber, password, role, permissions} = req.body;
    
    try{
        const findUser = await AdminUser.findOne({ $or: [{ email }, { username }, {phoneNumber}] });
        if(!findUser){
            const hashPassword = await bcryptjs.hashSync(password, 10);
            const newUser = new AdminUser({
                name,
                username,
                email,
                phoneNumber,
                password:hashPassword,
                role,
                permissions
            })
            await newUser.save();
            return res.status(201).json({ message: "User registered successfully" });
        }
        else{
            return res.status(400).json({message:"user already exist"});
        }
    }
    catch(error){
        return res.status(400),json({message:"error"});
    }
}

export const adsList = async(req, res) => {
    try{
        const allAds = await adsShedule.find();
        res.status(201).json({allAds:allAds, message:"success"});
    }
    catch(error){
        res.status(400).json({message:"fail"})
    }
}

export const adsApproval = async(req, res) => {
    const {id, status} = req.body;

    const changeStatus = await adsShedule.updateOne(
        { _id: id },
        { $set: { status: status } }
    )

    const adsToMoveToHistory = await adsShedule.find({
        status: "notApproved"
    })
    if(adsToMoveToHistory.length === 0){
        console.log("no ads go to History")
    }
    else{
        await historyAds.insertMany(adsToMoveToHistory)
        await adsShedule.deleteMany({
            status: "notApproved",
        });
    }
}

export const publishClassified = async(req, res) => {
    const {layout, file, image, duration} = req.body;
    const newData = new Classified({
        layout,
        file,
        image,
        duration: duration.duration,
    })
    await newData.save();
    await adsShedule.updateMany(
        { duration: duration.duration, status: "approved" },
        { $set: { status: "Active" } }
    );
    const adsToMoveToShow = await adsShedule.find({
        duration: duration.duration, status: "Active"
    })
    if(adsToMoveToShow.length === 0){
        console.log("no ads to show")
    }
    else{
        await ads.insertMany(adsToMoveToShow);
        await adsShedule.deleteMany({
            duration: duration.duration, status: "Active",
        });
    }
    await setting.updateOne(
        {"durations.value":duration.duration},
        {$set: {status: "Expired"}}
    )
    res.status(200).json({message:"published"})
}

export const transfertoHistory = async(req, res) => {
    await ads.updateMany(
        {status: "Active"},
        {$set: {status: "Completed"}}
    )
    const adsToMove = await ads.find({
        status: "Completed"
    });
    if (adsToMove.length === 0) {
        console.log("No ads to move.");
    }
    else{
        await historyAds.insertMany(adsToMove);
        await ads.deleteMany({
            status: "Completed"
          });
    }
}

export const classifiedSettings = async(req, res) => {
    try {
        const { durations, numberOfPages, pageLayouts } = req.body;
        const pageLayoutsObj = pageLayouts;
        const pageLayoutsArray = Object.entries(pageLayoutsObj).map(([pageNumber, layout]) => ({
            pageNumber: parseInt(pageNumber),
            layout,
        }));
    
        const setting = new setClassified({
          durations,
          numberOfPages,
          pageLayouts: pageLayoutsArray,
        });
    
        await setting.save();
        res.status(201).json({ message: 'Classified setting saved successfully.', setting });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

export const getDuration = async(req, res) => {
    const getData = await setting.find({
        status: "Active"
    })
    const durations = getData.flatMap(item => item.durations);
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