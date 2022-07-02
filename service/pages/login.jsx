import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useAuthState from "../hooks/useAuthState";

const Login = ({ authModalHandlers: { openAuthModal, closeAuthModal } }) => {
	const { query, push } = useRouter();
	const user = useAuthState();

	useEffect(() => {
		if (user) {
			closeAuthModal();
			if (query.redirect) push(query.redirect);
		}
		if (!user) openAuthModal();
	}, [user, query]);

	return (
		<Head>
			<title>Alt | Login</title>
		</Head>
	);
};

export default Login;
