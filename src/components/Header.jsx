import { Link } from 'react-router-dom';

export function Header() {
  const token = localStorage.getItem('@CineComp:token');

  function handleLogout() {
    localStorage.removeItem('@CineComp:token');
    window.location.reload();
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
        gap: '12px'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.8rem' }}>🎬</span>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.2' }}>
            CineComp
          </h1>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Catálogo de Filmes</span>
        </div>
      </Link>

      <div>
        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: '600' }}>
              ✓ Sessão Ativa
            </span>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}