import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Form, Input, message, Row, Typography, Spin } from "antd"; // Added Typography and Spin
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const { Title } = Typography; // Destructure Title from Ant Design Typography

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [engineer, setEngineer] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Update engineer
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/engineer/updateProfile",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Get Engineer Details
  const getEngineerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/engineer/getEngineerInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setEngineer(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    getEngineerInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Title level={2} className="text-center mb-4">Manage Profile</Title>
      {loading ? (
        <div className="text-center">
          <Spin size="large" /> {/* Loader while fetching data */}
        </div>
      ) : (
        engineer && (
          <Form 
            layout="vertical" 
            onFinish={handleFinish} 
            className="p-5 bg-white rounded shadow-sm" // Increased padding
            initialValues={engineer}
            style={{ maxWidth: '600px', margin: '0 auto' }} // Set a max width and center it
          >
            <h6 className="mb-4 text-secondary">Personal Details</h6>
            <Row gutter={20}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input type="text" placeholder="First Name" className="rounded" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input type="text" placeholder="Last Name" className="rounded" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                  <Input type="text" placeholder="Email" className="rounded" />
                </Form.Item>
              </Col>
            </Row>
    
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </Form>
        )
      )}
    </Layout>
  );
};

export default Profile;
