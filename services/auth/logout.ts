import { supabase } from "~/utils/supabase";
import { useUserStore } from "~/store/users";

export const logout = async (
	setShowError: (show: boolean) => void,
	setErrorMessage: (message: string) => void,
) => {
	try {
		await supabase.auth.signOut();
		const userStore = useUserStore.getState();
		userStore.resetUser();
	} catch (error) {
		const errorMessage = (error as Error).message;
		setErrorMessage(errorMessage);
		setShowError(true);
		console.error("Error logging out:", error);
	}
};
