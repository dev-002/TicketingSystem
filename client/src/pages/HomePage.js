import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row, Col, Typography, Spin } from "antd"; // Added Typography and Spin for better styling
import EngineersList from "../components/EngineersList";

const { Title } = Typography; // Destructure Title from Ant Design Typography

const HomePage = () => {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllEngineers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setEngineers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Title level={2} className="text-center mb-4">Create Issue</Title>
      {loading ? (
        <div className="text-center">
          <Spin size="large" /> {/* Loader while fetching data */}
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center"> {/* Add spacing between items */}
          {engineers.length > 0 ? (
            engineers.map((engineer) => (
              <Col xs={24} sm={12} md={8} lg={6} key={engineer.id}> {/* Responsive columns */}
                <EngineersList engineer={engineer} />
              </Col>
            ))
          ) : (
            <Col span={24} className="text-center">
              <p>No engineers found.</p>
            </Col>
          )}
        </Row>
      )}
    </Layout>
  );
};

export default HomePage;
