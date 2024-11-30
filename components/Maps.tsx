import "react-native-get-random-values";
import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
	GooglePlacesAutocomplete,
	GooglePlaceData,
	GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import {
	KeyboardAvoidingView,
	Platform,
	View,
	Text,
	Modal,
	TouchableOpacity,
} from "react-native";
import { Button } from "~/components/Button";
import { Ionicons } from "@expo/vector-icons";
import ReusableModal from "./Modal";
// import DarkMap from "~/utils/DarkMap.json";

interface MapModalProps {
	visible: boolean;
	onClose: () => void;
	onSaveLocation: (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

const MapModal: React.FC<MapModalProps> = ({
	visible,
	onClose,
	onSaveLocation,
}) => {
	const [region, setRegion] = useState({
		latitude: 8.957444614702366,
		longitude: 125.5974308881921,
		latitudeDelta: 0.00922,
		longitudeDelta: 0.00421,
	});

	const [markerPosition, setMarkerPosition] = useState({
		latitude: 8.957637354861722,
		longitude: 125.59747501164318,
	});

	const [address, setAddress] = useState("");
	const [searchKey, setSearchKey] = useState(0);
	const [selectedLocation, setSelectedLocation] = useState(""); // Add this line

	const mapRef = useRef<MapView>(null);

	const confirmLocation = () => {
		const { latitude, longitude } = markerPosition;
		onSaveLocation({ latitude, longitude, address });
		onClose();
	};

	const handleLocationSelect = (
		data: GooglePlaceData,
		details: GooglePlaceDetail | null,
	) => {
		if (details) {
			const { lat, lng } = details.geometry.location;
			const newRegion = {
				latitude: lat,
				longitude: lng,
				latitudeDelta: 0.00922,
				longitudeDelta: 0.001421,
			};

			setRegion(newRegion);
			setMarkerPosition({ latitude: lat, longitude: lng });
			setAddress(data.description);
			setSelectedLocation(data.description); // Add this line
			mapRef.current?.animateToRegion(newRegion, 1000);
			setSearchKey((prevKey) => prevKey + 1); // Update the search key
		}
	};

	const handleMapPress = (e: any) => {
		const { latitude, longitude } = e.nativeEvent.coordinate;
		setMarkerPosition({ latitude, longitude });
		setRegion((prevRegion) => ({
			...prevRegion,
			latitude,
			longitude,
		}));
		setAddress("Selected location");
	};

	return (
		<ReusableModal visible={visible} onClose={onClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{ flex: 1 }}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
			>
				<View className=" flex-1 gap-2">
					<View className="mb-2 " style={{ zIndex: 1 }}>
						<GooglePlacesAutocomplete
							key={searchKey} // Add this line
							placeholder={selectedLocation || "Enter a location"} // Modify this line
							fetchDetails={true}
							onPress={handleLocationSelect}
							query={{
								key: "AIzaSyBjtmDVXlr-dx1p_SoWhjZdiALKPwx6wyE",
								language: "en",
								components: "country:ph",
							}}
							textInputProps={{
								placeholderTextColor: "#fff",
								returnKeyType: "search",
							}}
							styles={{
								container: { flex: 0, position: "relative" },
								textInputContainer: {
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: "#3e3e3e",
								},
								textInput: {
									height: 40,
									paddingTop: 10,
									color: "#ffffff",
									backgroundColor: "#3e3e3e",
									fontSize: 15,
									flex: 1,
								},
							}}
							renderLeftButton={() => (
								<Ionicons
									name="location-outline"
									size={24}
									color="white"
									style={{ marginLeft: 10 }}
								/>
							)}
						/>
					</View>
					<View className="flex-1 overflow-hidden rounded-lg border">
						<MapView
							ref={mapRef}
							provider={PROVIDER_GOOGLE}
							style={{ flex: 1 }}
							region={region}
							onPress={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
						>
							<Marker coordinate={markerPosition} title="Selected Location" />
						</MapView>
					</View>
					<Button title="Confirm Location" onPress={confirmLocation} />
					<TouchableOpacity onPress={onClose} className="mt-2">
						<Text className="text-center text-red-500">Cancel</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</ReusableModal>
	);
};

export default MapModal;
