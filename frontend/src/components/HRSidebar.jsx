import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsersCog,
  FaUserPlus,
  FaClock,
  FaMoneyBillWave,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import empLogo from "../assets/logo-emp.png";

const HRSidebar = () => {
  const [openManajemen, setOpenManajemen] = useState(false);
  const [openLaporan, setOpenLaporan] = useState(false);

  return (
    <div className="w-64 bg-[#3aba42] text-white min-h-screen">
      <div className="bg-white p-4 text-center">
        <img src={empLogo} alt="EMP Logo" className="w-19 mx-auto" />
      </div>
      <div className="p-4">
        <ul className="list-none p-0 m-0">
          <li className="mb-4">
            <Link to="/hr-dashboard" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <div
              onClick={() => setOpenManajemen(!openManajemen)}
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600 cursor-pointer"
            >
              <div className="flex items-center flex-1">
                <FaUsersCog className="mr-3" /> Manajemen
              </div>
              <span className="ml-auto">{openManajemen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {openManajemen && (
              <ul className="list-none pl-8 mt-2">
                <li className="mb-2">
                  <Link to="/hr-dashboard/manajemen-karyawan" className="block text-sm text-gray-200 hover:text-white">Karyawan</Link>
                </li>
                <li className="mb-2">
                  <Link to="/hr-dashboard/manajemen-posisi" className="block text-sm text-gray-200 hover:text-white">Posisi</Link>
                </li>
                <li className="mb-2">
                  <Link to="/hr-dashboard/manajemen-departemen" className="block text-sm text-gray-200 hover:text-white">Departemen</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <Link to="/hr-dashboard/rekrutmen" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaUserPlus className="mr-3" /> Rekrutmen
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/hr-dashboard/absensi" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaClock className="mr-3" /> Absensi
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/hr-dashboard/penggajian" className="flex items-center text-white text-base p-2 rounded hover:bg-green-600">
              <FaMoneyBillWave className="mr-3" /> Penggajian
            </Link>
          </li>
          <li className="mb-4">
            <div
              onClick={() => setOpenLaporan(!openLaporan)}
              className="flex items-center text-white text-base p-2 rounded hover:bg-green-600 cursor-pointer"
            >
              <div className="flex items-center flex-1">
                <FaChartBar className="mr-3" /> Laporan
              </div>
              <span className="ml-auto">{openLaporan ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {openLaporan && (
              <ul className="list-none pl-8 mt-2">
                <li className="mb-2">
                  <Link to="/hr-dashboard/laporan/absensi" className="block text-sm text-gray-200 hover:text-white">Laporan Absensi</Link>
                </li>
                <li className="mb-2">
                  <Link to="/hr-dashboard/laporan/karyawan" className="block text-sm text-gray-200 hover:text-white">Laporan Karyawan</Link>
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