import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="w-64 bg-[#3aba42] text-white min-h-screen">
      {/* Logo */}
      <div className="bg-white p-3 text-center">
        <img src={empLogo} alt="EMP Logo" className="w-23.5 mx-auto" />
      </div>

      {/* Menu */}
      <div className="p-4">
        <ul className="list-none p-0 m-0">
          {/* Dashboard */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>

          {/* Kelola Timesheet */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/timesheet/management"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaClock className="mr-3" /> Kelola Timesheet
            </Link>
          </li>

          {/* Kelola Cuti */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/cuti"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaCalendarAlt className="mr-3" /> Kelola Cuti
            </Link>
          </li>

          {/* Kelola Travel */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/travel"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaPlane className="mr-3" /> Kelola Travel
            </Link>
          </li>

          {/* Kelola Dokumen */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/dokumen"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaFileAlt className="mr-3" /> Kelola Dokumen
            </Link>
          </li>

          {/* Kelola Payslip */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/payslip"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaMoneyBillWave className="mr-3" /> Kelola Payslip
            </Link>
          </li>

          {/* Data Karyawan */}
          <li className="mb-4">
            <Link
              to="/hr-dashboard/karyawan"
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600"
            >
              <FaUsers className="mr-3" /> Data Karyawan
            </Link>
          </li>

          {/* Laporan */}
          <li className="mb-4">
            <div
              onClick={() => setOpenLaporan(!openLaporan)}
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600 cursor-pointer"
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
                <li className="mb-2">
                  <Link
                    to="/hr-dashboard/laporan/absensi"
                    className="block text-sm text-white hover:text-green"
                  >
                    Laporan Absensi
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/hr-dashboard/laporan/karyawan"
                    className="block text-sm text-white hover:text-green"
                  >
                    Laporan Karyawan
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/hr-dashboard/laporan/analitik"
                    className="block text-sm text-white hover:text-green"
                  >
                    Laporan Analitik
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HRSidebar;
