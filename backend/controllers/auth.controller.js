import admin from "firebase-admin";
import User from '../models/user.js'

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, username, password, phoneNumber } = req.body;

        if (!name || !email || !username || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }, {phoneNumber}] });
        if (existingUser) {
            return res.status(400).json({ message: "User already in use" });
        }

        const firebaseUser = await admin.auth().createUser({
            email,
            password,
        });

        const newUser = new User({
            firebaseUID: firebaseUser.uid,
            name,
            email,
            username,
            phoneNumber,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", userId: firebaseUser.uid });

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async(req, res) => {
    console.log(req.body);
    console.log("hii");
    try {
        const {idToken} = req.body;

        if (!idToken) {
            return res.status(400).json({ message: "ID token is required" });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        const { uid } = decodedToken;
        
        const findUser = await User.findOne({firebaseUID: uid});

        return res
            .status(201)
            .cookie("access_token", idToken,{httpOnly: true,})
            .json({ message: 'Login successful', findUser }); 

    } catch (error) {
        console.error("Error in login:", error);

        if (error.code === "auth/user-not-found") {
            return res.status(401).json({ message: "User not found" });
        } else if (error.code === "auth/wrong-password") {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}