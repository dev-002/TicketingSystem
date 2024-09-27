const engineerModel = require("../models/engineerModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching Users",
      error,
    });
  }
};
const getAllEngineersController = async (req, res) => {
  try {
    const engineers = await engineerModel.find({});
    res.status(200).send({
      success: true,
      message: "Engineers data list",
      data: engineers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting engineer's data",
      error,
    });
  }
};

//Engineer Account Status

const changeAccountStatusController = async (req, res) => {
  try {
    const { engineerId ,status } = req.body;
    const engineer = await engineerModel.findByIdAndUpdate(engineerId, {status});
    const user = await userModel.findOne({ _id: engineer.userId });
    const notification = user.notification;
    notification.push({
      type: "engineer-account-request-updated",
      message: `Your Engineer Acoount Has ${status}`,
      onClickPath: "/notification",
    });
    user.isEngineer = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: engineer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllEngineersController,
  getAllUsersController,
  changeAccountStatusController,
};
