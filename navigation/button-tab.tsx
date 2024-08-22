import { Ionicons } from '@expo/vector-icons';
import { FontStyleType } from '../contexts/theme-context';

type TProps = {
   props: {
      focused?: boolean;
      color?: string;
      size?: number;
      name?: any;
      primaryColor?: string;
      secondaryColor?: string;
      themeFonts?: FontStyleType;
   };
};

const TabButton = ({ props }: TProps) => {
   const { name, focused, primaryColor, secondaryColor, size } = props;
   return <Ionicons name={name} size={size} color={!focused ? secondaryColor : primaryColor} />;
};

export { TabButton };
