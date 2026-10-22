import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MovieDetails } from '../pages/MovieDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />

      {/* Exemplo de estrutura para rotas restritas apenas a usuários logados */}
      <Route element={<ProtectedRoute />}>
        {/* Adicione telas 100% privadas aqui (ex: perfil do usuário, dashboard) */}
      </Route>
    </Routes>
  );
}