import {
  CheckCircleIcon,
  HomeIcon,
  HomeModernIcon,
  MinusCircleIcon,
} from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { ifElse } from '@/utils';
import { Board } from '@/types';
import { useForm } from '@inertiajs/react';

const initialChecklist = [
  {
    id: 1,
    title: 'Plan a Budget',
    description: '',
    checked: true,
  },
  {
    id: 2,
    title: 'Gain Finance Pre-approval',
    description: '',
    checked: false,
  },
  {
    id: 3,
    title: 'Apply for Grants and Subsidies',
    description: '',
    checked: false,
    final: true,
  },
];

const Checklist = ({ board }: { board: Board | null }) => {
  const { put, setData, data, errors, processing } = useForm({
    checklist: [...(board?.checklist || initialChecklist)],
  });

  const markAsComplete = (index: number) => {
    const checklist = data.checklist.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    setData('checklist', checklist);
  };

  useEffect(() => {
    // use id for check if data has changed
    const original = board?.checklist.map(item => item.checked).join('');
    const updated = data.checklist.map(item => item.checked).join('');
    if (original !== updated) {
      put(route('board.update', board?.id));
    }
  }, [data.checklist]);

  return (
    <div>
      <div className="py-8">
        <HomeModernIcon className="h-8 w-8 text-indigo-400" />
      </div>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {data.checklist.map((item, index) => (
          <li key={item.title} className="mb-10 ms-4">
            {item.checked ? (
              item.final ? (
                <HomeIcon
                  color="green"
                  aria-checked={false}
                  className="h-5 w-5 absolute mt-1.5 -start-2.5"
                />
              ) : (
                <CheckCircleIcon
                  color="green"
                  aria-checked={false}
                  className="h-5 w-5 absolute mt-1.5 -start-2.5"
                />
              )
            ) : (
              <MinusCircleIcon
                aria-checked={false}
                className="h-5 w-5 absolute mt-1.5 -start-2.5"
              />
            )}

            {/*<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">*/}
            {/*  February 2022*/}
            {/*</time>*/}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
            <button
              type="button"
              onClick={() => markAsComplete(index)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              {ifElse(
                processing,
                'Processing...',
                ifElse(item.checked, 'Mark as Incomplete', 'Mark as Complete')
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Checklist;
