import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClock,
  FaPlane,
  FaFileAlt,
  FaMoneyBillWave,
  FaSitemap,
  FaChartBar,
} from "react-icons/fa";

const HRDashboard = () => {
  const navigate = useNavigate();

  const hrMenuItems = [
    { title: "Kelola Timesheet", icon: <FaClock size={50} />, color: "bg-info", path: "/hr-dashboard/timesheet/management" },
    { title: "Kelola Cuti", icon: <FaFileAlt size={50} />, color: "bg-success", path: "/hr/cuti" },
    { title: "Kelola Travel Request", icon: <FaPlane size={50} />, color: "bg-warning", path: "/hr/travel-request" },
    { title: "Kelola Dokumen", icon: <FaFileAlt size={50} />, color: "bg-danger", path: "/hr/dokumen" },
    { title: "Kelola Payslip", icon: <FaMoneyBillWave size={50} />, color: "bg-primary", path: "/hr/payslip" },
    { title: "Kelola Data Karyawan", icon: <FaUsers size={50} />, color: "bg-secondary", path: "/hr/karyawan" },
    { title: "Struktur Organisasi", icon: <FaSitemap size={50} />, color: "bg-dark", path: "/hr/struktur" },
  ];

  return (
    <div className="container mt-1">
      <h3 className="mb-4">Dashboard HR</h3>
      <div className="row">
        {hrMenuItems.map((item, index) => (
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
                  Kelola
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;
