import { FontStyleType, ThemeType } from '../../contexts/theme-context';

interface ThemeContextProps {
   theme: ThemeType;
   fonts: FontStyleType;
   toggleTheme: () => void;
}

type ThemeScreepProps = {
   colors: Pick<ThemeContextProps, 'theme'>[keyof Pick<ThemeContextProps, 'theme'>];
   fonts: Pick<ThemeContextProps, 'fonts'>[keyof Pick<ThemeContextProps, 'fonts'>];
};

export type { ThemeScreepProps, ThemeContextProps };
