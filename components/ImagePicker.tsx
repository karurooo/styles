import React, { useEffect, useState } from "react";
import {
	Button,
	Image,
	Pressable,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserStore } from "~/store/users";
import { supabase } from "~/utils/supabase";
import { useAuth } from "~/context/AuthContext";
import { handleError } from "~/utils/handleError";
import { FileObject as SupabaseFileObject } from "@supabase/storage-js";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export type { FileObject };

interface FileObject extends SupabaseFileObject {
	name: string;
	file?: string; // Make file optional
	bucket_id: string;
	owner: string;
	id: string;
	updated_at: string;
	created_at: string;
	last_accessed_at: string;
	size?: number; // Add size here
}

const ImagePickerComponent = ({
	item,
	userId,
	onRemoveImage,
	onImageChange, // Add onImageChange prop
}: {
	item?: FileObject; // Make item optional
	userId?: string; // Make userId optional
	onRemoveImage?: () => void; // Make onRemoveImage optional
	onImageChange: (uri: string) => void; // Define onImageChange prop type
}) => {
	const userStore = useUserStore();
	const profile_pic = userStore.user?.profile_pic;
	const [files, setFiles] = useState<FileObject[]>([]);
	const [image, setImage] = useState<string | null>(null);
	const { user } = useAuth();
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<
		"error" | "confirmation" | "success"
	>("confirmation");

	useEffect(() => {
		if (item && userId) {
			supabase.storage
				.from("files")
				.download(`${userId}/${item.name}`)
				.then(({ data }) => {
					const fr = new FileReader();
					fr.readAsDataURL(data!);
					fr.onload = () => {
						setImage(fr.result as string);
					};
				});
		}
	}, [item, userId]);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			const { uri } = result.assets[0];
			setImage(uri);
			onImageChange(uri); // Call onImageChange with the selected image URI
			if (userId) {
				// Ensure userId is defined
				try {
					await uploadImageToSupabase(userId, uri);
				} catch (error) {
					handleError(error, setAlertMessage, setAlertVisible);
				}
			}
		}
	};

	const uploadImageToSupabase = async (userId: string, uri: string) => {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: "base64",
		});
		const filePath = `${userId}/${new Date().getTime()}.png`;
		await supabase.storage
			.from("files")
			.upload(filePath, decode(base64), { contentType: "image/png" });
		loadImages();
	};

	useEffect(() => {
		if (!user) return;

		// Load user images
		loadImages();
	}, [user]);

	const loadImages = async () => {
		const { data } = await supabase.storage.from("files").list(user!.id);
		if (data) {
			setFiles(data);
		}
	};

	return (
		<Pressable
			className="items-center justify-center w-10 h-10 border  bg-white rounded-full"
			onPress={pickImage}
		>
			<AntDesign name="camerao" size={20} color="#000" />
		</Pressable>
	);
};

export default ImagePickerComponent;
