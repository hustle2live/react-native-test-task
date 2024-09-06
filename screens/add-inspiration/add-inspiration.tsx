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

import { RootStackParamList } from '../../types/navigation.type';
import { ScreenBackground } from '../screen-background/screen-background';
import { ThemeScreepProps } from '../../types/props-styles.type';
import { COLORS_LIGHT } from '../../constants';

import { launchCamera, pickImage } from '../../services/localImagePicker';
import { getRandomImage } from '../../services/getRandomImage';
import { GetImageResponseDto, GetQuoteResponseDto } from '../../types';
import { Loader } from '../../loader/loader';
import { getRandomQuote } from '../../services/getRandomQuote';
import { InspirationStore } from '../../store/inspirations';
import { ROUTE_NAME } from '../../enums';
import { InspirationCard } from '../../components/inspiration-card/inspiration-card';

type Props = NativeStackScreenProps<RootStackParamList, 'AddInspiration'> & Partial<ThemeScreepProps>;

const handlePickImage = async (
   imagePickMethod: () => Promise<GetImageResponseDto>,
   setImage: (e: GetImageResponseDto) => void
): Promise<void> => {
   const data = await imagePickMethod();
   if (data && data?.download_url) {
      setImage(data);
   }
};

const handleGetQuote = async (
   quotePickCallback: () => Promise<GetQuoteResponseDto>,
   setQuote: (x: string) => void
): Promise<GetQuoteResponseDto | null> => {
   const data = await quotePickCallback();
   if (data && data?.quoteText) {
      setQuote(data?.quoteText);
      return data;
   }
   return null;
};

const showAlert = (setImageHandler: (e: GetImageResponseDto) => void) =>
   Alert.alert(
      'Choose image',
      'please select the method',
      [
         {
            text: 'Gallery',
            onPress: () => handlePickImage(pickImage, setImageHandler),
            style: 'default'
         },
         {
            text: 'Camera',
            onPress: () => handlePickImage(launchCamera, setImageHandler),
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

const AddInspiration: React.FC<Props> = ({ navigation, route, colors }: Props) => {
   const themeFonts = route?.params?.fonts;
   const noImageBlueprint = require('../../assets/no-image.jpg');

   const [text, setText] = useState<string>('');
   const [image, setImage] = useState<GetImageResponseDto | null>(null);
   const [qoute, setQoute] = useState<GetQuoteResponseDto | null>(null);

   const buttonStyles = StyleSheet.create({
      primary: {
         paddingTop: 10,
         paddingBottom: 10,
         borderRadius: 6,
         borderWidth: 1,
         fontSize: 14,
         fontFamily: themeFonts?.LOBSTER_REGULAR.fontFamily,
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
         fontFamily: themeFonts?.LOBSTER_REGULAR.fontFamily,
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

   const handleCreateinspiration = () => {
      const newCard = createCard();
      InspirationStore.add(newCard);
      navigation.navigate(ROUTE_NAME.BOTTOM_TABS_NAVIGATOR);
   };

   return (
      <View style={{ flex: 1, gap: 20, padding: 20 }}>
         <ScreenBackground />

         {!image ? (
            <ImageBackground
               source={imageSource}
               style={{ width: 'auto', height: 200 }}
               imageStyle={{ width: 'auto', height: '100%', objectFit: 'fill', borderRadius: 10, cursor: 'pointer' }}
            ></ImageBackground>
         ) : (
            <InspirationCard colors={colors} fonts={themeFonts} item={createCard()} />
         )}

         <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 20 }}>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
               onPress={() => showAlert(setImage)}
            >
               <Text style={buttonStyles.text}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
               onPress={() => handlePickImage(getRandomImage, setImage)}
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

         <TouchableOpacity
            style={buttonStyles.primary}
            onPress={async () => {
               const newQuote = await handleGetQuote(getRandomQuote, setText);
               if (newQuote) {
                  setQoute(newQuote);
                  setText(newQuote.quoteText);
               }
            }}
         >
            <Text style={buttonStyles.text}>Get a Random Quote</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={{ ...buttonStyles.primary, ...buttonStyles.filled }}
            disabled={isNotValid}
            onPress={() => {
               handleCreateinspiration();
            }}
         >
            <Text style={{ ...buttonStyles.text, color: colors?.FONT_INVERSE }}>Save</Text>
         </TouchableOpacity>
      </View>
   );
};

export { AddInspiration };
