import { Text, View } from 'react-native';
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
