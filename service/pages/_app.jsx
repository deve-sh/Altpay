import GlobalStyles from "../components/common/GlobalStyles";

function Alt({ Component: Page, pageProps }) {
	return (
		<>
			<GlobalStyles />
			<Page {...pageProps} />
		</>
	);
}

export default Alt;
