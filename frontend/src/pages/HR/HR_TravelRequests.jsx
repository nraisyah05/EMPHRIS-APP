import React, { useState } from 'react';
import styled from 'styled-components';

// Gaya untuk tampilan HR
const Section = styled.section`
  margin-top: 20px;
`;
const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2196F3;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const EmployeeRole = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.9rem;
`;

const RequestDetails = styled.div`
  width: 100%;
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const DetailText = styled.p`
  margin: 5px 0;
  strong {
    color: #444;
  }
`;

const CardActions = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const ApproveButton = styled(Button)`
  background-color: #4CAF50;
  color: #fff;
  flex-grow: 1;
  &:hover {
    background-color: #45a049;
  }
`;
const RejectButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
  flex-grow: 1;
  &:hover {
    background-color: #d32f2f;
  }
`;

// Komponen utama
const HR_TravelRequests = () => {
  const [travelRequests, setTravelRequests] = useState([
    {
      id: 'tr-1',
      full_name: 'John Doe',
      worker_no: 'EMP001',
      profile_pic: 'https://images.unsplash.com/photo-1507003211169-0a2dd7c8fe22?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      spd_no: 'SPD-2025-001',
      date_created: '2025-08-20',
      travel_type: 'Kunjungan Dinas',
      destination_city: 'Surabaya',
      agenda: 'Meeting dengan tim marketing di cabang.',
      start_date: '2025-08-27',
      end_date: '2025-08-29',
      attachment: 'undangan_surabaya.pdf',
      status: 'pending'
    },
    {
      id: 'tr-2',
      full_name: 'Jane Smith',
      worker_no: 'EMP002',
      profile_pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      spd_no: 'SPD-2025-002',
      date_created: '2025-08-21',
      travel_type: 'Training',
      destination_city: 'Jakarta',
      agenda: 'Mengikuti pelatihan React Development.',
      start_date: '2025-09-05',
      end_date: '2025-09-06',
      attachment: 'undangan_training.pdf',
      status: 'pending'
    },
  ]);

  const handleApproval = (requestId, status) => {
    console.log(`Permintaan ID: ${requestId}, Status: ${status}`);
    alert(`Permintaan perjalanan dinas berhasil di${status}!`);
    
    // Logika untuk mengirim data ke timesheet setelah disetujui
    if (status === 'approved') {
      const approvedRequest = travelRequests.find(req => req.id === requestId);
      if (approvedRequest) {
        // Di sini Anda akan memanggil fungsi atau API untuk memperbarui timesheet
        console.log(`Memperbarui timesheet untuk ${approvedRequest.full_name} dari ${approvedRequest.start_date} sampai ${approvedRequest.end_date}.`);
        console.log(`Keterangan timesheet akan diisi: ${approvedRequest.agenda}`);
        // Timesheet akan diblokir dan diwarnai abu-abu
      }
    }
    
    setTravelRequests(travelRequests.filter(req => req.id !== requestId));
  };

  return (
    <Section>
      <CardList>
        {travelRequests.map((request) => (
          <Card key={request.id}>
            <ProfileHeader>
              <ProfilePicture src={request.profile_pic} alt={request.full_name} />
              <EmployeeInfo>
                <EmployeeName>{request.full_name}</EmployeeName>
                <EmployeeRole>No Pekerja: {request.worker_no}</EmployeeRole>
              </EmployeeInfo>
            </ProfileHeader>
            <RequestDetails>
              <DetailText><strong>No. SPD:</strong> {request.spd_no}</DetailText>
              <DetailText><strong>Tanggal Dibuat:</strong> {request.date_created}</DetailText>
              <DetailText><strong>Jenis Perjalanan:</strong> {request.travel_type}</DetailText>
              <DetailText><strong>Kota Tujuan:</strong> {request.destination_city}</DetailText>
              <DetailText><strong>Agenda:</strong> {request.agenda}</DetailText>
              <DetailText><strong>Tanggal:</strong> {request.start_date} s/d {request.end_date}</DetailText>
              <DetailText><strong>Lampiran:</strong> <a href="#" onClick={() => alert(`Unduh: ${request.attachment}`)}>{request.attachment}</a></DetailText>
            </RequestDetails>
            <CardActions>
              <ApproveButton onClick={() => handleApproval(request.id, 'approved')}>
                Approve
              </ApproveButton>
              <RejectButton onClick={() => handleApproval(request.id, 'rejected')}>
                Reject
              </RejectButton>
            </CardActions>
          </Card>
        ))}
      </CardList>
    </Section>
  );
};

export default HR_TravelRequests;