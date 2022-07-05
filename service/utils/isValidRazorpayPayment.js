import razorpay from "./razorpay";

const isValidRazorpayPayment = async (paymentId) => {
	try {
		const paymentDetails = await razorpay.payments.fetch(paymentId);
		if (!paymentDetails) throw new Error("Payment not found.");

		const currentSeconds = new Date().getTime() / 1000;

		if (
			!paymentDetails.created_at ||
			Math.abs(currentSeconds - paymentDetails.created_at) > 24 * 60 * 60
		) {
			// If the payment is over 24 hours old.
			return false;
		}

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export default isValidRazorpayPayment;
