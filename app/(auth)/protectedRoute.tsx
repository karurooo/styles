import React from "react";
import { useAuth, AuthProvider } from "~/context/AuthContext"; // Import AuthProvider
import { useRouter } from "expo-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			router.push("/signin");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return null; // or a loading spinner
	}

	return <AuthProvider>{children}</AuthProvider>;
};

export default ProtectedRoute;
