import express from 'express';
const router = express.Router();
import {
  applyConnection,
  checkStatus,
  getAllApplications,
  approveApplication,
  rejectApplication,
  getApplicationById,
  updateDate
} from '../controllers/aadharController.js'; 

// Routes
router.post("/apply", applyConnection);
router.get("/status/:aadhar", checkStatus);
router.get("/applications", getAllApplications);
router.get("/application/:id", getApplicationById);
router.put("/application/:id/update-date",updateDate);
router.put("/application/:id/approve", approveApplication);
router.put("/application/:id/reject", rejectApplication);

export default router;
