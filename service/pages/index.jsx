import Head from "next/head";
import styled from "@emotion/styled";
import Container from "../components/common/Container";
import Image from "../components/common/Image";
import Logo from "../components/common/Logo";

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

const HeaderSection = styled(Container)`
	padding-top: 5rem;
	text-align: center;
	display: flex;
	justify-content: center;
`;

const FirstSection = styled(Container)`
	padding-top: 1.5rem;
	display: flex;
	flex-flow: row;
	align-items: center;
	@media only screen and (max-width: 768px) {
		flex-flow: column-reverse;
	}
`;

const FirstSectionText = styled.div`
	flex: 1;
`;

const FirstSectionDesc = styled.div`
	max-width: 420px;
`;

const FirstSectionHeading = styled.h1`
	font-size: 2rem;
	font-weight: 600;
	&:nth-child(1) {
		margin-bottom: 0;
	}
	&:nth-child(2) {
		margin-top: 0;
	}
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
			<HeaderSection>
				<Logo />
			</HeaderSection>
			<FirstSection>
				<FirstSectionText>
					<FirstSectionHeading>UPI is Amazing!</FirstSectionHeading>
					<FirstSectionHeading>
						Let's Add Flexibility To It!
					</FirstSectionHeading>
					<FirstSectionDesc>
						If you’re a consumer, scan a UPI QR to pay via any mode imaginable.
						<br />
						<br />
						If you’re a merchant, use UPI to accept payments by Card, BNPL and a
						host of other payment methods.
					</FirstSectionDesc>
				</FirstSectionText>
				<FirstSectionImage>
					<Image src="/scanforcoffee.jpg" alt="Scan And Pay" />
				</FirstSectionImage>
			</FirstSection>
		</>
	);
}
