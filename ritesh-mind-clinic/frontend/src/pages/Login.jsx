import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();

  const submit = async () => {
    const res = await api.post('/auth/login', {
      email: 'admin@test.com',
      password: 'admin123'
    });
    login(res.data.token);
  };

  return <button onClick={submit}>Login as Admin</button>;
}
