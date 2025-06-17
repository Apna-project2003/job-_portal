



import { User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, password, role } = req.body;

        // console.log(fullname , email , phoneNumber , password , role) ;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                message: "Something is missing",
                success: false,
            });
        }
        const file = req.file;
      
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await  User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
           
        });

        return res.status(200).json({
            message: `Account created successfully ${fullname}.`,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"server Error",
            success:false,
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(email,password,role);
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
        if (user.role !==role) {
            return res.status(403).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token =  await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d", });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true,
             sameSite: 'Strict' ,

         }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            token,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"server Error",
            success:false,
        });
    }
};
export const logout =  (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"server error logout",
            success:false,
        });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.files;
      if(!fullname || !email || !phoneNumber || !bio || !skills){
        return res.status(404).json({
            message:"Missing required fields",
            success:false,
        });
      }
       
//cloudinary

        
           const  skillsArray = skills.split(',');
        
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }
        // updating data
         user.fullname = fullname;
       user.email = email;
          user.phoneNumber = phoneNumber;
      user.profile.bio = bio;
         user.profile.skills = skillsArray;
      
       


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        });
    } catch (error) {
        
         console.error(error);
        res.status(500).json({
            message:"server error logout",
            success:false,
        });
    }
};








