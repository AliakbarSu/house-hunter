import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { ifElse } from '@/utils';

export default function AddBoard({ auth, hasSubscription }: PageProps) {
  const { post, setData, data, processing } = useForm({
    name: '',
    type: 'rent',
  });

  const creaeBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('board.add'), {
      data,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="bg-white h-full flex justify-center items-start pt-24 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 w-3/4 flex flex-wrap items-start justify-center">
          <h3 className="text-base font-semibold leading-6 text-gray-900 w-full">
            Create a new board
          </h3>
          <div className="mt-2 text-sm text-gray-500 w-full">
            <p className="w-full text-left">
              Enter a name for your house hunting board.
            </p>
          </div>
          <form
            onSubmit={creaeBoard}
            className="mt-5 sm:flex items-start w-full"
          >
            <div className="flex flex-wrap gap-6">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="2024 House Hunt"
                />
              </div>
              <div className="flex justify-start flex-wrap items-center gap-4 sm:gap-8 w-full sm:max-w-xs">
                <p className="w-full sm:w-auto">I am looking to</p>
                <div className="flex items-center">
                  <input
                    checked={data.type === 'buy'}
                    id="default-radio-1"
                    type="radio"
                    value="buy"
                    name="default-radio"
                    onChange={e => setData('type', e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Buy
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={data.type === 'rent'}
                    id="default-radio-2"
                    type="radio"
                    value="rent"
                    onChange={e => setData('type', e.target.value)}
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Rent
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              {ifElse(processing, 'Creating...', 'Create Board')}
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
