import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inspiration } from '../common/types';

const getStorageInspirationCards = async (): Promise<Inspiration[] | null> => {
   const result = await AsyncStorage.getItem('cards');
   if (result) {
      const savedCards = JSON.parse(result);
      return savedCards;
   }
   return null;
};

const saveStorageInspirationCards = async (cards: Inspiration[]): Promise<void> => {
   AsyncStorage.setItem('cards', JSON.stringify(cards));
};

export { getStorageInspirationCards, saveStorageInspirationCards };
