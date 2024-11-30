import { Link, Tabs } from "expo-router";
import { HeaderButton } from "~/components/HeaderButton";
import { TabBarIcon } from "~/components/TabBarIcon";

export default function CustomerLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#00",
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#D9D9D9",
					borderTopWidth: 1,
					borderTopColor: "#000",
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="myCart"
				options={{
					title: "My Cart",
					tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: "Orders",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="receipt" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
				}}
			/>
		</Tabs>
	);
}
