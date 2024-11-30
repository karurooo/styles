import "react-native-get-random-values";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { AuthProvider } from "~/context/AuthContext"; // Import AuthProvider
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useUserStore } from "~/store/users";
import "react-native-reanimated";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
	});

	const checkSession = useUserStore((state) => state.checkSession);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
		checkSession();
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
