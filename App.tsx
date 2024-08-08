import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation";
import { ThemeProvider } from "./contexts";

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<RootNavigator />
			</ThemeProvider>
		</SafeAreaProvider>
	);
}

