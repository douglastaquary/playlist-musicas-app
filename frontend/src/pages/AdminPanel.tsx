import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { songService } from '../services/songService';
import { Song } from './PlaylistView';
import { AdminSongList } from '../components/AdminSongList';
import { SongForm } from '../components/SongForm';

export const AdminPanel = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    loadSongs();
  }, [isAdmin, navigate]);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await songService.getAll();
      setSongs(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar músicas.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (name: string, artist?: string) => {
    try {
      await songService.create(name, artist);
      setSuccess('Música adicionada com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
      await loadSongs();
    } catch (err) {
      setError('Erro ao adicionar música.');
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta música?')) {
      return;
    }

    try {
      await songService.delete(id);
      setSuccess('Música excluída com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
      await loadSongs();
    } catch (err) {
      setError('Erro ao excluir música.');
    }
  };

  const handleUpdateSong = async (id: string, name: string, artist?: string) => {
    try {
      await songService.update(id, { name, artist });
      setSuccess('Música atualizada com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
      await loadSongs();
    } catch (err) {
      setError('Erro ao atualizar música.');
    }
  };

  const handleMoveSong = async (fromPosition: number, toPosition: number) => {
    try {
      await songService.move(fromPosition, toPosition);
      await loadSongs();
    } catch (err) {
      setError('Erro ao mover música.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              ⚙️ Painel Administrativo
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Gerencie sua playlist
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
              Ver Playlist
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-semibold text-lg">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p className="font-semibold text-lg">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Adicionar Nova Música
          </h2>
          <SongForm onSubmit={handleAddSong} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Gerenciar Músicas ({songs.length})
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Carregando...</p>
            </div>
          ) : (
            <AdminSongList
              songs={songs}
              onDelete={handleDeleteSong}
              onUpdate={handleUpdateSong}
              onMove={handleMoveSong}
            />
          )}
        </div>
      </div>
    </div>
  );
};

