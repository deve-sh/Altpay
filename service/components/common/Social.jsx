import styled from "@emotion/styled";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const SocialContainer = styled.div`
	display: flex;
	gap: 0.75rem;
`;

const Social = ({ size = "medium" }) => {
	return (
		<SocialContainer>
			<a href="#" target="_blank" rel="noopener noreferer">
				<InstagramIcon fontSize={size} />
			</a>
			<a href="#" target="_blank" rel="noopener noreferer">
				<TwitterIcon fontSize={size} />
			</a>
		</SocialContainer>
	);
};

export default Social;
