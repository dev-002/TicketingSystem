import React from "react";
import { useNavigate } from "react-router-dom";

const EngineersList = ({ engineer }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-4"
        style={{cursor:'pointer'}}
        onClick={() => navigate(`/engineer/book-appointment/${engineer._id}`)}
      >
        <div className="card-header">
          {engineer.firstName} {engineer.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Name</b> {engineer.firstName}
          </p>
          <p>
            <b>Ticket Number</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default EngineersList;
