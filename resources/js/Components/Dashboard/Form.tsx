import { useForm } from '@inertiajs/react';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';
import { BoardColumn, Listing, User } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import { format } from 'date-fns';
import Tabs, { Tab } from '@/Components/Dashboard/Tabs';
import Notes from '@/Components/Dashboard/Notes';
import ListingLimitAlert from '@/Components/Dashboard/ListingLimitAlert';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  address: z.string().min(1, { message: 'Address is required' }),
  rent: z.number().min(1, { message: 'Required' }),
  bedrooms: z.number().min(1, { message: 'Required' }),
  bathrooms: z.number().min(1, { message: 'Required' }),
  board_id: z.number(),
  status: z.string().min(1, { message: 'Required' }),
  // images: z.any(),
});

const tabs: Tab[] = [
  { name: 'Listing', value: 'listing' },
  { name: 'Notes', value: 'notes' },
];

const bedrooms = [1, 2, 3, 4, 5, 6, 7, 8];
const bathrooms = [1, 2, 3, 4, 5, 6, 7, 8];
const garages = [1, 2, 3];

export default function Form({
  user,
  closeModal,
  listing,
  columns,
}: {
  user: User;
  closeModal: () => void;
  listing?: Listing;
  columns: BoardColumn[];
}) {
  const { post, errors, data, processing, setData } = useForm({
    title: listing?.title || '',
    description: listing?.description || '',
    address: listing?.address || '',
    rent: listing?.rent || 0,
    bedrooms: listing?.bedrooms || 0,
    bathrooms: listing?.bathrooms || 0,
    garages: listing?.garages || 0,
    board_id: user.boards[0].id,
    status: listing?.status || '',
    viewing_at: listing?.viewing_at
      ? format(new Date(listing?.viewing_at), 'yyyy-MM-dd')
      : null,
    images: [] as unknown as FileList | null,
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(tabs[0]);
  const [modal, setModal] = useState(false);
  const updateMode = !!listing;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateMode) {
      post(route('listing.update', listing.id), {
        onSuccess: () => closeModal(),
      });
    } else {
      post(route('listing.add'), { onSuccess: () => closeModal() });
    }
  };

  const onFileChange = (e: FormEvent<HTMLInputElement>) => {
    const files = (e.target as unknown as { files: FileList }).files;
    if (files) {
      setData('images', files);
    }
  };

  useEffect(() => {
    if (data.images) {
      const urls = Array.from(data.images).map(file =>
        URL.createObjectURL(file)
      );
      setPreviews(urls);
    }
  }, [data.images]);

  useEffect(() => {
    if (listing?.images) {
      const urls = listing.images.map(image => image.url);
      setPreviews(urls);
    }
  }, [listing?.images]);

  useEffect(() => {
    if ((errors as unknown as { listing_limit?: string })?.listing_limit) {
      setModal(true);
    }
  }, [processing, errors]);

  const isActiveTab = (tab: string) => {
    return activeTab?.value === tab;
  };

  return (
    <form onSubmit={onSubmit} className="px-10 py-10">
      <ListingLimitAlert show={modal} onClose={() => setModal(false)} />
      <div className="flex justify-between items-start">
        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          tabClicked={tab => setActiveTab(tab)}
        />
        <div onClick={() => closeModal()}>
          <XCircleIcon className="h-5 w-5 cursor-pointer" color="#64679a" />
        </div>
      </div>
      {isActiveTab('listing') ? (
        <div className="flex flex-col gap-8 mx-auto max-w-lg lg:max-w-none">
          <section aria-labelledby="contact-info-heading">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address*
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e => setData('address', e.target.value)}
                      type="text"
                      value={data.address}
                      id="address"
                      name="address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <InputError className="mt-1" message={errors.address} />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="rent"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rent*
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e => setData('rent', +e.target.value)}
                      type="text"
                      id="rent"
                      value={data.rent}
                      name="rent"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <InputError className="mt-1" message={errors.rent} />
                </div>

                <div>
                  <div className="mt-1">
                    <select
                      onChange={e => setData('bedrooms', +e.target.value)}
                      id="bedrooms"
                      name="bedrooms"
                      value={data.bedrooms}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Bedrooms</option>
                      {bedrooms.map(bedroom => (
                        <option key={bedroom} value={bedroom}>
                          {bedroom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputError className="mt-1" message={errors.bedrooms} />
                </div>

                <div>
                  <div className="mt-1">
                    <select
                      onChange={e => setData('bathrooms', +e.target.value)}
                      id="bathrooms"
                      value={data.bathrooms}
                      name="bathrooms"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Bathrooms</option>
                      {bathrooms.map(bathroom => (
                        <option key={bathroom} value={bathroom}>
                          {bathroom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputError className="mt-1" message={errors.bathrooms} />
                </div>
                <div>
                  <div className="mt-1">
                    <select
                      onChange={e => setData('garages', +e.target.value)}
                      id="bedrooms"
                      name="bedrooms"
                      value={data.garages}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Garages</option>
                      {garages.map(garage => (
                        <option key={garage} value={garage}>
                          {garage}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputError className="mt-1" message={errors.garages} />
                </div>

                <div className="col-span-full">
                  <div className="mt-1">
                    <select
                      onChange={e => setData('status', e.target.value)}
                      id="status"
                      name="status"
                      value={data.status}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select status</option>
                      {columns.map(status => (
                        <option key={status.id} value={status.type}>
                          {status.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputError className="mt-1" message={errors.status} />
                </div>
              </div>

              {data.status === 'viewing' && (
                <div className="mt-6">
                  <label
                    htmlFor="viewint_at"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Viewing date
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={e =>
                        setData('viewing_at', e.target.value as unknown as null)
                      }
                      type="date"
                      id="viewing_at"
                      value={data.viewing_at || ''}
                      name="viewing_at"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    onChange={e => setData('title', e.target.value)}
                    type="text"
                    id="title"
                    value={data.title}
                    name="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={e => setData('description', e.target.value)}
                    cols={30}
                    id="description"
                    value={data.description}
                    name="description"
                    autoComplete="description"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <input
                className="sr-only"
                type="text"
                readOnly={true}
                value={user.boards[0].id}
                name="board_id"
              />
            </div>
          </section>

          <section aria-labelledby="file-upload-heading">
            <div className="mt-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Images
                </label>
                <div className="mt-2 flex flex-wrap justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload </span>
                        <input
                          onChange={onFileChange}
                          multiple
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">a single or multiple files</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                    {previews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/*{errors.images?.message && (*/}
              {/*  <p className="mt-2 text-sm text-red-600" id="email-error">*/}
              {/*    {errors.images.message}*/}
              {/*  </p>*/}
              {/*)}*/}
            </div>
          </section>

          <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
            {updateMode ? (
              <button
                disabled={processing}
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                {processing ? 'Updating...' : 'Update'}
              </button>
            ) : (
              <button
                disabled={processing}
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                {processing ? 'Creating..' : 'Create'}
              </button>
            )}
            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
              Please fill in required fields
            </p>
          </div>
        </div>
      ) : (
        <Notes listing={listing} closeModal={closeModal} />
      )}
    </form>
  );
}
