import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, message, Row, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const { Title, Paragraph } = Typography;

const ApplyEngineer = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-engineer",
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
        message.error(res.data.message); // Adjusted to show the actual message
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Title level={2} className="text-center mb-4">Apply For Technical Team Account</Title>
      <Paragraph className="text-center mb-4">Please fill in your details below to apply for the Technical position.</Paragraph>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="p-4 bg-white rounded shadow-sm"
        style={{ maxWidth: '600px', margin: '0 auto' }} // Centering the form
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
              <Input type="text" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input type="text" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyEngineer;
