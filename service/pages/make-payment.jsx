import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import useLoginRedirect from "../hooks/useLoginRedirect";
import { useEffect } from "react";
import request from "../api/supabase/request";

const MakePayment = () => {
	const { query } = useRouter();

	useLoginRedirect();

	const [error, setError] = useState("");
	const [amount, setAmount] = useState("");
	const [paymentComment, setPaymentComment] = useState("");
	const [processing, setProcessing] = useState(false);

	const initializePayment = useCallback(async () => {
		if (!query.upi_qr_link) return alert("Invalid UPI QR");
		const amountToPay = Number(amount);
		if (!amountToPay) return alert("Amount is invalid");

		// Make API call to create a payment order.
		const { data, error: requestError } = await request(
			"/api/create-payment-order",
			{
				upi_qr_link: query.upi_qr_link,
				amount: amountToPay * 100,
				comment: paymentComment,
			},
			{},
			"post"
		);
		if (requestError) {
			alert(requestError);
			setError(requestError);
		}
		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: data.order.amount,
			currency: data.order.currency,
			name: data.merchant.name || "Alt",
			description: paymentComment,
			image: data.merchant.image || "/Favicon.png",
			order_id: data.order.id,
			handler: (response) => {
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				alert(response.razorpay_signature);
			},
			theme: { color: "#1c2e35" },
		};
		const rzpInstance = new Razorpay(options);
		rzpInstance.on("payment.failed", function (response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});
		rzpInstance.open();
	}, [amount, query]);

	return (
		<>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
		</>
	);
};

export default MakePayment;
