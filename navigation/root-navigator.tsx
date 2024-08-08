import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BottomTabsNavigator } from "./bottom-tabs-navigator";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	return (
		<>
			<StatusBar />
			<NavigationContainer>
				<>
					{/* Replace with navigator */}
				</>
			</NavigationContainer>
		</>
	);
};

export { RootNavigator };
