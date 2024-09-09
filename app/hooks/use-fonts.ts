import * as Font from 'expo-font';
import { FONTS } from '../common/constants';

const useFonts = async (resolve: (e: boolean) => void, reject: (e: string) => void): Promise<void> => {
   try {
      await Font.loadAsync({
         [FONTS.LOBSTER_REGULAR]: require('../assets/fonts/LobsterTwo-Regular.otf'),
         [FONTS.LOBSTER_ITALIC]: require('../assets/fonts/LobsterTwo-Italic.otf')
      });

      resolve(true);
   } catch (e) {
      reject('Error while loading fonts');
   }
};

export { useFonts };
