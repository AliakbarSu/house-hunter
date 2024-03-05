import { classNames } from '@/utils';

export type Tab = {
  name: string;
  value: string;
};

const Tabs = ({
  tabs,
  activeTab,
  tabClicked,
}: {
  tabs: Tab[];
  activeTab: Tab | null;
  tabClicked: (tab: Tab) => void;
}) => {
  return (
    <ul className="mb-4 flex flex-wrap text-sm font-medium text-center text-gray-500">
      {tabs.map(tab => (
        <li key={tab.value} className="me-2">
          <p
            onClick={() => tabClicked(tab)}
            aria-current={activeTab?.value === tab.value ? 'page' : undefined}
            className={classNames(
              activeTab?.value == tab.value
                ? 'text-blue-600 border-blue-600 border-b-2'
                : 'text-blue-600',
              'cursor-pointer inline-block px-4 py-2 bg-gray-100 rounded-t-lg active'
            )}
          >
            {tab.name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
