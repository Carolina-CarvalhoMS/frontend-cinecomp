import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MovieDetails } from '../pages/MovieDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}