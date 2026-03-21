import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//REGISTER 
export const register = async (req, res) => {
    try {
        console.log("📩 REGISTER BODY:", req.body);

        const { fullname, email, phoneNumber, password, role } = req.body;

        // 
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        
        const file = req.file;
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: role.toLowerCase().trim(),
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : "",
            }
        });

        console.log("✅ User registered:", email);

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log("🔥 REGISTER ERROR:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


//  LOGIN 
export const Login = async (req, res) => {
    try {
        console.log("==== LOGIN DEBUG START ====");
        console.log("📩 Request Body:", req.body);

        const { email, password, role } = req.body;

    
        if (!email || !password || !role) {
            console.log("❌ Missing fields");
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

      
        let user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        console.log("✅ User found:", user.email);

        
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("❌ Password mismatch");
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

       
        const frontendRole = role.toLowerCase().trim();
        const dbRole = user.role.toLowerCase().trim();

        console.log("🔍 Role Check:");
        console.log("Frontend Role:", frontendRole);
        console.log("DB Role:", dbRole);

        if (frontendRole !== dbRole) {
            console.log("❌ Role mismatch");
            return res.status(400).json({
                message: "Account does not exist with this role",
                success: false
            });
        }

      
        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        
        const safeUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        console.log("✅ Login successful:", safeUser.email);

        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            .json({
                message: `Welcome back ${safeUser.fullname}`,
                user: safeUser,
                success: true
            });

    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.log("🔥 LOGOUT ERROR:", error.message);
    }
};



export const updateProfile = async (req, res) => {
    try {
        console.log("📩 UPDATE BODY:", req.body);
        console.log("📁 FILE:", req.file);
        console.log("👤 USER ID:", req.id);

        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const userId = req.id;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

  
        if (!user.profile) {
            user.profile = {};
        }

        
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile.bio = bio || user.profile.bio;

        
        if (skills && user.role === "student") {
            user.profile.skills = skills.split(",").map(s => s.trim());
        }

        
        if (file) {
            const fileUri = getDataUri(file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                { resource_type: "auto" }
            );

            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        console.log("✅ Profile updated");

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log("🔥 UPDATE ERROR:", error.message);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};