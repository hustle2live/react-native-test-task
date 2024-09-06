const FONTS = {
   LOBSTER_REGULAR: 'LobsterTwo-Regular',
   LOBSTER_ITALIC: 'LobsterTwo-Italic'
} as const;

type FontStyleType = Record<
   keyof typeof FONTS,
   {
      fontSize: number;
      fontFamily: string;
   }
>;

export { FONTS, type FontStyleType };
