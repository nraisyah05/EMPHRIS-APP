import React from "react";
import { FaClock, FaCalendarAlt, FaPlane, FaFileAlt, FaMoneyBill, FaUsers, FaUser } from "react-icons/fa";

const User_Dashboard = () => {
  const menuItems = [
    { title: "Timesheet", icon: <FaClock size={40} />, color: "bg-info" },
    { title: "Cuti", icon: <FaCalendarAlt size={40} />, color: "bg-success" },
    { title: "Travel Request", icon: <FaPlane size={40} />, color: "bg-warning" },
    { title: "Dokumen", icon: <FaFileAlt size={40} />, color: "bg-danger" },
    { title: "Payslip", icon: <FaMoneyBill size={40} />, color: "bg-primary" },
    { title: "Info (Struktur Organisasi)", icon: <FaUsers size={40} />, color: "bg-secondary" },
    { title: "Personal Data", icon: <FaUser size={40} />, color: "bg-dark" },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {menuItems.map((item, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className={`card text-white ${item.color} shadow`}>
              <div className="card-body text-center p-4">
                {item.icon}
                <h5 className="card-title mt-3">{item.title}</h5>
                <a href="#" className="btn btn-light btn-sm mt-3">
                  Enter
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User_Dashboard;
