import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClock,
  FaCalendarAlt,
  FaPlane,
  FaFileAlt,
  FaMoneyBill,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import empLogo from "../assets/logo-emp.png";

const UserSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, to: "/user-dashboard" },
    { name: "Timesheet", icon: <FaClock />, to: "/user-dashboard/timesheet" },
    { name: "Cuti", icon: <FaCalendarAlt />, to: "/user-dashboard/cuti" },
    { name: "Travel Request", icon: <FaPlane />, to: "/user-dashboard/travel" },
    { name: "Dokumen", icon: <FaFileAlt />, to: "/user-dashboard/dokumen" },
    { name: "Payslip", icon: <FaMoneyBill />, to: "/user-dashboard/payslip" },
    { name: "Struktur Organisasi", icon: <FaUsers />, to: "/user-dashboard/struktur-organisasi" },
    { name: "Personal Data", icon: <FaUser />, to: "/user-dashboard/personal-data" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-green-600 text-white min-h-screen">
      <div className="bg-white p-3 text-center">
        <img src={empLogo} alt="EMP Logo" className="w-23.5 mx-auto" />
      </div>
      <div className="p-4">
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
            <li key={item.to} className="mb-4">
              <Link
                to={item.to}
                className={`flex items-center !no-underline text-base p-2 rounded transition-colors no-underline ${
                  isActive(item.to) 
                    ? "bg-green-700 text-white" 
                    : "text-white hover:bg-green-600"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;