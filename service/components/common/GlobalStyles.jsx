import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
	<Global
		styles={css`
			@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap");

			:root {
				--white: #ffffff;
				--black: #1c2e35;
				--primary: #1c2e35;
				--shadowgrey: #efefef;
				--bordergrey: #cfcfcf;
			}

			* {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				padding: 0;
				line-height: 1.61;
				font-family: "Montserrat", sans-serif;
				color: var(--black);
				background: var(--white);
				font-size: 1rem;
				position: relative;

				@media screen {
					overflow-x: hidden;
				}
			}
		`}
	/>
);

export default GlobalStyles;
