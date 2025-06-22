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

    console.log("User ID:", userId);
    console.log("Job ID from params:", jobId);

    if (!jobId) {
      console.log("Invalid job ID");
      return res.status(400).json({ message: "Invalid job id", success: false });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    console.log("Existing Application:", existingApplication);

    if (existingApplication) {
      console.log("User already applied for this job");
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    console.log("Job Found:", job);

    if (!job) {
      console.log("Job not found in DB");
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    console.log("New Application Created:", newApplication);

    job.applications.push(newApplication._id);
    await job.save();
    console.log("Job updated with new application");

    return res.status(201).json({ message: "Application submitted", success: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};






// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.id;
//     const application = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "job",
//         options: { sort: { createdAt: -1 } },
//         populate: { path: "company", options: { sort: { createdAt: -1 } } },
//       });
//     if (!application) {
//       return res
//         .status(404)
//         .json({ message: "No applications found", success: false });
//     }

//     return res.status(200).json({ application, success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };




export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    console.log("📥 User ID:", userId);

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    console.log("📦 Applications found:", application?.length);

    // Note: application will be an array — even if empty.
    if (!application || application.length === 0) {
      console.warn("⚠️ No applications found for user:", userId);
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.error("❌ Error in getAppliedJobs:", error);
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

// export const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const applicationId = req.params.id;
//     if (!status) {
//       return res.status(400).json({
//         message: "status is required",
//         success: false,
//       });
//     }

//      const application = await Application.findOne({ _id: applicationId });
//     if (!application) {
//       return res.status(404).json({
//         message: "Application not found.",
//         success: false,
//       });
//     }

//     // update the status
//     application.status = status.toLowerCase();
//     await application.save();

//     return res
//       .status(200)
//       .json({ message: "Application status updated", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };


import mongoose from "mongoose"; // for ObjectId validation

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    console.log("📥 Request to update application:", {
      status,
      applicationId,
    });

    // Check if applicationId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid application ID format",
        success: false,
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const allowedStatuses = ["pending", "accepted", "rejected"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    console.log("✅ Status updated:", application.status);

    return res.status(200).json({
      message: "Application status updated",
      success: true,
    });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
