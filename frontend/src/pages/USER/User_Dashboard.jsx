import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaPlane,
  FaFileAlt,
  FaMoneyBill,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const User_Dashboard = () => {
  const menuItems = [
    { title: "Timesheet", icon: <FaClock size={50} />, color: "bg-info" },
    { title: "Cuti", icon: <FaCalendarAlt size={50} />, color: "bg-success" },
    { title: "Travel Request", icon: <FaPlane size={50} />, color: "bg-warning" },
    { title: "Dokumen", icon: <FaFileAlt size={50} />, color: "bg-danger" },
    { title: "Payslip", icon: <FaMoneyBill size={50} />, color: "bg-primary" },
    { title: "Info (Struktur Organisasi)", icon: <FaUsers size={50} />, color: "bg-secondary" },
    { title: "Personal Data", icon: <FaUser size={50} />, color: "bg-dark" },
  ];

  return (
    <div className="container mt-1">
      <h3 className="mb-4">Dashboard User</h3>
      <div className="row">
        {menuItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className={`card text-white ${item.color} shadow h-100`}
              style={{ minHeight: "220px", borderRadius: "5px" }}
            >
              <div className="card-body text-center p-4 d-flex flex-column justify-content-center align-items-center">
                {item.icon}
                <h6 className="card-title mt-3">{item.title}</h6>
                <button className="btn btn-light btn-sm mt-3">Enter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User_Dashboard;
