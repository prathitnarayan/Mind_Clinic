import api from '../services/api';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments').then(res => setAppointments(res.data));
  }, []);

  return (
    <ul>
      {appointments.map(a => (
        <li key={a._id}>{a.name} – {a.service}</li>
      ))}
    </ul>
  );
}
