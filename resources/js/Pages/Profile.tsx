import { FormEventHandler, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, Profile as ProfileType } from '@/types';
import InputError from '@/Components/InputError';

export default function Profile({
  auth: { user },
  profile,
  hasSubscription,
}: PageProps & {
  profile: ProfileType;
  hasSubscription: boolean;
}) {
  const initialData = {
    name: '',
    email: '',
    phone: '',
    mobile: '',
    current_address: {
      address: '',
      move_in_at: '',
      move_out_at: '',
    },
    previous_address: {
      address: '',
      move_in_at: '',
      move_out_at: '',
      landlord_name: '',
      landlord_phone: '',
      landlord_mobile: '',
      landlord_email: '',
      landlord_type: '',
      rent: '',
      rent_frequency: '',
    },
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
  };
  const { data, setData, post, processing, errors, reset } =
    useForm(initialData);

  useEffect(() => {
    if (profile) {
      const previousAddress =
        profile.addresses.find(
          ({ address_type }) => address_type === 'previous_address'
        ) || initialData.previous_address;
      const currentAddress =
        profile.addresses.find(
          ({ address_type }) => address_type === 'current_address'
        ) || initialData.current_address;
      setData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        mobile: profile.mobile,
        current_address: currentAddress,
        previous_address: previousAddress,
        references: profile.references,
      } as never);
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

  const setCurrentAddress = (key: string, value: string) => {
    const newCurrentAddress = { ...data.current_address };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    newCurrentAddress[key] = value;
    setData('current_address', newCurrentAddress);
  };

  const setPreviousAddress = (key: string, value: string) => {
    const newPreviousAddress = { ...data.previous_address };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    newPreviousAddress[key] = value;
    setData('previous_address', newPreviousAddress);
  };

  return (
    <Authenticated hasSubscription={hasSubscription} user={user}>
      <section className="bg-white">
        <Head title="Rental Profile" />
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h1 className="mb-8 text-xl font-bold text-gray-900">
            Add or update your rental profile
          </h1>
          <form onSubmit={submit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="rounded-lg bg-white shadow w-full col-span-2 p-5 gap-2 grid grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Applicant’s details
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type your full name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="someone@example.com"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="+64"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                  />
                  <InputError message={errors.phone} className="mt-2" />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="+64"
                    value={data.mobile}
                    onChange={e => setData('mobile', e.target.value)}
                  />
                  <InputError message={errors.mobile} className="mt-2" />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="current-address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Current address
                  </label>
                  <input
                    type="text"
                    name="current-address"
                    id="current-address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type your current address"
                    value={data.current_address.address}
                    onChange={e => setCurrentAddress('address', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['current_address.address']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="current-address-start-date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    name="current-address-start-date"
                    id="current-address-start-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={data.current_address.move_in_at}
                    onChange={e =>
                      setCurrentAddress('move_in_at', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['current_address.move_in_at']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="current-address-end-date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    End date
                  </label>
                  <input
                    type="date"
                    name="current-address-end-date"
                    id="current-address-end-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={data.current_address.move_out_at}
                    onChange={e =>
                      setCurrentAddress('move_out_at', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['current_address.move_out_at']}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-white shadow w-full col-span-2 p-5 gap-2 grid grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Previous rental details
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="previous-address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Property address
                  </label>
                  <input
                    type="text"
                    name="previous-address"
                    id="previous-address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type your previous address"
                    value={data.previous_address.address}
                    onChange={e =>
                      setPreviousAddress('address', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['previous_address.address']}
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2 flex-wrap items-center pt-2">
                  <label
                    htmlFor="from"
                    className="block mb-2 text-sm font-medium text-gray-900  w-full"
                  >
                    Name of
                  </label>
                  <div className="flex gap-2">
                    <label
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Property manager
                    </label>
                    <input
                      type="radio"
                      checked={
                        data.previous_address.landlord_type ===
                        'property_manager'
                      }
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
                      value="property_manager"
                      onChange={e =>
                        setPreviousAddress('landlord_type', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Agent
                    </label>
                    <input
                      type="radio"
                      checked={data.previous_address.landlord_type === 'agent'}
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
                      value="agent"
                      onChange={e =>
                        setPreviousAddress('landlord_type', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="landlord-type"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Landlord
                    </label>
                    <input
                      type="radio"
                      checked={
                        data.previous_address.landlord_type === 'landlord'
                      }
                      name="landlordType"
                      id="landlord-type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                      value="landlord"
                      onChange={e =>
                        setPreviousAddress('landlord_type', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="items-center pb-2">
                  <input
                    type="text"
                    name="landlord-name"
                    id="landlord-name"
                    placeholder="Name of the person"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.landlord_name}
                    onChange={e =>
                      setPreviousAddress('landlord_name', e.target.value)
                    }
                  />
                  <InputError
                    message={
                      (errors as never)['previous_address.landlord_name']
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="landlord-phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    name="landlord-phone"
                    id="landlord-phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.landlord_phone}
                    onChange={e =>
                      setPreviousAddress('landlord_phone', e.target.value)
                    }
                  />
                  <InputError
                    message={
                      (errors as never)['previous_address.landlord_phone']
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="landlord-mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="landlord-mobile"
                    id="landlord-mobile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.landlord_mobile}
                    onChange={e =>
                      setPreviousAddress('landlord_mobile', e.target.value)
                    }
                  />
                  <InputError
                    message={
                      (errors as never)['previous_address.landlord_mobile']
                    }
                    className="mt-2"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="landlord-email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="landlord-email"
                    id="landlord-email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.landlord_email}
                    onChange={e =>
                      setPreviousAddress('landlord_email', e.target.value)
                    }
                  />
                  <InputError
                    message={
                      (errors as never)['previous_address.landlord_email']
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="previous-address-start-date"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    name="previous-address-start-date"
                    id="previous-address-start-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.move_in_at}
                    onChange={e =>
                      setPreviousAddress('move_in_at', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['previous_address.move_in_at']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="previous-address-end-date"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    End date
                  </label>
                  <input
                    type="date"
                    name="previous-address-end-date"
                    id="previous-address-end-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.move_out_at}
                    onChange={e =>
                      setPreviousAddress('move_out_at', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['previous_address.move_out_at']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rent"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Rent
                  </label>
                  <input
                    type="number"
                    name="rent"
                    id="rent"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.rent}
                    onChange={e => setPreviousAddress('rent', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['previous_address.rent']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rent-frequency"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Rent frequency
                  </label>
                  <select
                    name="rent-frequency"
                    id="rent-frequency"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.previous_address.rent_frequency}
                    onChange={e =>
                      setPreviousAddress('rent_frequency', e.target.value)
                    }
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
                    className="block mb-2 text-md font-medium text-gray-900 "
                  >
                    References
                  </label>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="reference_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Reference #1
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="reference_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="reference_name[]"
                    id="reference_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Name of the person"
                    value={data.references[0]?.name}
                    onChange={e => setReference(0, 'name', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.0.name']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference_relationship_1"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="reference_relationship[]"
                    id="reference_relationship_1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Name of the person"
                    value={data.references[0]?.relationship}
                    onChange={e =>
                      setReference(0, 'relationship', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['references.0.relationship']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference-1-phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="reference_phone[]"
                    id="reference-1-phone"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.references[0]?.phone}
                    onChange={e => setReference(0, 'phone', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.0.phone']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference-1-mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="reference_mobile[]"
                    id="reference-1-mobile"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.references[0]?.mobile}
                    onChange={e => setReference(0, 'mobile', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.0.mobile']}
                    className="mt-2"
                  />
                </div>
                <div className="col-span-2 mt-2">
                  <label
                    htmlFor="reference-2-name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Reference #2
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="reference-2-name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="reference_name[]"
                    id="reference-2-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Name of the person"
                    value={data.references[1]?.name}
                    onChange={e => setReference(1, 'name', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.1.name']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference-2-relationship"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="reference_relationship[]"
                    id="reference-2-relationship"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Name of the person"
                    value={data.references[1]?.relationship}
                    onChange={e =>
                      setReference(1, 'relationship', e.target.value)
                    }
                  />
                  <InputError
                    message={(errors as never)['references.1.relationship']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference-2-phone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="reference_phone[]"
                    id="reference-2-phone"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.references[1]?.phone}
                    onChange={e => setReference(1, 'phone', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.1.phone']}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reference-2-mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="reference_mobile[]"
                    id="reference-2-mobile"
                    placeholder="+64"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={data.references[1]?.mobile}
                    onChange={e => setReference(1, 'mobile', e.target.value)}
                  />
                  <InputError
                    message={(errors as never)['references.1.mobile']}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
            <button
              disabled={processing}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Save changes
            </button>
          </form>
        </div>
      </section>
    </Authenticated>
  );
}
