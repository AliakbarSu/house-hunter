import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Profile() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    mobile: '',
    currentAddress: '',
    currentAddressStartDate: '',
    currentAddressEndDate: '',
    previousAddress: '',
    previousAddressStartDate: '',
    previousAddressEndDate: '',
    landlordName: '',
    rent: '',
    rentFrequency: '',
    reference1Name: '',
    reference1Relationship: '',
    reference1Phone: '',
    reference1Mobile: '',
    reference2Name: '',
    reference2Relationship: '',
    reference2Phone: '',
    reference2Mobile: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();

    console.log(data);

    // post(route('login'));
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <Head title="Rental Profile" />
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Applicant’s details
        </h2>
        <form onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-lg bg-white shadow w-full col-span-2 p-5 gap-2 grid grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Applicant’s details
                </label>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your full name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="someone@example.com"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="+64"
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="+64"
                  value={data.mobile}
                  onChange={e => setData('mobile', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="current-address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current address
                </label>
                <input
                  type="text"
                  name="current-address"
                  id="current-address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your current address"
                  value={data.currentAddress}
                  onChange={e => setData('currentAddress', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="current-address-start-date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start date
                </label>
                <input
                  type="date"
                  name="current-address-start-date"
                  id="current-address-start-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.currentAddressStartDate}
                  onChange={e =>
                    setData('currentAddressStartDate', e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="current-address-end-date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End date
                </label>
                <input
                  type="date"
                  name="current-address-end-date"
                  id="current-address-end-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.currentAddressEndDate}
                  onChange={e =>
                    setData('currentAddressEndDate', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="rounded-lg bg-white shadow w-full col-span-2 p-5 gap-2 grid grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Previous rental details
                </label>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="previous-address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Property address
                </label>
                <input
                  type="text"
                  name="previous-address"
                  id="previous-address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your previous address"
                  value={data.previousAddress}
                  onChange={e => setData('previousAddress', e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap items-center pt-2">
                <label
                  htmlFor="from"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
                >
                  Name of
                </label>
                <div className="flex gap-2">
                  <label
                    htmlFor="landlord-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Property manager
                  </label>
                  <input
                    type="radio"
                    name="from"
                    id="landlord-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="flex gap-2">
                  <label
                    htmlFor="landlord-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Agent
                  </label>
                  <input
                    type="radio"
                    name="from"
                    id="landlord-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="flex gap-2">
                  <label
                    htmlFor="landlord-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Landlord
                  </label>
                  <input
                    type="radio"
                    name="from"
                    id="landlord-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="flex items-center pb-2">
                <input
                  type="text"
                  name="from"
                  id="landlord-name"
                  placeholder="Name of the person"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="from"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="number"
                  name="from"
                  id="from"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="to"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="number"
                  name="to"
                  id="to"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="to"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="to"
                  id="to"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="previous-address-start-date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start date
                </label>
                <input
                  type="date"
                  name="previous-address-start-date"
                  id="previous-address-start-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.previousAddressStartDate}
                  onChange={e =>
                    setData('previousAddressStartDate', e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="previous-address-end-date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End date
                </label>
                <input
                  type="date"
                  name="previous-address-end-date"
                  id="previous-address-end-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.previousAddressEndDate}
                  onChange={e =>
                    setData('previousAddressEndDate', e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="rent"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  id="rent"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.rent}
                  onChange={e => setData('rent', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="rent-frequency"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rent frequency
                </label>
                <select
                  name="rent-frequency"
                  id="rent-frequency"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.rentFrequency}
                  onChange={e => setData('rentFrequency', e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="rounded-lg bg-white shadow w-full col-span-2 p-5 gap-2 grid grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  References
                </label>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reference #1
                </label>
              </div>
              <div>
                <label
                  htmlFor="reference-1-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="reference-1-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name of the person"
                  value={data.reference1Name}
                  onChange={e => setData('reference1Name', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="reference-1-relationship"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  name="reference-1-relationship"
                  id="reference-1-relationship"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name of the person"
                  value={data.reference1Relationship}
                  onChange={e =>
                    setData('reference1Relationship', e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="reference-1-phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="reference-1-phone"
                  id="reference-1-phone"
                  placeholder="+64"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.reference1Phone}
                  onChange={e => setData('reference1Phone', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="reference-1-mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="tel"
                  name="reference-1-mobile"
                  id="reference-1-mobile"
                  placeholder="+64"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.reference1Mobile}
                  onChange={e => setData('reference1Mobile', e.target.value)}
                />
              </div>
              <div className="col-span-2 mt-2">
                <label
                  htmlFor="reference-2-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reference #2
                </label>
              </div>
              <div>
                <label
                  htmlFor="reference-2-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="reference-2-name"
                  id="reference-2-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name of the person"
                  value={data.reference2Name}
                  onChange={e => setData('reference2Name', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="reference-2-relationship"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  name="reference-2-relationship"
                  id="reference-2-relationship"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name of the person"
                  value={data.reference2Relationship}
                  onChange={e =>
                    setData('reference2Relationship', e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="reference-2-phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="reference-2-phone"
                  id="reference-2-phone"
                  placeholder="+64"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.reference2Phone}
                  onChange={e => setData('reference2Phone', e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="reference-2-mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="tel"
                  name="reference-2-mobile"
                  id="reference-2-mobile"
                  placeholder="+64"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={data.reference2Mobile}
                  onChange={e => setData('reference2Mobile', e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            disabled={processing}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Save changes
          </button>
        </form>
      </div>
    </section>
  );
}
