import Head from "next/head";
import styled from "@emotion/styled";
import Container from "../components/common/Container";
import Image from "../components/common/Image";

const Circle = styled.div`
	width: 15rem;
	height: 15rem;
	background: var(--primary);
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(-60%, -60%);
`;

const FirstSection = styled(Container)`
	margin-top: 3.5rem;
	display: flex;
	flex-flow: row;
	@media only screen and (max-width: 768px) {
		flex-flow: column-reverse;
	}
`;

const FirstSectionText = styled.div`
	flex: 1;
`;

const FirstSectionImage = styled(FirstSectionText)`
	flex: 1;
`;

export default function Home() {
	return (
		<>
			<Head>
				<title>Alt | Scan and Pay with Anything</title>
			</Head>
			<Circle />
			<FirstSection>
				<FirstSectionText>UPI is Great!</FirstSectionText>
				<FirstSectionImage>
					<Image src="/scanforcoffee.jpg" alt="Scan And Pay" />
				</FirstSectionImage>
			</FirstSection>
		</>
	);
}
