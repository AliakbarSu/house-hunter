import Modal from '@/Components/Modal';

const ListingLimitAlert = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal maxWidth={'xl'} show={show} onClose={onClose}>
      <div className="relative p-4 w-full max-h-full">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="progress-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5">
          <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Listing Limit Reached
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You have reached the limit of 15 listings. Upgrade to premium to add
            more listings.
          </p>
          <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
            <span className="text-base font-normal">Listings</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              15 of 15 listings
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
            <div
              className="bg-orange-500 h-2.5 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
          <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
            <a
              href={route('home')}
              data-modal-hide="progress-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Upgrade to Premium
            </a>
            <button
              data-modal-hide="progress-modal"
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ListingLimitAlert;
