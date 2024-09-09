import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './app/components/navigation';
import { ThemeProvider } from './app/contexts';

export default function App() {
   return (
      <SafeAreaProvider>
         <ThemeProvider>
            <RootNavigator />
         </ThemeProvider>
      </SafeAreaProvider>
   );
}
