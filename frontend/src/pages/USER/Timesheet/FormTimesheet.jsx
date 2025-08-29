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
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
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

// Mock user (dipangkas sesuai kebutuhan)
const mockUser = {
  personnelNumber: '88027132',
  name: 'Martoni',
  email: 'martoni@pertamina.com',
  workSchedule: 'ROTAT-5',
  profilePic: 'https://ui-avatars.com/api/?name=Martoni&background=0D8ABC&color=fff' // placeholder avatar
};

// Main Timesheet
const FormTimesheet = () => {
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
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const opts = [];
    for (let y = year - 2; y <= year + 1; y++) {
      months.forEach((m, i) => {
        opts.push(<option key={`${y}-${i}`} value={`${y}-${i}`}>{m} {y}</option>);
      });
    }
    return opts;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 antialiased">
      <main className="p-6 space-y-6">
        {/* Employee Info */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 flex items-center justify-between">
          {/* Kiri: Foto + Identitas */}
          <div className="flex items-center gap-4">
            <img
              src={mockUser.profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border"
            />
            <div className="text-sm space-y-1">
              <p><span className="font-semibold">No Pekerja</span> : {mockUser.personnelNumber}</p>
              <p><span className="font-semibold">Name</span> : {mockUser.name}</p>
              <p><span className="font-semibold">Email</span> : {mockUser.email}</p>
              <p><span className="font-semibold">Company</span> : Pertamina Hulu Rokan</p>
              <p><span className="font-semibold">Working Schedule</span> : {mockUser.workSchedule}</p>
            </div>
          </div>

          {/* Kanan: Status Timesheet */}
          <div className="text-right">
            <p className="font-semibold text-gray-600 text-sm">Status Timesheet</p>
            <p className="px-3 py-1 mt-1 rounded-lg inline-block bg-yellow-100 text-yellow-700 text-xs font-medium">
              Pending
            </p>
          </div>
        </div>

        {/* Timesheet */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Timesheet</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">From:</span>
                <input type="time" className="w-20 px-2 py-1 border rounded-md text-center" value={headerFromTime} onChange={(e) => setHeaderFromTime(e.target.value)} />
                <span className="text-gray-500">To:</span>
                <input type="time" className="w-20 px-2 py-1 border rounded-md text-center" value={headerToTime} onChange={(e) => setHeaderToTime(e.target.value)} />
              </div>
              <button className="px-3 py-1 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">EXY</button>
              <select
                className="border px-3 py-2 rounded-lg text-sm bg-white"
                onChange={e => { const [y, m] = e.target.value.split('-').map(Number); setYear(y); setMonth(m); }}
                value={`${year}-${month}`}
              >
                {renderMonthOptions()}
              </select>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">CREATE</button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-center">
                <tr>
                  <th rowSpan="2" className="p-3 border">Date</th>
                  <th rowSpan="2" className="p-3 border">Working Category</th>
                  <th colSpan="2" className="p-3 border">Hours Worked</th>
                  <th colSpan="3" className="p-3 border">Overtime</th>
                  <th rowSpan="2" className="p-3 border">Remarks</th>
                  <th rowSpan="2" className="p-3 border">Justification</th>
                </tr>
                <tr className="text-xs text-gray-500">
                  <th className="p-2 border">From</th>
                  <th className="p-2 border">To</th>
                  <th className="p-2 border">From</th>
                  <th className="p-2 border">To</th>
                  <th className="p-2 border">Hours</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 border text-center font-semibold">{i + 1}</td>
                    <td className="p-2 border">
                      <select name="workingCategory" value={entry.workingCategory} onChange={e => handleChange(e, i)} className="w-full bg-transparent">
                        <option value="">-</option>
                        <option>On</option>
                        <option>Off</option>
                        <option>Sakit</option>
                        <option>Dinas</option>
                        <option>Cuti</option>
                      </select>
                    </td>
                    <td className="p-2 border"><input type="time" name="hoursFrom" value={entry.hoursFrom} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                    <td className="p-2 border"><input type="time" name="hoursTo" value={entry.hoursTo} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                    <td className="p-2 border"><input type="time" name="overtimeFrom" value={entry.overtimeFrom} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                    <td className="p-2 border"><input type="time" name="overtimeTo" value={entry.overtimeTo} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                    <td className="p-2 border text-center text-gray-500">{entry.overtimeHours}</td>
                    <td className="p-2 border"><input type="text" name="remarks" value={entry.remarks} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                    <td className="p-2 border"><input type="text" name="justification" value={entry.justification} onChange={e => handleChange(e, i)} className="w-full bg-transparent" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Save Draft</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormTimesheet;
