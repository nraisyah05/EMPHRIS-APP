import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClock,
  FaCalendarAlt,
  FaPlane,
  FaFileAlt,
  FaMoneyBill,
  FaUsers,
  FaUser,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import empLogo from "../assets/logo-emp.png";

const UserSidebar = () => {
  const [openDokumen, setOpenDokumen] = useState(false);

  return (
    <div className="w-64 bg-[#3aba42] text-white min-h-screen">
      <div className="bg-white p-3 text-center">
        <img src={empLogo} alt="EMP Logo" className="w-23.5 mx-auto" />
      </div>
      <div className="p-4">
        <ul className="list-none p-0 m-0">
          <li className="mb-4">
            <Link to="/user-dashboard" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/timesheet" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaClock className="mr-3" /> Timesheet
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/cuti" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaCalendarAlt className="mr-3" /> Cuti
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/travel" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaPlane className="mr-3" /> Travel Request
            </Link>
          </li>
          <li className="mb-4">
            <div
              onClick={() => setOpenDokumen(!openDokumen)}
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600 cursor-pointer"
            >
              <div className="flex items-center flex-1">
                <FaFileAlt className="mr-3" /> Dokumen
              </div>
              <span className="ml-auto">{openDokumen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {openDokumen && (
              <ul className="list-none pl-8 mt-2">
                <li className="mb-2">
                  <Link to="/user-dashboard/dokumen/surat" className="block text-sm text-white hover:text-green">Surat</Link>
                </li>
                <li className="mb-2">
                  <Link to="/user-dashboard/dokumen/laporan" className="block text-sm text-white hover:text-green">Laporan</Link>
                </li>
                <li className="mb-2">
                  <Link to="/user-dashboard/dokumen/arsip" className="block text-sm text-white hover:text-green">Arsip</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/payslip" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaMoneyBill className="mr-3" /> Payslip
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/info" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaUsers className="mr-3" /> Info
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user-dashboard/personal" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaUser className="mr-3" /> Personal Data
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;