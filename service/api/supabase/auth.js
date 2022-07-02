import supabase from "./index";

export const signInWithGoogle = () =>
	supabase.auth.signIn(
		{
			provider: "google",
		},
		{ redirectTo: window.location.toString() }
	);

export const verifyAccessToken = (accessToken) =>
	supabase.auth.api.getUser(accessToken);
