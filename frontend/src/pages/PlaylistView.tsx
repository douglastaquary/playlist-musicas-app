import { useState, useEffect } from 'react';
import { songService } from '../services/songService';
import { SongForm } from '../components/SongForm';
import { SongList } from '../components/SongList';
import { Link } from 'react-router-dom';

export interface Song {
  id: string;
  name: string;
  artist?: string;
  position: number;
}

export const PlaylistView = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await songService.getAll();
      setSongs(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar músicas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const handleAddSong = async (name: string, artist?: string) => {
    try {
      await songService.create(name, artist);
      setSuccess('Música adicionada com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
      await loadSongs();
    } catch (err) {
      setError('Erro ao adicionar música. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎵 Playlist de Músicas
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Adicione suas músicas favoritas
          </p>
          <Link
            to="/admin/login"
            className="inline-block mt-4 text-base md:text-lg text-blue-600 hover:text-blue-800 underline"
          >
            Acesso Administrativo
          </Link>
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
            Lista de Músicas ({songs.length})
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Carregando...</p>
            </div>
          ) : (
            <SongList songs={songs} />
          )}
        </div>
      </div>
    </div>
  );
};

