import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { DatePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [date, setDate] = useState();
  const [details, setDetails] = useState("");
  const dispatch = useDispatch();

  const handleTextareaChange = (e) => {
    setDetails(e.target.value);
  };

  //login user data
  // const getUserData = async () => {
  //   try {
  //     const res = await axios.post(
  //       "/api/v1/engineer/getEngineerById",
  //       { engineerId: params.engineerId },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       setEngineers(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ========booking function

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          engineerId: null,
          engineerInfo: null,
          userId: user._id,
          appointmentDetails: {
            date: date,
            details: details,
          },
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) message.success(res.data.message);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-4">
        <div>
          <div>
            <h4>Select Date</h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
            </div>
            <div>
              <h4>Appointment Detials</h4>
              <textarea
                className="m-2 p-1"
                value={details}
                onChange={handleTextareaChange}
                rows={5}
                cols={43}
                placeholder="Provide motive for Appointment"
              />
            </div>

            <button className="btn btn-dark mt-2" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
