import { CoverLetter, PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DocumentIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function CoverLetters({
  auth,
  hasSubscription,
  listings,
}: PageProps) {
  const { processing, post, hasErrors, setData } = useForm({});
  const [selectedListingId, setSelectedAddress] = useState('');
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);

  const onAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
    setData(() => ({ listing_id: e.target.value }));
    if (e.target.value) {
      const listing = listings.find(listing => listing.id == e.target.value);
      setCoverLetters(listing?.cover_letter || []);
    }
  };

  const onDownload = (id: string) => {
    window.open(route('cover-letter.download', id));
  };

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedListingId) {
      post(route('cover-letter.generate', selectedListingId));
    }
  };

  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="mx-auto max-w-lg pt-8">
        <div>
          <div className="text-center">
            <div className="w-full flex justify-center">
              <DocumentIcon
                className="h-8 w-8 text-gray-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
              Cover letters
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              You can create up to 5 cover letters per address.
            </p>
          </div>
          <form onSubmit={onCreate} className="mt-6 flex">
            <label htmlFor="listing_id" className="sr-only">
              Address
            </label>
            <select
              onChange={onAddressSelect}
              name="listing_id"
              id="listing_id"
              value={selectedListingId}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select an address</option>
              {listings.map(listing => (
                <option key={listing.id} value={listing.id}>
                  {listing.address}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={processing}
              className={
                'ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' +
                (processing ? 'cursor-not-allowed disabled' : '')
              }
            >
              {processing ? 'Generating...' : 'Create'}
            </button>
          </form>
          {hasErrors && (
            <InputError
              className="mt-2"
              message="Failed to generate a cover letter"
            />
          )}
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">
            Cover letters previously created for selected address
          </h3>
          <ul
            role="list"
            className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {coverLetters.map(letter => (
              <li
                key={letter.id}
                className="flex items-center justify-between space-x-3 py-4"
              >
                <div className="flex min-w-0 flex-1 items-center space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {letter.filename}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-500">
                      <time dateTime={letter.created_at} />
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    disabled={processing}
                    onClick={() => onDownload(letter.id)}
                    className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                  >
                    <DocumentIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Download <span className="sr-only">{letter.id}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
