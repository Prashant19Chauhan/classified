import AdminUser from '../models/admin.js'
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