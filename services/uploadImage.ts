import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "~/utils/supabase";

export const uploadImageToSupabase = async (userId: string, uri: string) => {
	const base64 = await FileSystem.readAsStringAsync(uri, {
		encoding: "base64",
	});
	const filePath = `${userId}/${new Date().getTime()}.png`;
	await supabase.storage
		.from("files")
		.upload(filePath, decode(base64), { contentType: "image/png" });
};
