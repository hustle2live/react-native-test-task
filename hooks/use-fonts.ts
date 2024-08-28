import * as Font from 'expo-font';
import { FONTS } from '../constants';

const useFonts = async (resolve: () => void, reject: (e: string) => void): Promise<void> => {
   try {
      await Font.loadAsync({
         [FONTS.LOBSTER_REGULAR]: require('../assets/fonts/LobsterTwo-Regular.otf'),
         [FONTS.LOBSTER_ITALIC]: require('../assets/fonts/LobsterTwo-Italic.otf')
      });

      resolve();
   } catch (e) {
      reject('error while loading fonts');
   }
};

export { useFonts };
