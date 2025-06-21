import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

export const register = async (req, res) => {

  console.log("API HIT", register);

  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    console.log("data received",{fullname, email, phoneNumber, password, role});

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri =getDataUri(file);
    const cloudResponse = await cloudinary . uploader.upload(fileUri.content);

console.log("reiceved file",file );

    const user = await User.findOne({ email });
console.log("user recived",user);

    if (user) {
    
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    

//     const newUser = await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile:{
//        profilePhoto:cloudResponse.secure_url,
//       },
//     });
//  await User.create.save();


const newUser = await User.create({
  fullname,
  email,
  phoneNumber,
  password: hashedPassword,
  role,
  profile: {
    profilePhoto: cloudResponse.secure_url,
    skills:skills,
    bio:bio,
  },
});

await newUser.save();

console.log("newuser saved", newUser);








    return res.status(200).json({
      message: `Account created successfully ${fullname}.`,
      success: true,
      user:newUser,
    });
  

 } catch (error) {
  console.error("Register API Error:", error);
  res.status(500).json({
    message: "server Error",
    success: false,
  });
}

};




export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (user.role !== role) {
      return res.status(403).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        token,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server Error",
      success: false,
    });
  }
};













export const logout = (req, res) => {
  try {
    res.status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Logout failed.",
      success: false,
    });
  }
};















export const updateProfile = async (req, res) => {
    try {
       

        const { fullname, email, phoneNumber, bio, skills } = req.body;
     
        const file = req.file;
       

        // Missing fields check
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            console.warn("⚠️ Step 4: Missing some fields");
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        // Parse skills
        const skillsArray = skills.split(',').map(skill => skill.trim());
       

        // Get user ID from middleware
        const userId = req.id;
      

        // Find user in DB
        let user = await User.findById(userId);
        if (!user) {
            // console.error("❌ Step 7: User not found in DB");
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }
      

        // Upload file to Cloudinary
        if (file) {
           
            const fileUri = getDataUri(file);

if (!fileUri || !fileUri.content) {
  return res.status(400).json({ message: "Invalid file content" });
}

            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
           
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }

        // Update user fields
       
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        // Save updated user
        await user.save();
        

        // Prepare response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

      

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error("❌ Step X: Error in updateProfile:", error);
        return res.status(500).json({
            message: "Server error during profile update",
            success: false
        });
    }
};
