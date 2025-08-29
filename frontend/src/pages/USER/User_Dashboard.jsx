import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCalendarAlt,
  FaPlane,
  FaFileAlt,
  FaMoneyBill,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Timesheet", icon: <FaClock size={50} />, color: "bg-info", path: "/user-dashboard/timesheet" },
    { title: "Cuti", icon: <FaCalendarAlt size={50} />, color: "bg-success", path: "/user-dashboard/cuti" },
    { title: "Travel Request", icon: <FaPlane size={50} />, color: "bg-warning", path: "/user-dashboard/travel-request" },
    { title: "Dokumen", icon: <FaFileAlt size={50} />, color: "bg-danger", path: "/user-dashboard/dokumen" },
    { title: "Payslip", icon: <FaMoneyBill size={50} />, color: "bg-primary", path: "/user-dashboard/payslip" },
    { title: "Info (Struktur Organisasi)", icon: <FaUsers size={50} />, color: "bg-secondary", path: "/user-dashboard/struktur-organisasi" },
    { title: "Personal Data", icon: <FaUser size={50} />, color: "bg-dark", path: "/user-dashboard/personal-data" },
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
              <div className="card-body text-center p-5 d-flex flex-column justify-content-center align-items-center">
                {item.icon}
                <h5 className="card-title mt-3">{item.title}</h5>
                <button
                  className="btn btn-light btn-sm mt-3"
                  onClick={() => navigate(item.path)}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
