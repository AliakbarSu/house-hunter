import { BoardColumn, Listing, User } from '@/types';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import Form from '@/Components/Dashboard/Form';
import { useForm } from '@inertiajs/react';
import Column from '@/Components/Dashboard/Column';

export default function Board({
  listings,
  user,
  columns,
}: {
  listings: Listing[];
  user: User;
  columns: BoardColumn[];
  hasSubscription?: boolean;
}) {
  const [isModal, setIsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Listing | undefined>(
    undefined
  );

  const modalHandler = (state: boolean): void => {
    setIsModal(state);
  };
  const { post, data, setData } = useForm({ status: '', listingId: '' });
  const moveLeft = (index: number, listingId: string) => {
    if (index > 0) {
      const column = columns[index - 1];
      setData(() => ({ status: column.type, listingId: listingId }));
    }
    return null;
  };

  const moveRight = (index: number, listingId: string) => {
    if (index < columns.length - 1) {
      const column = columns[index + 1];
      setData(() => ({ status: column.type, listingId: listingId }));
    }
    return null;
  };

  const move = (index: number, listingId: string) => {
    const column = columns[index];
    setData(() => ({ status: column.type, listingId: listingId }));
  };

  const cardClickedHandler = (listing: Listing) => {
    setSelectedCard(listing);
    modalHandler(true);
  };

  const closeModalHandler = () => {
    modalHandler(false);
    setSelectedCard(undefined);
  };

  useEffect(() => {
    if (data.status && data.listingId) {
      post(route('listing.update', data.listingId));
    }
  }, [data.status, data.listingId]);

  return (
    <div className="flex h-fit w-full absolute">
      <Modal show={isModal} maxWidth={'xl'} onClose={() => modalHandler(false)}>
        <Form
          listing={selectedCard}
          user={user}
          closeModal={closeModalHandler}
        />
      </Modal>
      {columns.map((column, index) => (
        <Column
          key={column.type}
          column={column}
          index={index}
          moveLeft={moveLeft}
          moveRight={moveRight}
          move={move}
          cardClickedHandler={cardClickedHandler}
          modalHandler={modalHandler}
          listings={listings}
        />
      ))}
    </div>
  );
}
