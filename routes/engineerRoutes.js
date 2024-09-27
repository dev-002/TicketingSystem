const express = require("express");
const {
  getEngineerInfoController,
  updateProfileController,
  getEngineerByIdController,
  engineerAppointmentController,
  updateStatusController,
} = require("../controllers/engineerControl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE ENGINEER INFO
router.post("/getEngineerInfo", authMiddleware, getEngineerInfoController);

//Post Update Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//Post get single eng info
router.post("/getEngineerById", authMiddleware, getEngineerByIdController);

//Get Appointments
router.get(
  "/engineer-appointments",
  authMiddleware,
  engineerAppointmentController
);

//post update status 
router.post('/update-status' , authMiddleware , updateStatusController)
module.exports = router;
