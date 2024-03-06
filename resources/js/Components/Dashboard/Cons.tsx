import { Listing } from '@/types';
import { useForm } from '@inertiajs/react';
import { ifElse } from '@/utils';
import { useState } from 'react';

const Con = ({
  text,
  deleteItem,
}: {
  text: string;
  deleteItem: (text: string) => void;
}) => {
  return (
    <div
      id="alert-additional-content-5"
      className="px-4 py-2  mb-2 border border-gray-300 rounded-lg bg-gray-50"
      role="alert"
    >
      <div className="mt-2 mb-4 text-sm text-gray-800">{text}</div>
      <div className="flex gap-1">
        <button
          onClick={() => deleteItem(text)}
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Cons = ({
  listing,
  closeModal,
}: {
  listing?: Listing;
  closeModal: () => void;
}) => {
  const { data, setData, processing, post } = useForm({
    cons: listing?.cons || [],
  });
  const [text, setText] = useState('');

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    post(route('listing.update', listing?.id));
    closeModal();
  };

  const deleteItemHandler = (text: string) => {
    setData(
      'cons',
      data.cons.filter(p => p !== text)
    );
  };

  const addItemHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setData('cons', [...data.cons, text]);
  };

  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="item" className="sr-only">
              Cons
            </label>
            <textarea
              id="item"
              cols={30}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0"
              placeholder="e.g No parking"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <button
              onClick={addItemHandler}
              type="button"
              className="inline-flex items-center py-1.5 px-8 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3">
        {data.cons.map(text => (
          <Con key={text} text={text} deleteItem={deleteItemHandler} />
        ))}
      </div>
      {listing?.cons.length !== data.cons.length && (
        <div className="flex items-center justify-between py-2 border-t">
          <button
            onClick={onSubmit}
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            {ifElse(processing, 'Saving...', 'Save changes')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cons;
