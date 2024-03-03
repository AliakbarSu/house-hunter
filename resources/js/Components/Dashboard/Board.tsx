import { Listing, User } from '@/types';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import Form from '@/Components/Dashboard/Form';
import { useForm } from '@inertiajs/react';
import CardItem from '@/Components/Dashboard/CardItem';
import AddItem from '@/Components/Dashboard/AddItem';

const columns = [
  { name: 'Wishlist', type: 'wishlist', color: 'bg-indigo-400' },
  { name: 'Viewing', type: 'viewing', color: 'bg-sky-600' },
  { name: 'Viewed', type: 'viewed', color: 'bg-purple-600' },
  { name: 'Applied', type: 'applied', color: 'bg-pink-600' },
  { name: 'Offer Rejected', type: 'offer_rejected', color: 'bg-orange-600' },
  { name: 'Offer Accepted', type: 'offer_accepted', color: 'bg-teal-600' },
];

export default function Board({
  listings,
  user,
}: {
  listings: Listing[];
  user: User;
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
    <div className="flex h-full w-full absolute">
      <Modal show={isModal} maxWidth={'xl'} onClose={() => modalHandler(false)}>
        <Form
          listing={selectedCard}
          user={user}
          closeModal={closeModalHandler}
        />
      </Modal>
      {columns.map((column, index) => (
        <div className="border-r min-w-72 max-w-72" key={column.type}>
          <AddItem title={column.name} onOpen={() => modalHandler(true)} />
          <ul className="space-y-4 py-4 px-2 w-full">
            {listings
              .filter(({ status }) => status === column.type)
              .map(listing => (
                <CardItem
                  className={column.color}
                  onMoveLeft={() => moveLeft(index, listing.id)}
                  onMoveRight={() => moveRight(index, listing.id)}
                  onClick={() => cardClickedHandler(listing)}
                  key={listing.id}
                  card={listing}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
