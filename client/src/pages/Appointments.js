import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(res.data); // Log the response data
      if (res.data.message === "User appointment fetch successfully") {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    // {
    //   title: "Appointment ID",
    //   dataIndex: '_id',
    // },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Engineer ID',
      dataIndex: 'engineerId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => (
        <span>
          {moment(text).format('DD-MM-YYYY HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text) => (
        <span>
          {moment(text).format('DD-MM-YYYY HH:mm')}
        </span>
      ),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (text) => (
        <span>
          {moment(text).format('DD-MM-YYYY HH:mm')}
        </span>
      ),
    },
  ];
  
  return (
    <Layout>
      <h1>Dashboard Insights</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;