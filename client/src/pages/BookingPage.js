import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {showLoading,hideLoading} from '../redux/features/alertSlice'

const BookingPage = () => {
  const {user} = useSelector(state => state.user);
  const params = useParams();
  const [engineers, setEngineers] = useState([]);
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  
  
  
  
  
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/engineer/getEngineerById",
        { engineerId: params.engineerId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setEngineers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ========booking function

const handleBooking = async() => {
  try{
dispatch(showLoading())
const res = await axios.post('/api/v1/user/book-appointment',
  {
    engineerId: params.engineerId,engineerInfo: engineers,
    userId: user._id,
    date: date,
    userInfo: user,
   
  },{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)
dispatch(hideLoading())
if(res.data.success)
  message.success(res.data.message)
  }catch (error){
    dispatch(hideLoading())
    console.log(error)
  }
}

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-4">
        {engineers && (
          <div>
            <h4>
              {engineers.firstName} {engineers.lastName}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
