import React from 'react';

import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './app/components/navigation';
import { ThemeProvider } from './app/contexts';

export default function App() {
   return (
      <SafeAreaProvider>
         <ThemeProvider>
            <View style={screenStyles.content}>
               <RootNavigator />
            </View>
         </ThemeProvider>
      </SafeAreaProvider>
   );
}

const screenStyles = StyleSheet.create({
   content: {
      maxWidth: 425,
      maxHeight: 915,
      margin: 'auto',
      width: '100%',
      height: '100%',
      minWidth: 0
   }
});
