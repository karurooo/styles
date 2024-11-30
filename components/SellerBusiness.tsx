import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useUserStore } from "~/store/users";
import { useSellerStore } from "~/store/sellers";
import MapModal from "~/components/Maps";
import { Button } from "./Button";
import AlertModal from "~/components/Alert";
import InputField from "~/components/InputField";
import { saveSeller, updateSeller, fetchSeller } from "~/services/auth/seller";
import { handleError } from "~/utils/handleError";

interface ApplySellerProps {
	onClose: () => void;
}

const ApplySeller: React.FC<ApplySellerProps> = ({ onClose }) => {
	const { user } = useUserStore();
	const {
		store_name,
		setStoreName,
		store_description,
		setStoreDescription,
		store_location,
		setStoreLocation,
	} = useSellerStore();

	const userStore = useUserStore();

	// Initialize local states only once
	const [businessName, setBusinessName] = useState(store_name);
	const [businessDescription, setBusinessDescription] =
		useState(store_description);
	const [storeLocation, setStoreLocationState] = useState(store_location);

	const [isMapVisible, setIsMapVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isNewSeller, setIsNewSeller] = useState(true);
	const [alertType, setAlertType] = useState<
		"error" | "confirmation" | "success"
	>("error");

	useEffect(() => {
		const checkSellerStatus = async () => {
			try {
				const sellerData = await fetchSeller(userStore.id);
				setIsNewSeller(!sellerData);
			} catch (error) {
				handleError(error, setAlertMessage, setAlertVisible);
			}
		};

		checkSellerStatus();
	}, [userStore.id]);

	const handleSaveLocation = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setStoreLocation(location.address); // Update global state
		setStoreLocationState(location.address); // Update local state
		setIsMapVisible(false);
	};

	const validateForm = () => {
		if (!businessName.trim()) return "Business name is required.";
		if (!businessDescription.trim()) return "Business description is required.";
		if (!storeLocation.trim()) return "Business location is required.";
		return null;
	};

	const saveSellerData = async (sellerData: any) => {
		await saveSeller(sellerData, userStore.id);
	};

	const updateSellerData = async (sellerData: any) => {
		await updateSeller(sellerData, userStore.id);
	};

	const handleSubmit = async () => {
		const errorMessage = validateForm();
		if (errorMessage) {
			setAlertMessage(errorMessage);
			setAlertType("error");
			setAlertVisible(true);
			return;
		}

		setStoreName(businessName); // Update global state
		setStoreDescription(businessDescription);
		setStoreLocation(storeLocation);

		const sellerData = {
			user_id: userStore.id,
			store_name: businessName,
			store_description: businessDescription,
			store_location: storeLocation,
			store_rating: 0,
		};

		try {
			if (isNewSeller) {
				await saveSellerData(sellerData);
			} else {
				await updateSellerData(sellerData);
			}
			setAlertMessage("Seller data saved successfully!");
			setAlertType("success");
			setAlertVisible(true);
		} catch (error) {
			handleError(error, setAlertMessage, setAlertVisible);
		}

		onClose();
	};

	const businessInfoFields = [
		{
			placeholder: "Enter Store Name",
			value: businessName,
			onChangeText: setBusinessName,
			required: true,
		},
		{
			placeholder: "Enter Store Description",
			value: businessDescription,
			onChangeText: setBusinessDescription,
			required: true,
		},
	];

	return (
		<View className="h-full w-full">
			<Text className="text-3xl font-bold my-2">Store Profile</Text>
			{businessInfoFields.map((field, index) => (
				<InputField
					key={index}
					placeholder={field.placeholder}
					value={field.value}
					onChangeText={field.onChangeText}
				/>
			))}

			<TouchableOpacity
				onPress={() => setIsMapVisible(true)}
				className="rounded-xl border bg-secondary p-4 w-full flex flex-row justify-between items-center my-3"
			>
				<Text numberOfLines={1}>
					{storeLocation ? storeLocation : "Select Shop Location"}
				</Text>
				<Feather name="map-pin" size={22} color="#7e7e7e" />
			</TouchableOpacity>
			<MapModal
				visible={isMapVisible}
				onClose={() => setIsMapVisible(false)}
				onSaveLocation={handleSaveLocation}
			/>
			<Button title={isNewSeller ? "Save" : "Update"} onPress={handleSubmit} />
			<AlertModal
				isVisible={alertVisible}
				onClose={() => setAlertVisible(false)}
				message={alertMessage}
				type={alertType}
			/>
		</View>
	);
};

export default ApplySeller;
