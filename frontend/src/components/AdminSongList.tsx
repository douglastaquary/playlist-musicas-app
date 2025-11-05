import { useState } from 'react';
import { Song } from '../pages/PlaylistView';

interface AdminSongListProps {
  songs: Song[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, artist?: string) => void;
  onMove: (fromPosition: number, toPosition: number) => void;
}

export const AdminSongList: React.FC<AdminSongListProps> = ({
  songs,
  onDelete,
  onUpdate,
  onMove,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editArtist, setEditArtist] = useState('');

  const startEdit = (song: Song) => {
    setEditingId(song.id);
    setEditName(song.name);
    setEditArtist(song.artist || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditArtist('');
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) {
      onUpdate(id, editName.trim(), editArtist.trim() || undefined);
      cancelEdit();
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      onMove(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < songs.length - 1) {
      onMove(index, index + 1);
    }
  };

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl md:text-2xl text-gray-600">
          Nenhuma música na playlist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="bg-gray-50 hover:bg-gray-100 border-l-4 border-purple-500 p-4 rounded-lg transition-colors"
        >
          {editingId === song.id ? (
            <div className="space-y-3">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Nome da Música
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Artista
                </label>
                <input
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  className="w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(song.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="text-2xl md:text-3xl font-bold text-purple-600 min-w-[40px]">
                    #{index + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {song.name}
                  </h3>
                </div>
                {song.artist && (
                  <p className="text-lg md:text-xl text-gray-600 ml-[52px]">
                    🎤 {song.artist}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-lg text-lg transition-colors"
                    title="Mover para cima"
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === songs.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-lg text-lg transition-colors"
                    title="Mover para baixo"
                  >
                    ⬇️
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(song)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded-lg text-lg transition-colors"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(song.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-lg transition-colors"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

