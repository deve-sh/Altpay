import Head from "next/head";
import { useState } from "react";
import Authentication from "../components/Auth";
import GlobalStyles from "../components/common/GlobalStyles";
import useAuthState from "../hooks/useAuthState";

function Alt({ Component: Page, pageProps }) {
	const [showAuth, setShowAuthModal] = useState(false);

	const toggleAuthModal = () => setShowAuthModal((show) => !show);
	const closeAuthModal = () => setShowAuthModal(false);

	const user = useAuthState();

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<GlobalStyles />
			<Authentication show={showAuth} closeAuthModal={closeAuthModal} />
			<Page {...pageProps} user={user} toggleAuthModal={toggleAuthModal} />
		</>
	);
}

export default Alt;
