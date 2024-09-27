import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Engineers = () => {
  const [engineers, setEngineers] = useState([]);

  //getEngineers
  const getEngineers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllEngineers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setEngineers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { engineerId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getEngineers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record , 'approved')}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Engineers</h1>
      <Table columns={columns} dataSource={engineers} />
    </Layout>
  );
};

export default Engineers;
