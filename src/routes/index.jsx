import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MovieDetails } from '../pages/MovieDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { CreateMovie } from '../pages/CreateMovie';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas: Qualquer pessoa pode ver o catálogo e as sinopses */}
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota Protegida Exclusiva: Exige login para acessar a página de cadastro */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cadastrar-filme" element={<CreateMovie />} />
      </Route>
    </Routes>
  );
}