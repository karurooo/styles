import { Stack } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "~/store/users";

export default function Layout() {
	const checkSession = useUserStore((state) => state.checkSession);

	useEffect(() => {
		checkSession();
	}, []);

	return <Stack screenOptions={{ headerShown: false }} />;
}
