import React, { useState, useEffect } from 'react';

// Helper to calculate hours
const calculateHours = (from, to) => {
  if (!from || !to) return '';
  const [fh, fm] = from.split(':').map(Number);
  const [th, tm] = to.split(':').map(Number);
  let minutes = (th * 60 + tm) - (fh * 60 + fm);
  if (minutes < 0) minutes += 24 * 60;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
};

// Mock public holidays
const publicHolidays = {
  0: [{ day: 1, name: 'Tahun Baru Masehi' }],
  1: [{ day: 2, name: 'Tahun Baru Imlek' }],
  2: [{ day: 29, name: 'Hari Raya Nyepi' }, { day: 31, name: 'Wafat Isa Al Masih' }],
  3: [{ day: 1, name: 'Paskah' }, { day: 10, name: 'Idul Fitri' }, { day: 11, name: 'Cuti Bersama Idul Fitri' }],
  4: [{ day: 1, name: 'Hari Buruh' }, { day: 12, name: 'Kenaikan Isa Al Masih' }, { day: 22, name: 'Waisak' }],
  5: [{ day: 1, name: 'Hari Lahir Pancasila' }, { day: 17, name: 'Idul Adha' }],
  6: [{ day: 7, name: 'Tahun Baru Islam' }],
  7: [{ day: 17, name: 'Kemerdekaan RI' }],
  8: [{ day: 16, name: 'Maulid Nabi' }],
  11: [{ day: 25, name: 'Natal' }],
};

// Mock user - adjusted to match the new layout and labels
const mockUser = {
  personnelNumber: '88027132',
  name: 'Martoni',
  email: 'martoni@pertamina.com',
  position: 'Operator Field Operations Petko',
  divisionDepartment: 'Zona Rokan / Production SL South',
  companyCostCenter: '(2202) PT PHR / (2202E12DA1)',
  paPsa: 'Upstream Reg 1 WK Rokan Remote / Petapahan',
  groupSubGroup: 'PWTT AP / Jr. Staff',
  workSchedule: 'ROTAT-5',
};

// Icons (using inline SVG)
const icons = {
  Home: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  Calendar: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M16 2v4M8 2v4"/></svg>,
  Bell: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.36 21a1.2 1.2 0 0 0 3.28 0"/></svg>,
  Mail: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></svg>,
  User: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Plus: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Save: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Check: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Refresh: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6M21 12A9 9 0 0 0 6 5.3L3 8M21 22v-6h-6M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>,
};

// Main Timesheet
const Timesheet = () => {
  const [entries, setEntries] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [headerFromTime, setHeaderFromTime] = useState('');
  const [headerToTime, setHeaderToTime] = useState('');

  // Generate empty entries
  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const holidays = publicHolidays[month] || [];
    const newEntries = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const holiday = holidays.find(h => h.day === i);
      newEntries.push({
        workingCategory: '',
        hoursFrom: '',
        hoursTo: '',
        hoursWorked: '',
        overtimeFrom: '',
        overtimeTo: '',
        overtimeHours: '',
        remarks: holiday ? holiday.name : '',
        justification: ''
      });
    }
    setEntries(newEntries);
  }, [month, year]);

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    const newEntries = [...entries];
    newEntries[idx][name] = value;

    if (name === 'hoursFrom' || name === 'hoursTo') {
      newEntries[idx].hoursWorked = calculateHours(newEntries[idx].hoursFrom, newEntries[idx].hoursTo);
    }
    if (name === 'overtimeFrom' || name === 'overtimeTo') {
      newEntries[idx].overtimeHours = calculateHours(newEntries[idx].overtimeFrom, newEntries[idx].overtimeTo);
    }
    setEntries(newEntries);
  };

  const renderMonthOptions = () => {
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const opts = [];
    for (let y = year-2; y <= year+1; y++) {
      months.forEach((m,i)=>{
        opts.push(<option key={`${y}-${i}`} value={`${y}-${i}`}>{m} {y}</option>);
      });
    }
    return opts;
  };

  return (
    <>
      {/* Load Tailwind CSS and Inter font */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />

      {/* Main container with a dark sidebar */}
      <div className="flex min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
        {/* Sidebar */}
        <div className="w-16 md:w-20 bg-gray-900 flex flex-col items-center py-6 shadow-xl z-20">
          {/* Logo placeholder */}
          <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
          <div className="flex-1 space-y-6 md:space-y-8 pt-8">
            {[icons.Home, icons.Calendar, icons.Bell, icons.Mail].map((Icon, idx) => (
              <div key={idx} className="flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out">
                <Icon className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header based on the provided image */}
          <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow-md z-10 border-b-4 border-gray-100">
            {/* Left side: Timesheet title */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-400">Timesheet</h1>
            {/* Right side: User profile */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><icons.Mail className="w-5 h-5 text-gray-600"/></button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><icons.Bell className="w-5 h-5 text-gray-600"/></button>
              <div className="flex items-center space-x-2 bg-gray-100 p-1 pl-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-sm font-medium">{mockUser.name}</span>
                <icons.User className="w-8 h-8 p-1 text-white bg-gray-500 rounded-full"/>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100">
            {/* Employee Info based on the image */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700">Employee Identity</h2>
                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                {/* Profile Picture Placeholder */}
                <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <icons.User className="w-20 h-20 text-gray-400"/>
                </div>

                {/* Employee Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 flex-grow">
                  {/* Personnel Number & Name */}
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Personnel Number</span>
                    <span className="font-semibold">{mockUser.personnelNumber}</span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Name</span>
                    <span className="font-semibold">{mockUser.name} <span className="text-gray-500 font-normal">({mockUser.email})</span></span>
                  </div>

                  {/* Position & Division */}
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Position</span>
                    <span className="font-semibold">{mockUser.position}</span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Division/Department</span>
                    <span className="font-semibold">{mockUser.divisionDepartment}</span>
                  </div>

                  {/* Company & PA/PSA */}
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Company/Cost Center</span>
                    <span className="font-semibold">{mockUser.companyCostCenter}</span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">PA/PSA</span>
                    <span className="font-semibold">{mockUser.paPsa}</span>
                  </div>

                  {/* Group & Work Schedule */}
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Group/Sub Group</span>
                    <span className="font-semibold">{mockUser.groupSubGroup}</span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Work Schedule</span>
                    <span className="font-semibold">{mockUser.workSchedule}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timesheet Section - adjusted to match the old layout */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Timesheet</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">From:</span>
                    <input
                      type="time"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center"
                      value={headerFromTime}
                      onChange={(e) => setHeaderFromTime(e.target.value)}
                    />
                    <span className="text-gray-500">To:</span>
                    <input
                      type="time"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center"
                      value={headerToTime}
                      onChange={(e) => setHeaderToTime(e.target.value)}
                    />
                  </div>
                  <button className="px-3 py-1 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm">EXY</button>
                  <select
                    className="border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors"
                    onChange={e=>{const [y,m]=e.target.value.split('-').map(Number); setYear(y); setMonth(m);}}
                    value={`${year}-${month}`}
                  >
                    {renderMonthOptions()}
                  </select>
                  <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md">
                    CREATE
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm bg-white table-auto">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-center border-b">
                    <tr>
                      <th rowSpan="2" className="p-3 border-r border-gray-200">Date</th>
                      <th rowSpan="2" className="p-3 border-r border-gray-200">Working Category</th>
                      <th colSpan="2" className="p-3 border-r border-gray-200">Hours Worked</th>
                      <th colSpan="3" className="p-3 border-r border-gray-200">Overtime</th>
                      <th rowSpan="2" className="p-3 border-r border-gray-200">Remarks</th>
                      <th rowSpan="2" className="p-3">Justification</th>
                    </tr>
                    <tr className="text-gray-500 font-normal text-xs">
                      <th className="p-2 border-r border-gray-200">From</th>
                      <th className="p-2 border-r border-gray-200">To</th>
                      <th className="p-2 border-r border-gray-200">From</th>
                      <th className="p-2 border-r border-gray-200">To</th>
                      <th className="p-2 border-r border-gray-200">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i)=>(
                      <tr key={i} className={`text-center text-gray-700 border-b last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                        <td className="p-3 font-semibold">{i+1}</td>
                        <td className="p-2">
                          <select name="workingCategory" value={entry.workingCategory} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md">
                            <option value="">-</option>
                            <option>On</option>
                            <option>Off</option>
                            <option>Sakit</option>
                            <option>Dinas</option>
                            <option>Cuti</option>
                          </select>
                        </td>
                        <td className="p-2"><input type="time" name="hoursFrom" value={entry.hoursFrom} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                        <td className="p-2"><input type="time" name="hoursTo" value={entry.hoursTo} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                        <td className="p-2"><input type="time" name="overtimeFrom" value={entry.overtimeFrom} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                        <td className="p-2"><input type="time" name="overtimeTo" value={entry.overtimeTo} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                        <td className="p-2"><input type="text" name="overtimeHours" value={entry.overtimeHours} readOnly className="w-20 bg-transparent text-center focus:outline-none font-mono text-gray-500"/></td>
                        <td className="p-2"><input type="text" name="remarks" value={entry.remarks} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                        <td className="p-2"><input type="text" name="justification" value={entry.justification} onChange={e=>handleChange(e,i)} className="w-full bg-transparent p-1 focus:outline-none rounded-md"/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action buttons with icons */}
              <div className="flex justify-end mt-6 space-x-3">
                <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors shadow-md">
                  <icons.Save className="mr-2 w-5 h-5"/>Save Draft
                </button>
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md">
                  <icons.Check className="mr-2 w-5 h-5"/>Submit
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Timesheet;
