import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedToken = localStorage.getItem('@CineComp:token');
    const storagedUser = localStorage.getItem('@CineComp:user');

    if (storagedToken) {
      setToken(storagedToken);
      if (storagedUser) setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    // Rota correta do back-end: /auth/login
    const response = await api.post('/auth/login', { email, password });
    
    const newToken = response.data.token || response.data.data?.token;
    const userData = response.data.user || response.data.data?.user;

    if (newToken) {
      localStorage.setItem('@CineComp:token', newToken);
      setToken(newToken);
    }

    if (userData) {
      localStorage.setItem('@CineComp:user', JSON.stringify(userData));
      setUser(userData);
    }
  }

  function logout() {
    localStorage.removeItem('@CineComp:token');
    localStorage.removeItem('@CineComp:user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}