import { ApplicationForm, PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DocumentIcon, FolderIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Head, useForm, useRemember } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const formTypes = [
  {
    id: 1,
    name: 'Barfoot&Thompson',
  },
  {
    id: 2,
    name: 'Ray White',
  },
];

export default function ApplicationForms({
  auth,
  hasSubscription,
  listings,
  listing_id,
  errors,
  board,
}: PageProps<{ listing_id: string }>) {
  const { processing, get, hasErrors, setData } = useForm({});
  const [selectedListingId, setSelectedListingId] = useRemember(
    '',
    'ApplicationForm/listing_id'
  );
  const [selectedFormType, setSelectedFormType] = useState(1);
  const [applicationForms, setApplicationForms] = useState<ApplicationForm[]>(
    []
  );

  const onAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedListingId(e.target.value);
    setData(() => ({ listing_id: e.target.value }));
  };

  useEffect(() => {
    if (selectedListingId) {
      const listing = listings.find(listing => listing.id == selectedListingId);
      setApplicationForms(listing?.application_forms || []);
    }
  }, [selectedListingId]);

  useEffect(() => {
    if (listing_id) {
      setSelectedListingId(listing_id);
    }
  }, [listing_id]);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedListingId) {
      get(
        route('forms.generate', {
          listing: selectedListingId,
          id: selectedFormType,
        })
      );
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
              <FolderIcon
                className="h-10 w-10 text-indigo-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
              Application forms
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              You can only create 1 application per address.
            </p>
          </div>
          <form onSubmit={onCreate} className="mt-6 flex items-start">
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
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
                    <option
                      defaultChecked={selectedListingId == listing.id}
                      key={listing.id}
                      value={listing.id}
                    >
                      {listing.address}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="form_type" className="sr-only">
                  Form Type
                </label>
                <select
                  onChange={e => setSelectedFormType(+e.target.value)}
                  name="form_type"
                  id="form_type"
                  value={selectedFormType}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a form</option>
                  {formTypes.map(form => (
                    <option key={form.id} value={form.id}>
                      {form.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
              message="Something went wrong while generating a cover letter"
            />
          )}
          {errors.error && !hasErrors && (
            <InputError className="mt-2" message={errors.error} />
          )}
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">
            Application forms previously created for selected address
          </h3>
          <ul
            role="list"
            className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {applicationForms.map(form => (
              <li
                key={form.id}
                className="flex items-center justify-between space-x-3 py-4"
              >
                <div className="flex min-w-0 flex-1 items-center space-x-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {form.filename}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-500">
                      <time dateTime={form.created_at} />
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={route('forms.download', form.id)}
                    className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                  >
                    <DocumentIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Download <span className="sr-only">{form.id}</span>
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
