import styled from "@emotion/styled";

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const LogoPrimary = styled.div`
	padding: 0 0.875rem;
	border-radius: 0.25rem;
	border: 0.1rem solid var(--primary);
	font-weight: bolder;
	font-size: 2.25rem;
	font-style: italic;
`;

const LogoText = styled.div`
	margin-left: 0.75rem;
	font-size: 1.5rem;
	font-weight: 600;
`;

const Logo = () => (
	<LogoContainer>
		<LogoPrimary>A</LogoPrimary>
		<LogoText>ALT</LogoText>
	</LogoContainer>
);

export default Logo;
