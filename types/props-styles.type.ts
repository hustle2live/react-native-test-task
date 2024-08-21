import { FontStyleType, ThemeType } from '../contexts/theme-context';

type ThemeProps = {
   // colors: { primary: string; secondary: string };
   colors: Partial<ThemeType>;
   fonts: FontStyleType;
};

export type { ThemeProps };
