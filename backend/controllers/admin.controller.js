import AdminUser from '../models/admin.js'
import Ads from '../models/Ad.js'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
                message: "Login successful!",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        }
    }
}

export const addUser = async(req, res) => {
    const {name, username, email, phoneNumber, password, role, permissions} = req.body;
    
    try{
        const findUser = await AdminUser.findOne({ $or: [{ email }, { username }, {phoneNumber}] });
        console.log(findUser);
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
        const allAds = await Ads.find();
        res.status(201).json({allAds:allAds, message:"success"});
    }
    catch(error){
        res.status(400).json({message:"fail"})
    }
}

export const adsApproval = async(req, res) => {
    const {id, status} = req.body;

    const changeStatus = await Ads.updateOne(
        { _id: id },
        { $set: { status: status } }
    )
}