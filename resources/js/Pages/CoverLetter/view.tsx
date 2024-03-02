import { Head } from '@inertiajs/react';
import { CoverLetter, PageProps } from '@/types';

export default function ViewCoverLetter({
  cover_letter,
}: PageProps<{ cover_letter: CoverLetter; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />
      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        {cover_letter?.filename}
      </div>
    </>
  );
}
