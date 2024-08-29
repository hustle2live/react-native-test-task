import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
   });

   if (!result.canceled) {
      const image = result.assets[0].uri;
      const source = { uri: image };
      return source;
   }
};

export { pickImage };
