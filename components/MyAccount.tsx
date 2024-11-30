import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import { Button } from "~/components/Button";
import { useUserStore } from "~/store/users";
import { updateUser } from "~/services/auth/updateUser";
import ImagePickerComponent from "~/components/ImagePicker";
import { useAuth } from "~/context/AuthContext";
import AlertModal from "~/components/Alert";

import ProfileModal from "~/components/Modal";
import InputField from "~/components/InputField";
import { useSellerStore } from "~/store/sellers";
import MapModal from "./Maps";
import Feather from "@expo/vector-icons/Feather";

interface MyAccountProps {
	onClose: () => void;
}

const MyAccount: React.FC<MyAccountProps> = ({ onClose }) => {
	const userStore = useUserStore();
	const { user, fetchUser, setRole, setUser } = userStore;
	const { showAlert } = useAuth();
	const [profilePic, setProfilePic] = useState<string>(
		user?.profile_pic ||
			require("~/assets/images/profile_pic_placeholder.jpg").toString(),
	);
	const [editableUser, setEditableUser] = useState(user);

	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<
		"error" | "confirmation" | "success"
	>("error");
	const [applySellerVisible, setApplySellerVisible] = useState(false);

	const { store_location, setStoreLocation } = useSellerStore();

	const [storeLocation, setStoreLocationState] = useState(store_location);
	const [isMapVisible, setIsMapVisible] = useState(false);

	useEffect(() => {
		if (user?.email) {
			fetchUser(user.email);
		}
	}, [user?.email]);

	useEffect(() => {
		setEditableUser(user);
	}, [user]);

	useEffect(() => {
		setStoreLocationState(store_location);
	}, [store_location]);

	const handleProfilePicChange = (uri: string) => {
		setProfilePic(uri);
	};

	const handleUpdate = async () => {
		if (editableUser) {
			const updatedUser = await updateUser(
				{
					email: editableUser.email!,
					phone_number: editableUser.phone_number,
					address: editableUser.address,
					profile_pic: profilePic,
				},
				setAlertVisible,
				setAlertMessage,
				setAlertType,
			);

			if (updatedUser) {
				if (user) {
					setUser({
						...user,
						first_name: editableUser?.first_name ?? "",
						last_name: editableUser?.last_name ?? "",
						email: editableUser.email!,
						phone_number: editableUser?.phone_number ?? "",
						address: editableUser?.address ?? "",
						role: editableUser?.role ?? "Customer",
						profile_pic: profilePic,
						password: user.password || "",
					});
				}
				setAlertMessage("You have successfully updated your profile.");
				setAlertType("success");
				setAlertVisible(true);
				await fetchUser(editableUser.email!); // Fetch the updated user data
				setEditableUser(userStore.user); // Update the editableUser state
				setTimeout(() => {
					onClose();
				}, 1000);
			}
		}
	};

	const handleSaveLocation = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setStoreLocation(location.address);
		setStoreLocationState(location.address);
		setEditableUser({
			...editableUser,
			address: location.address,
			first_name: editableUser?.first_name || "",
			last_name: editableUser?.last_name || "",
			email: editableUser?.email || "",
			phone_number: editableUser?.phone_number || "",
			role: editableUser?.role || "Customer",
			profile_pic: editableUser?.profile_pic || "",
			password: editableUser?.password || "",
			id: editableUser?.id || "",
		});
		setIsMapVisible(false);
	};

	const inputFields = [
		{
			placeholder: "First Name",
			value: editableUser?.first_name || "",
			key: "first_name",
		},
		{
			placeholder: "Last Name",
			value: editableUser?.last_name || "",
			key: "last_name",
		},
		{ placeholder: "Email", value: editableUser?.email || "", key: "email" },
		{
			placeholder: "Phone",
			value: editableUser?.phone_number || "",
			key: "phone_number",
		},
	];

	return (
		<View className="h-full justify-center">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
				style={{ flex: 1 }}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View className="h-full justify-center items-center">
						<Text className="text-center text-2xl">My Account</Text>
						<View className="h-1/4 rela">
							<Image
								source={{ uri: profilePic }}
								className="w-40 h-40 border rounded-full"
							/>
							<View className="absolute bottom-4 right-3">
								<ImagePickerComponent
									item={{
										name: "profilePic",
										file: "image/jpeg",
										bucket_id: "1",
										owner: "stitch & Style",
										id: "7472b3dd-041c-4279-8f06-edf5a69dd530",
										updated_at: new Date().toISOString(),
										created_at: new Date().toISOString(),
										last_accessed_at: new Date().toISOString(),
										metadata: {},
										buckets: {
											id: "1",
											name: "user-upload",
											owner: "Stitch & Style",
											created_at: new Date().toISOString(),
											updated_at: new Date().toISOString(),
											public: false,
										},
									}}
									userId={editableUser?.email || ""}
									onRemoveImage={() =>
										setProfilePic("/assets/images/profile_pic_placeholder.jpg")
									}
									onImageChange={handleProfilePicChange}
								/>
							</View>
						</View>
						<View className="w-full">
							{editableUser && (
								<>
									{inputFields.map((field) => (
										<InputField
											key={field.key}
											placeholder={field.placeholder}
											value={field.value}
											onChangeText={(text) =>
												setEditableUser({ ...editableUser, [field.key]: text })
											}
										/>
									))}
									<TouchableOpacity
										onPress={() => setIsMapVisible(true)}
										className="rounded-xl border bg-secondary p-4 w-full flex flex-row justify-between items-center my-3"
									>
										<Text numberOfLines={1}>
											{storeLocation
												? storeLocation
												: "Select Address Location"}
										</Text>
										<Feather name="map-pin" size={22} color="#7e7e7e" />
									</TouchableOpacity>
								</>
							)}
						</View>
						<View className="justify-center w-full mb-5">
							<View className="flex flex-row gap-2 items-center justify-between w-full">
								<Text className="text-lg black my-2 font-bold">
									Role: {editableUser?.role || "Customer"}
								</Text>
							</View>

							<Button title="Update" onPress={handleUpdate} />
						</View>

						<AlertModal
							isVisible={alertVisible}
							onClose={() => setAlertVisible(false)}
							message={alertMessage}
							type={alertType}
						/>

						<MapModal
							visible={isMapVisible}
							onClose={() => setIsMapVisible(false)}
							onSaveLocation={handleSaveLocation}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default MyAccount;
