import React from "react";
import { FaUserPlus, FaUsersCog, FaClock, FaFileAlt, FaHandshake, FaMoneyBillWave, FaChartBar } from "react-icons/fa";

const HRDashboard = () => {
  const hrMenuItems = [
    { title: "Manajemen Karyawan", icon: <FaUsersCog size={40} />, color: "bg-info" },
    { title: "Rekrutmen & Onboarding", icon: <FaUserPlus size={40} />, color: "bg-success" },
    { title: "Absensi & Timesheet", icon: <FaClock size={40} />, color: "bg-warning" },
    { title: "Pengelolaan Dokumen", icon: <FaFileAlt size={40} />, color: "bg-danger" },
    { title: "Penggajian", icon: <FaMoneyBillWave size={40} />, color: "bg-primary" },
    { title: "Penilaian Kinerja", icon: <FaHandshake size={40} />, color: "bg-secondary" },
    { title: "Laporan & Analitik", icon: <FaChartBar size={40} />, color: "bg-dark" },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        {hrMenuItems.map((item, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className={`card text-white ${item.color} shadow`}>
              <div className="card-body text-center p-4">
                {item.icon}
                <h5 className="card-title mt-3">{item.title}</h5>
                <a href="#" className="btn btn-light btn-sm mt-3">
                  Kelola
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;