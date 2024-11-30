import React, { useState } from "react";
import { View, Image, Pressable, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "~/utils/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

const ProductImages = ({
	onImageChange,
}: {
	onImageChange: (uri: string) => void;
}) => {
	const [image, setImage] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 6],
			quality: 1,
		});

		if (!result.canceled) {
			const { uri } = result.assets[0];
			setImage(uri);
			await handleImageUpload(uri);
		}
	};

	const handleImageUpload = async (localUri: string) => {
		try {
			setIsUploading(true);
			const fileName = `${Date.now()}-${localUri.split("/").pop()}`;

			// Read the image as a base64 string
			const base64 = await FileSystem.readAsStringAsync(localUri, {
				encoding: "base64",
			});
			const contentType = "image/jpeg"; // Adjust dynamically if needed

			// Upload the image to Supabase Storage
			const { data, error } = await supabase.storage
				.from("product-images")
				.upload(`uploads/${fileName}`, decode(base64), {
					contentType,
				});

			if (error) throw error;

			const publicUrl = supabase.storage
				.from("product-images")
				.getPublicUrl(`uploads/${fileName}`).data.publicUrl;

			setIsUploading(false);
			onImageChange(publicUrl);
		} catch (error) {
			console.error("Error uploading image:", error);
			setIsUploading(false);
		}
	};

	return (
		<View>
			<Pressable
				onPress={pickImage}
				className="flex-row items-center justify-between rounded-xl border bg-secondary py-4 px-3 my-2"
				disabled={isUploading}
			>
				<Text>{isUploading ? "Uploading..." : "Add Product Image"}</Text>
				{isUploading ? (
					<ActivityIndicator size="small" color="#000" />
				) : (
					<AntDesign name="camerao" size={24} color="#000" />
				)}
			</Pressable>
			{image && (
				<Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
			)}
		</View>
	);
};

export default ProductImages;
