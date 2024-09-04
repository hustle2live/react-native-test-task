const COLORS_LIGHT = {
   APP_BACKGROUND: '#fae8c0',
   PRIMARY: '#660014',
   SECONDARY: '#665959',
   GREY: '#BDBDBD',
   FONT_MAIN: '#292827',
   FONT_INVERSE: '#FFFFFF'
} as const;

const COLORS_DARK = {
   APP_BACKGROUND: '#292827',
   PRIMARY: '#c86822',
   SECONDARY: '#e8caa2',
   GREY: '#BDBDBD',
   FONT_MAIN: '#000000',
   FONT_INVERSE: '#FFFFFF'
} as const;

const ThemeMark = {
   DARK: 'DARK',
   LIGHT: 'LIGHT'
} as const;

export { COLORS_DARK, COLORS_LIGHT, ThemeMark };
