import Head from "next/head";
import { useState } from "react";
import Authentication from "../components/Auth";
import GlobalStyles from "../components/common/GlobalStyles";

function Alt({ Component: Page, pageProps }) {
	const [showAuth, setShowAuthModal] = useState(false);

	const toggleAuthModal = () => setShowAuthModal((show) => !show);
	const closeAuthModal = () => setShowAuthModal(false);

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<GlobalStyles />
			<Authentication show={showAuth} closeAuthModal={closeAuthModal} />
			<Page {...pageProps} toggleAuthModal={toggleAuthModal} />
		</>
	);
}

export default Alt;
