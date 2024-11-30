import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useUserStore } from "~/store/users";
import AlertModal from "~/components/Alert";
import { Session, User } from "@supabase/supabase-js"; // Import from Supabase
import { supabase } from "~/utils/supabase"; // Import Supabase instance

interface AuthContextType {
	isAuthenticated: boolean;
	checkAuth: () => Promise<void>;
	showAlert: (
		message: string,
		type: "error" | "confirmation" | "success",
	) => void;
	user: User | null; // Update user type
	session: Session | null; // Add session state
	signOut: () => void; // Add signOut method
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<
		"error" | "confirmation" | "success"
	>("error");
	const [user, setUser] = useState<User | null>(null); // Manage user state
	const [session, setSession] = useState<Session | null>(null); // Manage session state
	const isAuthenticated = useUserStore((state) => state.isAuthenticated);
	const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);

	const checkAuth = async () => {
		const { data } = await supabase.auth.getSession();
		setSession(data.session);
		setUser(data.session ? data.session.user : null);
		setIsAuthenticated(!!data.session);
	};

	const showAlert = (
		message: string,
		type: "error" | "confirmation" | "success",
	) => {
		setAlertMessage(message);
		setAlertType(type);
		setAlertVisible(true);
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
		setIsAuthenticated(false);
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
			setUser(session ? session.user : null);
			setIsAuthenticated(!!session);
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, checkAuth, showAlert, user, session, signOut }}
		>
			{children}
			<AlertModal
				isVisible={alertVisible}
				onClose={() => setAlertVisible(false)}
				message={alertMessage}
				type={alertType}
			/>
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
