import React, { useState, useEffect } from "react";
import { Container } from "~/components/Container";
import {
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Image,
} from "react-native";
import ImagePickerComponent from "~/components/ImagePicker";
import ProductImages from "~/components/ProductImages";
import { useSellerStore } from "~/store/sellers";
import { Button } from "~/components/Button";
import ReusableModal from "~/components/Modal";
import InputField from "~/components/InputField";
import { useProductStore } from "~/store/products";
import { ProductForm } from "~/constants/products";
import AlertModal from "~/components/Alert";
import { handleError } from "~/utils/handleError";
import { reload } from "expo-router/build/global-state/routing";
import Product from "~/components/Products";
import ApplySeller from "~/components/SellerBusiness"; // Import ApplySeller component
import { signIn } from "~/services/auth/signin"; // Import signIn function
import { useUserStore } from "~/store/users";
import { isNewUser } from "~/services/auth/fetchUsers";

export default function SellerHome() {
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [showApplySellerModal, setShowApplySellerModal] = useState(false); // State for ApplySeller modal
	const [showError, setShowError] = useState(false); // Define setShowError

	useEffect(() => {
		const checkNewSeller = async () => {
			const userStore = useUserStore.getState();
			const userData = userStore.user;
			if (userData && userData.role === "seller") {
				const newUser = await isNewUser(userData.email); // Use email instead of id
				if (newUser) {
					setShowApplySellerModal(true);
				}
			}
		};

		checkNewSeller();
	}, []);

	return (
		<Container>
			<View className="justify-center w-full h-full">
				<Text className="text-2xl font-bold text-center mb-6 font-Poppins">
					Seller Home
				</Text>
			</View>
			<AlertModal
				isVisible={alertVisible}
				onClose={() => setAlertVisible(false)}
				message={alertMessage}
				type="error"
			/>
			<ReusableModal
				visible={showApplySellerModal}
				onClose={() => setShowApplySellerModal(false)}
			>
				<ApplySeller onClose={() => setShowApplySellerModal(false)} />
			</ReusableModal>
		</Container>
	);
}
