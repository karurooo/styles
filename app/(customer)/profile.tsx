import React, { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Container } from "~/components/Container";
import { useRouter } from "expo-router";
import { ProfileItem } from "~/components/ProfileMenuItem";
import profileItems from "~/constants/profileMenuItems";
import ReusableModal from "~/components/Modal";
import MyAccount from "~/components/MyAccount";
import PaymentMethod from "~/components/PaymentMethod";
import { useUserStore } from "~/store/users";
import ProtectedRoute from "~/app/(auth)/protectedRoute";
import { useAuth } from "~/context/AuthContext";
import AlertModal from "~/components/Alert";
import Orders from "~/components/Orders";
import Notifications from "~/components/MyCart";
import Help from "~/components/Help";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MyCart from "~/components/MyCart";

export default function Profile() {
	const router = useRouter();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const userStore = useUserStore();
	const [email, setEmail] = useState(userStore.user?.email ?? "No email");
	const [name, setName] = useState(userStore.user?.first_name ?? "No name");
	const [avatar, setAvatar] = useState<string>(
		userStore.user?.profile_pic ?? "https://via.placeholder.com/150",
	);
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<
		"error" | "confirmation" | "success"
	>("success");

	useEffect(() => {
		if (!userStore.user) {
			userStore.fetchUser(email).then(() => {
				const user = userStore.user;
				if (user) {
					setEmail(user.email);
					setName(user.first_name);
					setAvatar(
						user.profile_pic ??
							require("~/assets/images/profile_pic_placeholder.jpg"),
					);
				}
			});
		}
	}, [userStore, email]);

	const { showAlert } = useAuth();

	const toBack = () => {
		router.back();
	};

	const logout = () => {
		userStore.logout();
	};

	const handleItemPress = (title: string) => {
		if (title === "logout") {
			setAlertMessage("Are you sure you want to logout?");
			setAlertType("confirmation");
			setAlertVisible(true);
			return;
		}
		setModalVisible(true);
		if (title === "My Account") {
			setModalContent(<MyAccount onClose={() => setModalVisible(false)} />);
		}

		if (title === "Help") {
			setModalContent(<Help onClose={() => setModalVisible(false)} />);
		}
	};

	const filteredProfileItems = profileItems.filter(
		(item: any) => item.title === "My Account" || item.title === "Help",
	);

	return (
		<ProtectedRoute>
			<Container>
				<TouchableOpacity
					className="absolute top-3 left-5 justify-center items-center rounded-full h-10 w-10 bg-secondary z-10"
					onPress={toBack}
				>
					<MaterialIcons name="navigate-before" size={24} color="black" />
				</TouchableOpacity>

				<View className="h-1/4 w-3/4  items-center justify-end mt-7">
					<Text className="text-2xl font-Poppins">Profile</Text>
					<View className="my-2 justify-center items-center">
						<Image
							className="h-28 w-28 rounded-full border"
							source={
								userStore.user?.profile_pic
									? { uri: userStore.user.profile_pic }
									: require("~/assets/images/profile_pic_placeholder.jpg")
							}
						/>
						<View className="justify-center w-full ">
							<Text className="text-center">{name}</Text>
							<Text className="text-center">{email}</Text>
						</View>
					</View>
				</View>
				<View className="my-4 h-3/4 w-full">
					<View className="my-2">
						{filteredProfileItems.map((item: any, index: number) => (
							<ProfileItem
								key={index}
								title={item.title}
								onPress={() => handleItemPress(item.title)}
								icon={item.icon}
								className="mt-4"
							/>
						))}
						<TouchableOpacity
							onPress={logout}
							className="mx-6 my-1 flex flex-row items-center justify-between rounded-2xl border bg-white p-3"
						>
							<View className="flex flex-row items-center">
								<View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-secondary">
									<MaterialCommunityIcons
										name="logout"
										size={18}
										color="black"
									/>
								</View>
								<Text className="font-Poppins text-lg text-black">Logout</Text>
							</View>
							<MaterialCommunityIcons
								name="chevron-right"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
					</View>
				</View>
				<ReusableModal
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
				>
					{modalContent}
				</ReusableModal>
				<AlertModal
					isVisible={alertVisible}
					onClose={() => setAlertVisible(false)}
					message={alertMessage}
					type={alertType}
					onConfirm={() => {
						if (alertType === "confirmation") {
							userStore.logout();
							router.push("/signin");
							setAlertVisible(false);
						}
					}}
				/>
			</Container>
		</ProtectedRoute>
	);
}
