import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMark } from '../common/constants';

const getLocalStorageTheme = async (): Promise<keyof typeof ThemeMark | null> => {
   const result = await AsyncStorage.getItem('theme');
   if (result) {
      const savedTheme = JSON.parse(result);
      return savedTheme;
   }
   return null;
};

const saveStorageTheme = async (theme: keyof typeof ThemeMark): Promise<void> => {
   AsyncStorage.setItem('theme', JSON.stringify(theme));
};

export { getLocalStorageTheme, saveStorageTheme };
