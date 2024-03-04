import { Listing, Note } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

const SingleNote = ({
  note,
  noteClicked,
  deleteNote,
}: {
  note: Note;
  noteClicked: (note: Note) => void;
  deleteNote: (note: Note) => void;
}) => {
  return (
    <div
      id="alert-additional-content-5"
      className="p-4 mb-2 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
      role="alert"
    >
      <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
        {note.note}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => noteClicked(note)}
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
        >
          Edit
        </button>
        <button
          onClick={() => deleteNote(note)}
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Notes = ({
  listing,
  closeModal,
}: {
  listing?: Listing;
  closeModal: () => void;
}) => {
  const {
    setData,
    data,
    post,
    delete: deleteMethod,
    processing,
  } = useForm({ note: '' });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedNote) {
      post(
        route('listing.note.update', {
          listing: listing?.id,
          note: selectedNote?.id,
        })
      );
    } else {
      post(route('listing.note.add', listing?.id));
    }
    closeModal();
  };

  const deleteNoteHandler = (note: Note) => {
    deleteMethod(route('listing.note.delete', note.id));
  };

  useEffect(() => {
    if (selectedNote) {
      setData('note', selectedNote.note);
    }
  }, [selectedNote]);

  const updateMode = selectedNote !== null;

  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your note
            </label>
            <textarea
              id="comment"
              cols={30}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a note..."
              value={data.note}
              onChange={e => setData('note', e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              onClick={onSubmit}
              type="button"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {!updateMode
                ? processing
                  ? 'Adding...'
                  : 'Add note'
                : processing
                  ? 'Updating...'
                  : 'Update note'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3">
        {listing?.notes.map(note => (
          <SingleNote
            key={note.id}
            note={note}
            noteClicked={note => setSelectedNote(note)}
            deleteNote={deleteNoteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
