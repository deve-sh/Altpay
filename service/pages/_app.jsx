import Head from "next/head";
import { useState } from "react";
import Authentication from "../components/Auth";
import GlobalStylesWrapper from "../components/common/GlobalStyles";
import useAuthState from "../hooks/useAuthState";

function Alt({ Component: Page, pageProps }) {
	const [showAuth, setShowAuthModal] = useState(false);

	const toggleAuthModal = () => setShowAuthModal((show) => !show);
	const closeAuthModal = () => setShowAuthModal(false);
	const openAuthModal = () => setShowAuthModal(true);

	const user = useAuthState();

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<GlobalStylesWrapper>
				<Authentication show={showAuth} closeAuthModal={closeAuthModal} />
				<Page
					{...pageProps}
					user={user}
					authModalHandlers={{ toggleAuthModal, openAuthModal, closeAuthModal }}
				/>
			</GlobalStylesWrapper>
		</>
	);
}

export default Alt;
