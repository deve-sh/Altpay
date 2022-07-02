import { useDebugValue, useEffect } from "react";
import cookie from "js-cookie";
import supabase from "../api/supabase";
import useUserAuth from "../stores/auth";

const useAuthState = () => {
	const { user, setUser } = useUserAuth();

	useEffect(() => {
		if (window.setAuthListener) return;
		window.setAuthListener = true;

		supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN") {
				setUser(session.user);
				cookie.set("access_token", session.access_token);
				cookie.set("refresh_token", session.refresh_token);
				cookie.set("user_id", session.user.id);
				cookie.set("provider_token", session.provider_token);
			} else if (event === "SIGNED_OUT") {
				setUser(null);
				cookie.remove("access_token");
				cookie.remove("refresh_token");
				cookie.remove("user_id");
				cookie.remove("provider_token");
			}
		});

		const accessTokenFromPreviousSession = cookie.get("access_token");
		if (accessTokenFromPreviousSession)
			supabase.auth.setAuth(accessTokenFromPreviousSession);
	}, []);

	useDebugValue({ user });

	return user;
};

export default useAuthState;
