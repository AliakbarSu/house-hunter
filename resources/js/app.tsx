import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Board } from '@/types';
import BoardContext from '@/Context/BoardContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    // const [board, setBoard] = useState<Board | null>(null);
    const root = createRoot(el);

    root.render(
      <BoardContext.Provider
        value={props.initialPage.props?.board as unknown as Board | null}
      >
        <App {...props} />
      </BoardContext.Provider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
