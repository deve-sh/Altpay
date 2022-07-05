import supabase from "../../api/supabase/adminClient";
import isValidRazorpayPayment from "../../utils/isValidRazorpayPayment";
import razorpay from "../../utils/razorpay";

export default async function razorpayWebhook(req, res) {
	try {
		res.sendStatus(200);

		if (
			req.method !== "POST" ||
			!req.body ||
			!req.body.event ||
			!req.body.payload ||
			!req.body.payload.payment
		)
			return "Invalid Payload";

		if (
			!req.headers["x-razorpay-signature"] ||
			!req.headers["x-razorpay-event-id"]
		)
			return "Unauthorized!";

		const paymentEvent = req.body.event;
		const paymentInfo = req.body.payload.payment.entity;
		let isPaymentValid = await isValidRazorpayPayment(paymentInfo.id);
		if (!isPaymentValid) return "Invalid Payment.";

		if (paymentEvent === "payment.captured") {
			// Captured payment from Razorpay Dashboard automatically.
			// https://razorpay.com/docs/payments/payments/capture-settings/#auto-capture-all-payments

			// Check order details
			const order = await razorpay.orders.fetch(paymentInfo.order_id);
			const { notes: { merchant, upi_id } = {} } = order || {};

			if (!merchant || !upi_id) return "Invalid Order";

			const [
				{ error: transactionFetchingError, data: transactionData },
				{ error: merchantFetchingError, data: merchantData },
			] = await Promise.all([
				supabase
					.from("transactions")
					.select()
					.eq("order_id", paymentInfo.order_id)
					.single(),
				supabase.from("merchants").select().eq("id", merchant).single(),
			]);
			if (
				transactionFetchingError ||
				merchantFetchingError ||
				merchantData.razorpay_route_id
			)
				return "Invalid Transaction or Merchant";

			// Transfer to merchant via Razorpay Route
			const amountToTransfer =
				paymentInfo.amount -
				paymentInfo.fee -
				paymentInfo.tax -
				(1 / 100) * paymentInfo.amount; // Take 1% commission
			await razorpay.payments.transfer(paymentInfo.id, {
				account: merchantData.razorpay_route_id,
				amount: amountToTransfer,
				currency: "INR",
			});
		}
	} catch (err) {
		console.log("Razorpay Webhook Error: ", err);
		return;
	}
}
