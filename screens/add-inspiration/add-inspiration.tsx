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

type Props = NativeStackScreenProps<RootStackParamList, 'AddInspiration'> & Partial<ThemeScreepProps>;

const AddInspiration: React.FC<Props> = ({ navigation, route, colors }: Props) => {
   // const isLight = colors === COLORS_LIGHT;
   const themeFonts = route?.params?.fonts;
   const imageSource: { uri: string } = { uri: '../../assets/no-image.jpg' };

   const buttonStyles = StyleSheet.create({
      primary: {
         paddingTop: 10,
         paddingBottom: 10,
         borderRadius: 6,
         borderWidth: 1,
         fontSize: 14,
         fontFamily: themeFonts?.LobsterRegular.fontFamily,
         color: colors?.PRIMARY,
         borderColor: colors?.PRIMARY,
         backgroundColor: colors?.APP_BACKGROUND,
         textAlign: 'center',
         alignItems: 'center'
      },
      filled: { backgroundColor: colors?.PRIMARY, color: colors?.FONT_INVERSE },
      halfSize: { flex: 1 },
      fullSize: { width: '100%' },
      text: {
         fontStyle: 'normal',
         color: 'inherit',
         fontFamily: themeFonts?.LobsterRegular.fontFamily
      }
   });

   const stylesInput = StyleSheet.create({
      textArea: {
         height: 84,
         padding: 10,
         textAlign: 'left',
         color: colors?.FONT_MAIN
      }
   });

   const [text, setText] = useState<string>('');

   const showAlert = () =>
      Alert.alert(
         'Choose image',
         'please select the method',
         [
            {
               text: 'Gallery',
               onPress: () => console.log('Ask me later pressed'),
               style: 'default'
            },
            {
               text: 'Camera',
               onPress: () => console.log('Cancel Pressed'),
               style: 'destructive'
            },
            {
               text: 'Cancel',
               onPress: () => console.log('OK Pressed'),
               style: 'cancel'
            }
         ],
         { cancelable: true }
      );

   return (
      <View style={{ flex: 1, gap: 20, padding: 20 }}>
         <ScreenBackground />

         <ImageBackground
            source={imageSource}
            style={{ width: 'auto', height: 200 }}
            imageStyle={{ width: 'auto', height: '100%', objectFit: 'fill', borderRadius: 10, cursor: 'pointer' }}
         ></ImageBackground>

         <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 20 }}>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
               onPress={showAlert}
            >
               <Text style={buttonStyles.text}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={{
                  ...buttonStyles.primary,
                  ...buttonStyles.halfSize
               }}
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
               onChangeText={(newText) => setText(newText)}
               defaultValue={text}
            />
         </SafeAreaView>

         <TouchableOpacity style={buttonStyles.primary}>
            <Text style={buttonStyles.text}>Get a Random Quote</Text>
         </TouchableOpacity>

         <TouchableOpacity style={{ ...buttonStyles.primary, ...buttonStyles.filled }}>
            <Text style={buttonStyles.text}>Save</Text>
         </TouchableOpacity>
      </View>
   );
};

export { AddInspiration };
