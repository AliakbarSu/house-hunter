import { FormEventHandler, useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Register({ status }: { status?: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <section className="bg-gray-50 h-full">
      <Head title="Register" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          {/*<img*/}
          {/*  className="w-8 h-8 mr-2"*/}
          {/*  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"*/}
          {/*  alt="logo"*/}
          {/*/>*/}
          Property Hunters
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            {status && (
              <div className="mb-4 font-medium text-sm text-green-600">
                {status}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  value={data.name}
                  autoComplete="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={e => setData('name', e.target.value)}
                  required
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  value={data.email}
                  autoComplete="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={e => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  autoComplete="new-password"
                  onChange={e => setData('password', e.target.value)}
                  value={data.password}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  autoComplete="new-password"
                  onChange={e =>
                    setData('password_confirmation', e.target.value)
                  }
                  value={data.password_confirmation}
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500">
                Already registered?{' '}
                <a
                  href={route('login')}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
