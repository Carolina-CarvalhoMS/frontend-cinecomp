import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { signed, loading } = useAuth();

  if (loading) return <div>A carregar...</div>;

  return signed ? <Outlet /> : <Navigate to="/login" replace />;
}