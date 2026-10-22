import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, LogIn, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { signed, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        marginBottom: '24px',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Film size={32} color="var(--primary)" />
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.2' }}>
            CineComp
          </h1>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Catálogo de Filmes</span>
        </div>
      </Link>

      <div>
        {signed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={16} /> Sessão Ativa
            </span>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogIn size={16} /> Entrar
          </Link>
        )}
      </div>
    </header>
  );
}