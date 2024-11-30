import { Link, Tabs } from "expo-router";
import { HeaderButton } from "~/components/HeaderButton";
import { TabBarIcon } from "~/components/TabBarIcon";

export default function SellerLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#00",
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#D9D9D9",
				},
			}}
		>
			<Tabs.Screen
				name="sellerHome"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="myProducts"
				options={{
					title: "My Products",
					tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="sellerProfile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
				}}
			/>
		</Tabs>
	);
}
