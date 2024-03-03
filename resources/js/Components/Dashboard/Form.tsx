import { useForm } from '@inertiajs/react';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';
import { User } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import InputError from '@/Components/InputError';

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

const statuses = [
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'viewed', label: 'Viewed' },
  { value: 'viewing', label: 'Viewing' },
  { value: 'applied', label: 'Applied' },
  { value: 'offer_accepted', label: 'Offer Accepted' },
  { value: 'offer_rejected', label: 'Offer Rejected' },
];

const bedrooms = [1, 2, 3, 4, 5, 6, 7, 8];
const bathrooms = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Form({
  user,
  closeModal,
}: {
  user: User;
  closeModal: () => void;
}) {
  const { post, errors, data, processing, setData } = useForm({
    title: '',
    description: '',
    address: '',
    rent: 0,
    bedrooms: 0,
    bathrooms: 0,
    board_id: user.boards[0].id,
    status: '',
    viewing_at: null,
    images: [] as unknown as FileList | null,
  });
  const [previews, setPreviews] = useState<string[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('listing.add'), { onSuccess: () => closeModal() });
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

  return (
    <form onSubmit={onSubmit} className="px-10 py-10">
      <div className="flex flex-col gap-8 mx-auto max-w-lg lg:max-w-none">
        <section aria-labelledby="contact-info-heading">
          <div className="flex justify-between items-center">
            <h2
              id="contact-info-heading"
              className="text-lg font-medium text-gray-900"
            >
              Listing information
            </h2>
            <div onClick={() => closeModal()}>
              <XCircleIcon className="h-5 w-5 cursor-pointer" color="#64679a" />
            </div>
          </div>

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
                  type="number"
                  id="rent"
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
                  onChange={e => setData('status', e.target.value)}
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select status</option>
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
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
            value={user.boards[0].id}
            name="board_id"
          />
        </section>

        <section aria-labelledby="file-upload-heading">
          <div className="mt-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Files & images
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
                      <span>Upload a file</span>
                      <input
                        onChange={onFileChange}
                        multiple
                        id="images"
                        name="images"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
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
          <button
            disabled={processing}
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
          >
            {processing ? 'Creating..' : 'Create'}
          </button>
          <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
            Please fill in required fields
          </p>
        </div>
      </div>
    </form>
  );
}
