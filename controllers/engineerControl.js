const engineerModel = require("../models/engineerModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");
const getEngineerInfoController = async (req, res) => {
  try {
    const engineer = await engineerModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "engineer data fetch success ",
      data: engineer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching engineer details",
    });
  }
};

//update eng profile
const updateProfileController = async (req, res) => {
  try {
    const engineer = await engineerModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Engineer Profile Updated",
      data: engineer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Engineer Profile Update Issue",
      error,
    });
  }
};
//get single engineer
const getEngineerByIdController = async (req, res) => {
  try {
    const engineer = await engineerModel.findOne({ _id: req.body.engineerId });
    res.status(200).send({
      success: true,
      message: "Error in Single Engineer info",
      data: engineer,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      error,
      message: "Error in Single Engineer Info",
    });
  }
};

const engineerAppointmentController = async (req, res) => {
  try {
    const engineer = await engineerModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      engineerId: engineer._id,
    });

    res.status(200).send({
      success: true,
      message: "eng appointment fetched success",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in eng appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
   const notification = user.notification;
    notification.push({
      type: "status updated",
      message: `your appointment has been updated`,
      onClickPath: "/engineer-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "appointment status updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update status",
    });
  }
};

module.exports = {
  getEngineerInfoController,
  updateProfileController,
  getEngineerByIdController,
  engineerAppointmentController,
  updateStatusController,
};
