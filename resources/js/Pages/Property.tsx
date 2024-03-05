import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const properties = [
  {
    id: 1,
    name: '33 budgen street, Avondale Heights',
    color: '3 bed, 2 bath',
    price: '$650/week',
    href: '#',
    imageSrc:
      'https://media.istockphoto.com/id/1309023728/video/cinematic-intro-of-the-coming-soon-lettering-from-the-dark.jpg?s=640x640&k=20&c=6ywPVAi06d-ODrrEYERKmgC7CBbGeZeLaJXhwklfzDk=',
    imageAlt:
      'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      // { name: 'Black', colorBg: '#111827' },
      // { name: 'Brass', colorBg: '#FDE68A' },
      // { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
];

const Cards = () => {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending properties
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {properties.map(property => (
                <li
                  key={property.id}
                  className="inline-flex w-64 flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                      <img
                        src={property.imageSrc}
                        alt={property.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">{property.color}</p>
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <a href={property.href}>
                          <span className="absolute inset-0" />
                          {property.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-gray-900">{property.price}</p>
                    </div>
                  </div>

                  <h4 className="sr-only">Available colors</h4>
                  <ul
                    role="list"
                    className="mt-auto flex items-center justify-center space-x-3 pt-6"
                  >
                    {/*{property.availableColors.map(color => (*/}
                    {/*  <li*/}
                    {/*    key={color.name}*/}
                    {/*    className="h-4 w-4 rounded-full border border-black border-opacity-10"*/}
                    {/*    style={{ backgroundColor: color.colorBg }}*/}
                    {/*  >*/}
                    {/*    <span className="sr-only">{color.name}</span>*/}
                    {/*  </li>*/}
                    {/*))}*/}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Property = ({ auth, hasSubscription, board }: PageProps) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      hasSubscription={hasSubscription}
      board={board}
      sidebar={false}
    >
      <Cards />
    </AuthenticatedLayout>
  );
};

export default Property;
