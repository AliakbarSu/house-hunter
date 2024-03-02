import { SubmitHandler, useForm } from 'react-hook-form';
import { useForm as useFormInertia } from '@inertiajs/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  address: z.string().min(1, { message: 'Required' }),
  rent: z.number().min(1, { message: 'Required' }),
  bedrooms: z.number().min(1, { message: 'Required' }),
  bathrooms: z.number().min(1, { message: 'Required' }),
  board_id: z.number(),
  status: z.string().min(1, { message: 'Required' }),
  // images: z.any(),
});

type FormFields = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { post, data, setData } = useFormInertia();

  const onSubmit: SubmitHandler<FormFields> = async formData => {
    setData(formData);
  };

  useEffect(() => {
    post(route('listing.add'));
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-10">
      <div className="flex flex-col gap-8 mx-auto max-w-lg lg:max-w-none">
        <section aria-labelledby="contact-info-heading">
          <h2
            id="contact-info-heading"
            className="text-lg font-medium text-gray-900"
          >
            Listing information
          </h2>

          <div className="mt-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                {...register('title')}
                type="text"
                id="title"
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
              <input
                {...register('description')}
                type="tel"
                id="description"
                name="description"
                autoComplete="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <input
            className="sr-only"
            type="text"
            value={1}
            {...register('board_id', {
              setValueAs: value => parseFloat(value) || 1,
            })}
            name="board_id"
          />

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
                  {...register('address', { required: 'Field is required' })}
                  type="text"
                  id="address"
                  name="address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.address?.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.address.message}
                </p>
              )}
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
                  {...register('rent', {
                    required: 'Field is required',
                    setValueAs: value => parseFloat(value) || 0,
                  })}
                  type="number"
                  id="rent"
                  name="rent"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.rent?.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.rent.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bedrooms"
                className="block text-sm font-medium text-gray-700"
              >
                Bedrooms*
              </label>
              <div className="mt-1">
                <input
                  {...register('bedrooms', {
                    required: 'Field is required',
                    setValueAs: value => parseFloat(value) || 0,
                  })}
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.bedrooms?.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bathrooms"
                className="block text-sm font-medium text-gray-700"
              >
                Bathrooms*
              </label>
              <div className="mt-1">
                <input
                  {...register('bathrooms', {
                    required: 'Field is required',
                    setValueAs: value => parseFloat(value) || 0,
                  })}
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.bathrooms?.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.bathrooms.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status*
              </label>
              <div className="mt-1">
                <select
                  {...register('status', {
                    required: 'Field is required',
                  })}
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>wishlist</option>
                  <option>viewed</option>
                  <option>viewing</option>
                  <option>applied</option>
                  <option>offer_accepted</option>
                  <option>offer_declined</option>
                </select>
              </div>
              {errors.status?.message && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
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
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                      {/*<input*/}
                      {/*    multiple*/}
                      {/*    {...register('images')}*/}
                      {/*    id="images"*/}
                      {/*    name="images"*/}
                      {/*    type="file"*/}
                      {/*    className="sr-only"*/}
                      {/*/>*/}
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
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
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
          >
            Create
          </button>
          <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
            Please fill in required fields
          </p>
        </div>
      </div>
    </form>
  );
}
