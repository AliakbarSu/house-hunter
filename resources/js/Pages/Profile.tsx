import { FormEventHandler, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Profile({
  auth: { user },
  profile,
}: PageProps & { profile: never }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
    current_address: '',
    move_in_at: '',
    move_out_at: '',
    previous_address: '',
    previous_address_move_in_at: '',
    previous_address_move_out_at: '',
    landlord_name: '',
    landlord_phone: '',
    landlord_mobile: '',
    landlord_email: '',
    landlord_type: '',
    rent: '',
    rent_frequency: '',
    references: [
      {
        name: '',
        relationship: '',
        phone: '',
        mobile: '',
      },
      {
        name: '',
        relationship: '',
        phone: '',
        mobile: '',
      },
    ],
  });

  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, [profile]);

  const submit: FormEventHandler = e => {
    e.preventDefault();
    post(route('profile.add'));
  };

  const setReference = (index: number, key: string, value: string) => {
    const newReferences = [...data.references];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    newReferences[index][key] = value;
    setData('references', newReferences);
  };

  return (
    <Authenticated user={user}>
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
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type your full name"
                    value={data.first_name}
                    onChange={e => setData('first_name', e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type your full name"
                    value={data.last_name}
                    onChange={e => setData('last_name', e.target.value)}
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
                    value={data.current_address}
                    onChange={e => setData('current_address', e.target.value)}
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
                    value={data.move_in_at}
                    onChange={e => setData('move_in_at', e.target.value)}
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
                    value={data.move_out_at}
                    onChange={e => setData('move_out_at', e.target.value)}
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
                    value={data.previous_address}
                    onChange={e => setData('previous_address', e.target.value)}
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
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Property manager
                    </label>
                    <input
                      type="radio"
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value="property_manager"
                      onChange={e => setData('landlord_type', e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Agent
                    </label>
                    <input
                      type="radio"
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value="agent"
                      onChange={e => setData('landlord_type', e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Landlord
                    </label>
                    <input
                      type="radio"
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value="landlord"
                      onChange={e => setData('landlord_type', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center pb-2">
                  <input
                    type="text"
                    name="landlord-name"
                    id="landlord-name"
                    placeholder="Name of the person"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.landlord_name}
                    onChange={e => setData('landlord_name', e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="landlord-phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    name="landlord-phone"
                    id="landlord-phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.landlord_phone}
                    onChange={e => setData('landlord_phone', e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="landlord-mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="landlord-mobile"
                    id="landlord-mobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.landlord_mobile}
                    onChange={e => setData('landlord_mobile', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="landlord-email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="landlord-email"
                    id="landlord-email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.landlord_email}
                    onChange={e => setData('landlord_email', e.target.value)}
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
                    value={data.previous_address_move_in_at}
                    onChange={e =>
                      setData('previous_address_move_in_at', e.target.value)
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
                    value={data.previous_address_move_out_at}
                    onChange={e =>
                      setData('previous_address_move_out_at', e.target.value)
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
                    value={data.rent_frequency}
                    onChange={e => setData('rent_frequency', e.target?.value)}
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
                    htmlFor="reference_name"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    References
                  </label>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="reference_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reference #1
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="reference_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="reference_name[]"
                    id="reference_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name of the person"
                    value={data.references[0]?.name}
                    onChange={e => setReference(0, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference_relationship_1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="reference_relationship[]"
                    id="reference_relationship_1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name of the person"
                    value={data.references[0]?.relationship}
                    onChange={e =>
                      setReference(0, 'relationship', e.target.value)
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
                    name="reference_phone[]"
                    id="reference-1-phone"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.references[0]?.phone}
                    onChange={e => setReference(0, 'phone', e.target.value)}
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
                    name="reference_mobile[]"
                    id="reference-1-mobile"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.references[0]?.mobile}
                    onChange={e => setReference(0, 'mobile', e.target.value)}
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
                    name="reference_name[]"
                    id="reference-2-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name of the person"
                    value={data.references[1]?.name}
                    onChange={e => setReference(1, 'name', e.target.value)}
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
                    name="reference_relationship[]"
                    id="reference-2-relationship"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name of the person"
                    value={data.references[1]?.relationship}
                    onChange={e =>
                      setReference(1, 'relationship', e.target.value)
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
                    name="reference_phone[]"
                    id="reference-2-phone"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.references[1]?.phone}
                    onChange={e => setReference(1, 'phone', e.target.value)}
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
                    name="reference_mobile[]"
                    id="reference-2-mobile"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={data.references[1]?.mobile}
                    onChange={e => setReference(1, 'mobile', e.target.value)}
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
    </Authenticated>
  );
}
