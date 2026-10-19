import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Header } from '../components/Header';

export function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem('@CineComp:token');

  const currentYear = new Date().getFullYear();
  const yearsList = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const genresList = [
    'Ação', 'Aventura', 'Animação', 'Comédia', 'Crime', 'Documentário', 
    'Drama', 'Fantasia', 'Ficção Científica', 'Horror', 'Mistério', 'Romance', 'Suspense', 'Terror'
  ];

  function normalizeTitle(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  }

  function filterUniqueMovies(movieList) {
    if (!Array.isArray(movieList)) return [];
    const seen = new Set();
    return movieList.filter((movie) => {
      const normalized = normalizeTitle(movie.title);
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
  }

  async function loadMovies() {
    try {
      setLoading(true);
      const response = await api.get('/movies?limit=100');
      const data = response.data.data || response.data;
      const rawList = Array.isArray(data) ? data : [];
      setMovies(filterUniqueMovies(rawList));
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setError('Não foi possível carregar os filmes. Verifique se o backend está a rodar.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMovies(); }, []);

  async function handleAddMovie(e) {
    e.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle || !director.trim()) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    if (movies.some((m) => normalizeTitle(m.title) === normalizeTitle(cleanTitle))) {
      alert('Este filme já está cadastrado no catálogo!');
      return;
    }

    setAdding(true);

    try {
      await api.post('/movies', {
        title: cleanTitle,
        director: director.trim(),
        genre: genre.trim(),
        releaseYear: Number(releaseYear),
        rating: Number(rating.toString().replace(',', '.')),
        description: description.trim() || undefined,
      });

      alert('Filme cadastrado com sucesso!');
      setTitle(''); setDirector(''); setGenre(''); setReleaseYear(''); setRating(''); setDescription('');
      await loadMovies();
    } catch (err) {
      alert('Falha ao cadastrar o filme. Verifique os dados inseridos.');
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>A carregar catálogo...</div>;
  if (error) return <div style={{ padding: '40px', color: 'var(--danger)', textAlign: 'center' }}>{error}</div>;

  return (
    <div>
      <Header />

      {/* ÁREA DE CADASTRO */}
      {token ? (
        <section className="card-container">
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: '700' }}>+ Adicionar Filme ao Catálogo</h3>
          <form onSubmit={handleAddMovie} style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <input type="text" placeholder="Título do filme" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <input type="text" placeholder="Diretor" value={director} onChange={(e) => setDirector(e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <input type="text" list="genres-list" placeholder="Gênero" value={genre} onChange={(e) => setGenre(e.target.value)} required />
              <datalist id="genres-list">{genresList.map((g) => <option key={g} value={g} />)}</datalist>

              <input type="number" list="years-list" placeholder="Ano" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
              <datalist id="years-list">{yearsList.map((y) => <option key={y} value={y} />)}</datalist>

              <input type="number" step="0.1" min="0" max="10" placeholder="Nota (0-10)" value={rating} onChange={(e) => setRating(e.target.value)} required />
            </div>

            <input type="text" placeholder="Sinopse (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />

            <button type="submit" disabled={adding} className="btn btn-success" style={{ marginTop: '8px' }}>
              {adding ? 'A guardar...' : 'Cadastrar Filme'}
            </button>
          </form>
        </section>
      ) : (
        <div style={{ backgroundColor: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          💡 Faça <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>login</Link> para adicionar ou gerenciar filmes.
        </div>
      )}

      {/* CATÁLOGO EM CARDS */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Filmes Disponíveis</h2>

      {movies.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Nenhum filme cadastrado.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div>
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-info">{movie.releaseYear} • Direção: {movie.director || 'N/I'}</p>
              </div>

              <div>
                <div className="badge-group" style={{ marginBottom: '16px' }}>
                  <span className="badge badge-genre">{movie.genre}</span>
                  <span className="badge badge-rating">★ {movie.rating}</span>
                </div>

                <Link to={`/movie/${movie.id}`} className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '8px' }}>
                  Ver Detalhes →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}