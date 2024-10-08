import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { message, Table, Spin, Typography } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography; // Destructure Title from Ant Design Typography

const EngineerAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [engineerInfo, setengineerInfo] = useState({});
  const [loading, setLoading] = useState(true); // State for loading

  const getEngineerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/engineer/getEngineerInfo",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setengineerInfo(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch engineer info.");
    }
  };

  const getAppointments = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get("/api/v1/engineer/engineer-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch appointments.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    getAppointments();
    getEngineerInfo();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/engineer/update-status",
        { appointmentsId: record._id, status, engineerInfo: engineerInfo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments(); // Refresh appointments
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
    },
    
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Engineer ID",
      dataIndex: "engineerId",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY HH:mm")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Project Name",
      render: (text, record) => (
        <span>{record.appointmentDetails?.projectName || "N/A"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status === "pending" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approve")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY HH:mm")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY HH:mm")}</span>,
    },
  ];

  return (
    <Layout>
      <Title level={2} className="text-center mb-4">
        Appointment List
      </Title>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </Layout>
  );
};

export default EngineerAppointment;
