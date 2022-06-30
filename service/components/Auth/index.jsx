import styled from "@emotion/styled";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { signInWithGoogle } from "../../api/supabase/auth";

import Button from "../common/Button";
import Image from "../common/Image";
import SlidingModal from "../common/Modal";

const AuthContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
	padding: 1.5rem 5rem;
	gap: 1rem;
`;

const AuthImage = styled.div`
	height: 40vh;
`;

const Authentication = ({ show, closeAuthModal }) => {
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const startGoogleLogin = async () => {
		setIsLoggingIn(true);
		const { error, user } = signInWithGoogle();
		console.log({ error, user });
		setIsLoggingIn(false);
	};

	return (
		<SlidingModal isOpen={show} close={closeAuthModal}>
			<AuthContainer>
				<AuthImage>
					<Image src="/login.svg" />
				</AuthImage>
				<Button onClick={startGoogleLogin} disabled={isLoggingIn}>
					<GoogleIcon />
					&nbsp;&nbsp;Sign In With Google
				</Button>
			</AuthContainer>
		</SlidingModal>
	);
};

export default Authentication;
