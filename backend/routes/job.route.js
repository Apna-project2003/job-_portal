import express from "express";
 import authenticateToken from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobByid, postJob } from "../controllers/job.controller.js";


const router = express.Router();


router.route("/post").post(authenticateToken,postJob);
router.route("/get").get(authenticateToken,getAllJobs);

router
  .route("/getadminjobs").get(authenticateToken,getAdminJobs);
  
 router.route("/get/:id") .get(authenticateToken,  getJobByid);

export default router;