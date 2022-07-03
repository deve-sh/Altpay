import { useState, useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Image from "../components/common/Image";
import useLoginRedirect from "../hooks/useLoginRedirect";
import request from "../api/supabase/request";

const ProcessInfoContainer = styled.div`
	padding: 1rem;
	display: flex;
	flex-flow: column;
	gap: 1rem;
	width: 100%;
	align-items: center;
`;

const ProcessInfoImageContainer = styled.div`
	height: 40vh;
	margin: 3.5rem auto;
`;

const defaultProcessMessage = {
	status: "processing",
	message: "Initiating Payment. Please wait.",
};

const MakePayment = () => {
	const { query } = useRouter();

	useLoginRedirect();

	const [processInfo, setProcessInfo] = useState(defaultProcessMessage);

	const initializePayment = async () => {
		if (!query.upi_qr_link) return alert("Invalid UPI QR");
		const amountToPay = Number(query.amount);
		if (!amountToPay) return alert("Amount is invalid");

		// Make API call to create a payment order.
		const { data, error: requestError } = await request(
			"/api/create-payment-order",
			{
				upi_qr_link: query.upi_qr_link,
				amount: amountToPay * 100,
				comment: query.payment_comment || "",
			},
			{},
			"post"
		);
		if (requestError)
			return setProcessInfo({ status: "error", message: requestError });
		const paymentOptions = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: data.order.amount,
			currency: data.order.currency,
			name: data.merchant.name || "Alt",
			description: query.payment_comment || "",
			image: data.merchant.image || "/Favicon.png",
			order_id: data.order.id,
			handler: (response) => {
				console.log("Payment Completed: ", response);
				if (
					response.razorpay_order_id &&
					response.razorpay_order_id &&
					response.razorpay_signature
				)
					setProcessInfo({ status: "success", message: "Payment Successful" });
			},
			theme: { color: "#1c2e35" },
		};
		const rzpInstance = new Razorpay(paymentOptions);
		rzpInstance.on("payment.failed", () => {
			setProcessInfo({
				status: "error",
				message: "Payment Failed. Please try again.",
			});
		});
		rzpInstance.open();
	};

	useEffect(() => {
		if (query.upi_qr_link && query.amount) {
			setProcessInfo(defaultProcessMessage);
			initializePayment();
		} else
			setProcessInfo({
				status: "error",
				message: "UPI ID and Amount not found.",
			});
	}, [query]);

	let processImage = "/progress.svg";
	if (processInfo.status === "success") processImage = "/paymentsuccess.svg";
	if (processInfo.status === "error") processImage = "/paymentfailed.svg";

	return (
		<>
			<Head>
				<title>Alt | Make Payment To Merchant</title>
			</Head>
			<ProcessInfoContainer>
				<ProcessInfoImageContainer>
					<Image src={processImage} />
				</ProcessInfoImageContainer>
				{processInfo.message}
			</ProcessInfoContainer>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
		</>
	);
};

export default MakePayment;
