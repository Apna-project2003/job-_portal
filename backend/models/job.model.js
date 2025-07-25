// import { request } from "express";
// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     requirements: {
//         type: [String],
//         required : true,
//     },
//     salary: {
//         type: String,
//         required: true,
//     },
//     // experienceLevel:{
//     //     type:Number,
//     //     required:true,
//     // },
//     location: {
//         type: String,
//         required: true,
//     },
//     jobType: {
//         type: String,
//         required: true,
//     },
//     position: {
//         type: String,
//         required: true,
//     },
//     company: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Company',
//         required: true,
//     },
//     created_by: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     applications: 
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Application",
//             default :null,

//         },
//         experience:{
//             type:Number,
//             required : true,
//         },
    
// },{timestamps:true});
// export const Job = mongoose.model("Job", jobSchema);



import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: 
      {
        type: [String],
        required:true,
      },
    
    salary: {
      type: String,
      required: true,
    },
    // experienceLevel: {
    //   type: Number,
    //   required: true,
    // },
    experience:{
        type:String,
        required:true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
      
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);