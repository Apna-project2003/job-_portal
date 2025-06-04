import User from "../models/user.model.js";
import json from "jsonwebtoken";
export const register = async (req,res) =>{

    try{
const{fullname,email,phoneNumber,password,role} = req.body;

if(!fullname || !email || !phoneNumber || !password || !role){
    return res.status(404).json({
        message : "Missing required fields",
        success : false,
    });
}
const user = await User . findOne({email});

if(user){
    return res.status(400).json({
        message :"Email already exists",
        success : false,
    });
}
    

    //convert passwords to hashes

    const hashedPassword = await bcrypt.hash(password , 10);

    const neewUser = new user({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
    });
    return res.status(200).json({
        message : `Account created successfully ${fullname}` ,
        success : true,
    })

    }
    catch(error){
console.error(error);
res.status(500).json({
    message : "server Error registerig user",
    success : false,
})
    }
};

export const login = async (req,res) =>{

    try{
        const {email,password . role} = req.body;

if( !email  || !password || !role) {
    return res.status(404).json({
        message : "Missing required fields",
        success : false,
    });
}
let user = await User.findOne({email});
if(!user){
    return res.status(404).json({
        message:"Incorrect email or password",
        success : false,
    });
}
const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
    res.status(404).json({
        message : "Incorrect email or password",
        success : false,
    });
}

if(user.role!==role){
    return res.status(403).json({
        message: " You don't have the necessary role to access this resource",
        success : false,
    })
}

//generate token 

const tokenData = {
    userId:user._id,

};
const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1h",

});
user = {
    _id : user._id,
    fullname : user.fullname,
    email: user.email,
    phoneNumber : user.phoneumber,
    role:user.role,
    profile:user.profile,

}
return res.status(200).cookie("token" , token ,{maxAge: 1*24*60*60*1000,
    httpOnly : true,
    sameSite : Strict,

}).json({
    message : `Welcome back ${user.fullname}`,
    user,
    success: true,
})




    }catch(error){
res.status(500).json({
    message:"Server Error login",
    success : false,
});
    }
};

export const logout = (req,res) =>{
    try{
        return  res.status(200).cookie("token", "" ,{maxAge:0}).json({
            messsage : "Logged out successfully",
            success : true,

        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Server Error logout",
            success: false,
        });
    }
};

export  const updateProfile = async(req,res) =>{
 try{
    const {fullname , email,phoneNumber ,bio, skills} = req.body;
const file = req.files;
    
if(!fullname || !email || !phoneNumber || !bio || !skills){
    return res.status(404).json({
        message : "Missing required fields",
        success : false,
    });
}

//cloudiary 




const skillsArray = skills.spilit(',');
const userId = req.id; //middleware authentication
let user = await User.findById (userId(;

    if(!user){
        return res.status(404).json({
            messgae : "user not found",
            success : false,

        });

    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    user.skills = skillsArray;


    await user.save();

    user = {
    _id : user._id,
    fullname : user.fullname,
    email: user.email,
    phoneNumber : user.phoneumber,
    role:user.role,
    profile:user.profile,

};

 return  res.status(200).json({
            messsage : "profile update successfully",
            user,
            success : true,

        })

 }
 catch (error){
  console.error(error);
        res.status(500).json({
            message:"Server Error updateprofile",
            success: false,

        });
 }
}
