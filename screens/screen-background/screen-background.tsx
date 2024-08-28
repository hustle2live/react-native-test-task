import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../../hooks';

const ScreenBackground = () => {
   const imageSource: { uri: string } = { uri: '../../assets/leaf.png' };
   // const imageSource: { uri: string } = { uri: 'C:GitHub_hustle2live\react-native-test-taskassetsleaf.png' };

   const theme = useTheme();
   const bgColor = theme?.theme.APP_BACKGROUND;

   return (
      <View style={{ ...styles.container, backgroundColor: bgColor }}>
         <ImageBackground source={imageSource} imageStyle={styles.imageStyle} style={styles.style} />
         <ImageBackground
            source={imageSource}
            imageStyle={styles.imageStyle}
            style={{
               ...styles.style,
               alignSelf: 'flex-end',
               transform: [{ rotate: '0deg' }]
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      minWidth: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 10,
      paddingBottom: 0
   },
   style: {
      maxHeight: '50%',
      width: 150,
      height: 150,
      transform: [{ rotate: '180deg' }]
   },
   imageStyle: {
      width: '100%',
      height: '100%',
      transform: [{ scaleX: 1.15 }]
   }
});

export { ScreenBackground };
