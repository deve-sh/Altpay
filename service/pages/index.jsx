import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";
import Container from "../components/common/Container";
import Image from "../components/common/Image";
import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import Social from "../components/common/Social";

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
	padding-top: 4.5rem;
	text-align: center;
	display: flex;
	justify-content: center;
	position: relative;
`;

const SocialSectionContainar = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const FirstSection = styled(Container)`
	padding-top: 1rem;
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

const CTASection = styled(Container)`
	padding: 1.5rem;
	display: flex;
	justify-content: center;
	gap: 1.5rem;

	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

export default function Home({ toggleAuthModal, user }) {
	const { push } = useRouter();

	if (user) push("/dashboard");

	return (
		<>
			<Head>
				<title>Alt | Scan and Pay with Anything</title>
			</Head>
			<Circle />
			<HeaderSection>
				<Logo />
				<SocialSectionContainar>
					<Social />
				</SocialSectionContainar>
			</HeaderSection>
			<FirstSection>
				<FirstSectionText>
					<FirstSectionHeading>UPI Is Amazing!</FirstSectionHeading>
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
			<CTASection>
				<Button onClick={toggleAuthModal}>Become A Customer</Button>
				<Button onClick={toggleAuthModal} variant="secondary">
					Become A Merchant
				</Button>
			</CTASection>
		</>
	);
}
