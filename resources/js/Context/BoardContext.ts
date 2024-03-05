import { createContext } from 'react';
import { Board } from '@/types';

const BoardContext = createContext<Board | null>(null);

export default BoardContext;
