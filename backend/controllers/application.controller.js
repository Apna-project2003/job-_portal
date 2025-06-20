// import { Application } from "../models/application.model.js";

// import { Job } from "../models/job.model.js";
// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const jobId = req.params.id;
//     if (!jobId) {
//       return res
//         .status(400)
//         .json({ message: "Invalid job id", success: false });
//     }
   
    
//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });
//     if (existingApplication) {
//       return res.status(400).json({
//         message: "You have already applied for this job",
//         success: false,
//       });
//     }
//     //check if the job exists or not
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found", success: false });
//     }

//     const  newApplication = await Application.create({
//         job:jobId,
//         applicant : userId,
//     });
//     job.applications.push(newApplication._id);
//     await job.save();

//     return res.status(201).json({message:"Application submitted" , success : true});


// }
// catch(error){
// console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
// }
// };


import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job id", success: false });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Push application ID to job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted",
      success: true,
      application: newApplication,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};




// import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";

// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const jobId = req.params.id;

//     if (!jobId) {
//       return res.status(400).json({ message: "Invalid job id", success: false });
//     }

//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });

//     if (existingApplication) {
//       return res.status(400).json({
//         message: "You have already applied for this job",
//         success: false,
//       });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found", success: false });
//     }

//     const application = await Application({
//       job: jobId,
//       applicant: userId,
//     });

//     await application.save(); // ✅ Save new application
//     job.applications.push(application._id); // ✅ Corrected variable
//     await job.save();

//     return res.status(201).json({ message: "Application submitted", success: true });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

     const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application status updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};