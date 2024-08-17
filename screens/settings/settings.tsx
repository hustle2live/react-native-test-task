import React, { useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenBackground } from '../screen-background/screen-background';

const Settings: React.FC = () => {
   return (
      <View style={{ minWidth: '100%', minHeight: '100%' }}>
         <ScreenBackground />
         <Text>This is a settings component place</Text>
      </View>
   );
};

export { Settings };
