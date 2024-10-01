import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table, Input } from "antd";

const Search = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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

  // Filter appointments based on searchText
  const filteredAppointments = appointments.filter(appointment =>
    appointment._id.includes(searchText) 
  );

  const columns = [
    {
      title: 'Appointment ID',
      dataIndex: '_id', // Uncomment this line
    },
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
      title: "Project Name",
      render: (text, record) => (
        <span>{record.appointmentDetails?.projectName || "N/A"}</span>
      ),
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
      <h1>Search</h1>
      <Input 
        placeholder="Search by Appointment ID" 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
        style={{ marginBottom: 16 }} 
      />
       {searchText && filteredAppointments.length > 0 ? (
        <Table columns={columns} dataSource={filteredAppointments} />
      ) : (
        searchText && <p>No Tickets found.</p>
      )}
    </Layout>
  );
};

export default Search;
