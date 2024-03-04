import AddItem from '@/Components/Dashboard/AddItem';
import CardItem from '@/Components/Dashboard/CardItem';
import { Listing } from '@/types';
import { useDrop } from 'react-dnd';

const Column = ({
  column,
  listings,
  index,
  moveLeft,
  moveRight,
  move,
  modalHandler,
  cardClickedHandler,
}: {
  listings: Listing[];
  moveLeft: (index: number, listingId: string) => null;
  moveRight: (index: number, listingId: string) => null;
  move: (index: number, listingId: string) => void;
  modalHandler: (state: boolean) => void;
  cardClickedHandler: (listing: Listing) => void;
  index: number;
  column: {
    name: string;
    type: string;
    color: string;
  };
}) => {
  const [collectedProps, drop] = useDrop(() => ({
    options: {
      dropEffect: 'move',
    },
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
    accept: 'CARD',
    drop: item => {
      const card_id = (item as { id: string }).id || null;
      if (card_id) {
        move(index, card_id);
      }
    },
  }));
  return (
    <div ref={drop} className="border-r min-w-72 max-w-72" key={column.type}>
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
  );
};

export default Column;
