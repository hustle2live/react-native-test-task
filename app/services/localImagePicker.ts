import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import { ImagePickerResult } from 'expo-image-picker';
import { GetImageResponseDto } from '../common/types';

const resultedImageData = (image?: ImagePicker.ImagePickerAsset): GetImageResponseDto => {
   if (!image) return { id: '0', download_url: '' };

   const uniqId = uuid.v4.toString();
   return {
      id: uniqId,
      download_url: image.uri
   };
};

const onDevice = async (): Promise<GetImageResponseDto> => {
   try {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1
      });

      if (!result.canceled) {
         return resultedImageData(result.assets[0]);
      }

      throw new Error();
   } catch (error) {
      console.warn('Picking up image canceled', error);
      return resultedImageData();
   }
};

const onCamera = async (): Promise<GetImageResponseDto> => {
   try {
      const result: ImagePickerResult = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1
      });

      if (!result.canceled) {
         return resultedImageData(result.assets[0]);
      }
      throw new Error();
   } catch (error) {
      console.warn('Picking up image canceled', error);
      return resultedImageData();
   }
};

export { onDevice, onCamera };
