import React, { useState } from 'react';
import {
   Text,
   TextInput,
   View,
   SafeAreaView,
   ImageBackground,
   TouchableOpacity,
   StyleSheet,
   Alert
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS_LIGHT } from '../../../common/constants';
import { RootStackParamList } from '../../../common/types/navigation.type';
import { ThemeScreepProps } from '../../../common/types/props-styles.type';
import { GetImageResponseDto, GetQuoteResponseDto } from '../../../common/types';

import { InspirationCard } from '../../inspiration-card/inspiration-card';

import { onDevice, onCamera } from '../../../services/localImagePicker';
import { getRandomImage } from '../../../services/getRandomImage';
import { getRandomQuote } from '../../../services/getRandomQuote';

import { ScreenBackground } from '../screen-background/screen-background';

type Props = NativeStackScreenProps<RootStackParamList, 'AddInspiration'> & ThemeScreepProps;

const AddInspiration: React.FC<Props> = ({ navigation, colors, fonts }: Props) => {
   const noImageBlueprint = require('../../../assets/no-image.jpg');

   const [text, setText] = useState<string>('');
   const [image, setImage] = useState<GetImageResponseDto | null>(null);

   const buttonStyles = StyleSheet.create({
      primary: {
         paddingTop: 10,
         paddingBottom: 10,
         borderRadius: 6,
         borderWidth: 1,
         fontSize: 14,
         fontFamily: fonts.LOBSTER_REGULAR.fontFamily,
         color: colors?.PRIMARY,
         borderColor: colors?.PRIMARY,
         backgroundColor: colors?.APP_BACKGROUND,
         textAlign: 'center',
         alignItems: 'center'
      },
      filled: {
         backgroundColor: colors?.PRIMARY,
         color: colors?.FONT_INVERSE
      },
      halfSize: { flex: 1 },
      fullSize: { width: '100%' },
      text: {
         fontStyle: 'normal',
         fontFamily: fonts.LOBSTER_REGULAR.fontFamily,
         color: colors === COLORS_LIGHT ? colors?.FONT_MAIN : colors?.SECONDARY
      }
   });

   const stylesInput = StyleSheet.create({
      textArea: {
         height: 84,
         padding: 10,
         textAlign: 'left',
         color: colors === COLORS_LIGHT ? colors?.FONT_MAIN : colors?.SECONDARY
      }
   });

   const imageSource = image && image.download_url ? { uri: image.download_url } : noImageBlueprint;

   const isNotValid = !text.trim() || !image;

   const createCard = () => {
      return { quote: text, image_url: image?.download_url };
   };

   const handleRequestQuote = async (): Promise<void> => {
      const result: GetQuoteResponseDto = await getRandomQuote();
      if (result?.quoteText) {
         setText(result.quoteText);
      }
   };

   const handlePickImage = async (imagePickMethod: () => Promise<GetImageResponseDto>): Promise<void> => {
      const data = await imagePickMethod();
      if (data && data?.download_url) {
         setImage(data);
      }
   };

   const handleShowAlert = () =>
      Alert.alert(
         'Choose image',
         'please select the method',
         [
            {
               text: 'Gallery',
               onPress: () => handlePickImage(onDevice),
               style: 'default'
            },
            {
               text: 'Camera',
               onPress: () => handlePickImage(onCamera),
               style: 'destructive'
            },
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel'
            }
         ],
         { cancelable: true }
      );

   return (
      <View style={{ flex: 1, gap: 20, padding: 20 }}>
         <ScreenBackground />

         {!image ? (
            <ImageBackground
               source={imageSource}
               style={{ width: 'auto', height: 220 }}
               imageStyle={{ width: 'auto', height: '100%', objectFit: 'fill', borderRadius: 10, cursor: 'pointer' }}
            ></ImageBackground>
         ) : (
            <InspirationCard colors={colors} fonts={fonts} item={createCard()} />
         )}

         <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 20 }}>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
               onPress={handleShowAlert}
            >
               <Text style={buttonStyles.text}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
               onPress={() => handlePickImage(getRandomImage)}
            >
               <Text style={buttonStyles.text}>Get a Random Image</Text>
            </TouchableOpacity>
         </View>
         <SafeAreaView>
            <TextInput
               style={{ ...buttonStyles.primary, ...stylesInput.textArea }}
               multiline={true}
               textAlignVertical='top'
               placeholder='Enter your quote here...'
               placeholderTextColor={colors === COLORS_LIGHT ? colors?.FONT_MAIN : colors?.SECONDARY}
               onChangeText={(newText) => setText(newText)}
               value={text}
            />
         </SafeAreaView>
         <TouchableOpacity style={buttonStyles.primary} onPress={() => handleRequestQuote()}>
            <Text style={buttonStyles.text}>Get a Random Quote</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={{ ...buttonStyles.primary, ...buttonStyles.filled, opacity: isNotValid ? 0.5 : 1 }}
            disabled={isNotValid}
            onPress={() => {
               navigation.navigate('BottomTabsNavigator', {
                  screen: 'Dashboard',
                  params: { inspiration: createCard(), fonts: fonts }
               });
            }}
         >
            <Text style={{ ...buttonStyles.text, color: colors?.FONT_INVERSE }}>Save</Text>
         </TouchableOpacity>
      </View>
   );
};

export { AddInspiration };
