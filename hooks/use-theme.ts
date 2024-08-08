import { useContext } from 'react';

import { ThemeContext } from '../contexts';

const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

export { useTheme };
