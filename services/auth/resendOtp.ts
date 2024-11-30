import { supabase } from "~/utils/supabase";

export const resendOtp = async (email: string): Promise<string | null> => {
	try {
		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) {
			return error.message;
		}
		return null;
	} catch (error) {
		return (error as Error).message;
	}
};
