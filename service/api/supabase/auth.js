import supabase from "./index";

export const signInWithGoogle = () =>
	supabase.auth.signIn(
		{
			provider: "google",
		},
		{ redirectTo: window.location.toString() }
	);