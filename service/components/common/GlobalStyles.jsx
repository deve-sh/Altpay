import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
	<Global
		styles={css`
			:root {
				--white: #ffffff;
				--black: #1c2e35;
				--primary: #1c2e35;
				--shadowgrey: #efefef;
				--bordergrey: #cfcfcf;
			}
		`}
	/>
);

export default GlobalStyles;
