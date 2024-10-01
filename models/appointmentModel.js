const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    engineerId: {
      type: String,
      default: null,
    },
    appointmentDetails: {
      date: { type: String, required: true },
      details: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
    engineerInfo: {
      type: String,
      default: null,
    },
    userInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
