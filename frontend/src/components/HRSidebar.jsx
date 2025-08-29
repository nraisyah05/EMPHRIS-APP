import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClock,
  FaCalendarAlt,
  FaPlane,
  FaFileAlt,
  FaMoneyBillWave,
  FaUsers,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import empLogo from "../assets/logo-emp.png";

const HRSidebar = () => {
  const [openLaporan, setOpenLaporan] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, to: "/hr-dashboard" },
    { name: "Kelola Timesheet", icon: <FaClock />, to: "/hr-dashboard/management" },
    { name: "Kelola Cuti", icon: <FaCalendarAlt />, to: "/hr-dashboard/leave" },
    { name: "Kelola Travel", icon: <FaPlane />, to: "/hr-dashboard/travelrequest" },
    { name: "Kelola Dokumen", icon: <FaFileAlt />, to: "/hr-dashboard/document" },
    { name: "Kelola Payslip", icon: <FaMoneyBillWave />, to: "/hr-dashboard/payslip" },
    { name: "Data Karyawan", icon: <FaUsers />, to: "/hr-dashboard/data-karyawan" },
  ];

  const laporanItems = [
    { name: "Laporan Absensi", to: "/hr-dashboard/laporan/absensi" },
    { name: "Laporan Karyawan", to: "/hr-dashboard/laporan/karyawan" },
    { name: "Laporan Analitik", to: "/hr-dashboard/laporan/analitik" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-green-600 text-white min-h-screen">
      {/* Logo */}
      <div className="bg-white p-3 text-center">
        <img src={empLogo} alt="EMP Logo" className="w-23.5 mx-auto" />
      </div>

      {/* Menu */}
      <div className="p-4">
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
            <li key={item.to} className="mb-4">
              <Link
                to={item.to}
                className={`flex items-center !no-underline text-base p-2 rounded transition-colors no-underline !text-white ${
                  isActive(item.to) ? "bg-green-700" : "hover:bg-green-600"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}

          {/* Laporan */}
          <li className="mb-4">
            <div
              onClick={() => setOpenLaporan(!openLaporan)}
              className={`flex items-center text-base p-2 rounded cursor-pointer transition-colors no-underline !text-white ${
                laporanItems.some((lap) => isActive(lap.to)) ? "bg-green-700" : "hover:bg-green-600"
              }`}
            >
              <div className="flex items-center flex-1">
                <FaChartBar className="mr-3" /> Laporan
              </div>
              <span className="ml-auto">
                {openLaporan ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openLaporan && (
              <ul className="list-none pl-8 mt-2">
                {laporanItems.map((lap) => (
                  <li key={lap.to} className="mb-2">
                    <Link
                      to={lap.to}
                      className={`block text-sm !no-underline transition-colors no-underline ${
                        isActive(lap.to) ? "text-green-300" : "text-white hover:text-green-200"
                      }`}
                    >
                      {lap.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HRSidebar;