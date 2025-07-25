import { Job } from "../models/job.model.js";



export const postJob = async (req,res) =>{

   

    try{
        const { title , description,requirements,salary,location,jobType,position,companyId,experience} = req.body;
 

        const userId = req.id;
       


 if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experience){

   
    return res.status(400).json({ message:"please fill all the fields", 
        success:false,

    });

 }

 
 const job = await Job. create({
    title ,
     description,
     requirements : requirements.split(","),
     salary : Number(salary),
     location,jobType,position,company:companyId,experience,
     created_by:userId,

 });

 


 return res.status(201).json({message:"Job posted successfully",status:true,job});
    }
    catch(error){
       console.error("Register error:",error);
       return res.status(500).json({message:"server Error",status:false});
    }
};


export const getAllJobs = async(req,res) =>{

    console.log("API HIT" );
    try{
const keyword = req.query.keyword || "";
const query = {
$or:[
    {title : {$regex:  keyword, $options:"i"}},
    {description : {$regex:  keyword, $options:"i"}},
    {requirements : {$regex:  keyword, $options:"i"}},
    {location : {$regex:  keyword, $options:"i"}},
    {jobType : {$regex:  keyword, $options:"i"}},
    {position : {$regex:  keyword, $options:"i"}},

],
};

const jobs = await Job.find(query).populate({
 
     path:"company",
 
}).sort({createAt:-1});


console.log("📦 Jobs found:", jobs);


if(!jobs){
    return res.status(404).json({message:"No jobs found" , status : false});

}
return res.status(200).json({jobs,status:true});
    }
    catch(error){
    console.error("❌ Error in getAllJobs:", error);
return res.status(500).json({message : "Server Error" , status:false});

    }
};

export const getJobByid = async (req,res) =>{

    try{
const jobId = req.params.id;
const job = await Job.findById(jobId).populate({
    path:"applications",
})

if(!job){
    return res.status(404).json({message:"Job not found",status : false});

}

return res.status(200).json({job,status:true});
    }catch(error){
        return res.status(500).json({message : "Server Error" , status:false});
    }
};


export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};