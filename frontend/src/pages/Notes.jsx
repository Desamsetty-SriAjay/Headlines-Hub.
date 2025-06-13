import { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
const fetchNotes = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`);
    const data = await res.json();
    setNotes(data);
  } catch (err) {
    console.error('Failed to fetch notes:', err);
  }
};

useEffect(() => {
  fetchNotes();
}, []);

  const addNote = () => {
    setNotes([...notes, { content: '', _id: null }]);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index].content = value;
    setNotes(updatedNotes);
  };

const saveNoteToDB = async (noteText) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteText }),
    });

    const data = await res.json();
    console.log('Saved:', data);

    // Fetch updated notes
    fetchNotes(); 
  } catch (err) {
    console.error('Error saving note:', err);
  }
};

  const deleteNoteFromDB = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="p-6 space-y-4  to-zinc-900 to-75% min-h-screen">
      <h2 className="text-xl font-bold text-black">My Notes</h2>
      {notes.map((note, index) => (
        <div key={note._id || index} className="relative">
          <textarea
            value={note.content}
            onChange={(e) => handleNoteChange(index, e.target.value)}
            className="w-full min-h-[100px] p-2 bg-gray-100 border rounded shadow resize-y text-1xl text-zinc-900 font-medium"
            placeholder={`Note ${index + 1}`}
          />
          {note._id && (
            <button
              onClick={() => deleteNoteFromDB(note._id)}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addNote}
        className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-gray-700 cursor-pointer"
      >
        Add Note
      </button>

      <button
        className="ml-2 px-4 py-2 bg-zinc-600 text-white rounded hover:bg-gray-700 cursor-pointer"
        onClick={() => {
          notes.forEach((note) => {
            if (!note._id && note.content.trim() !== '') {
              saveNoteToDB(note.content);
            }
          });
        }}
      >
        Save Notes
      </button>
    </div>
  );
};

export default Notes;

