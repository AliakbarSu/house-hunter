import { CoverLetter, PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DocumentIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Head, router, useForm, useRemember } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function CoverLetters({
  auth,
  hasSubscription,
  listings,
  error,
  errors,
  board,
  listing_id = '',
}: PageProps<{ listing_id?: string }>) {
  const { processing, hasErrors, data, setData } = useForm<{
    context: string;
  }>({ context: '' });
  const [selectedListingId, setSelectedListingId] = useRemember(
    '',
    'CoverLetter/Id'
  );
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);

  const onAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedListingId(e.target.value);
  };

  useEffect(() => {
    if (selectedListingId) {
      const listing = listings.find(listing => listing.id == selectedListingId);
      setCoverLetters(listing?.cover_letter || []);
    }
  }, [selectedListingId, listings]);

  useEffect(() => {
    if (listing_id) {
      setSelectedListingId(listing_id);
    }
  }, [listing_id]);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedListingId) {
      router.post(route('cover-letter.generate', selectedListingId), {
        listing_id: selectedListingId,
        context: data.context,
      });
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      board={board}
      hasSubscription={hasSubscription}
    >
      <div className="mx-auto max-w-lg p-8">
        <Head title="Cover Letter" />
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
              You can create up to 3 cover letters per address.
            </p>
          </div>
          <form onSubmit={onCreate} className="mt-6 flex flex-wrap gap-3">
            <div className="w-full">
              <label
                htmlFor="listing_id"
                className="block mb-2 text-md font-medium text-gray-900"
              >
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
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="context"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Context
              </label>
              <textarea
                onChange={e => setData('context', e.target.value)}
                cols={30}
                name="context"
                id="context"
                value={data.context}
                placeholder="Why are you interested in this address?"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <InputError message={errors.context} className="mt-2" />
              <button
                type="submit"
                disabled={processing}
                className={
                  'mt-3 flex-shrink-0 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' +
                  (processing ? 'cursor-not-allowed disabled' : '')
                }
              >
                {processing ? 'Generating...' : 'Create'}
              </button>
            </div>
          </form>
          {hasErrors && (
            <InputError
              className="mt-2"
              message="Something went wrong while generating a cover letter"
            />
          )}
          {error && !hasErrors && (
            <InputError className="mt-2" message={error} />
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
                  <a
                    type="button"
                    href={route('cover-letter.download', letter.id)}
                    className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                  >
                    <DocumentIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Download <span className="sr-only">{letter.id}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
