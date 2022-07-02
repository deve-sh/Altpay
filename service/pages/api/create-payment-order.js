import { verifyAccessToken } from "../../api/supabase/auth";
import { getMerchant, getMerchantQRInfo } from "../../api/supabase/merchant";
import razorpay from "../../utils/razorpay";

export default async function createWalletAddMoneyTransaction(req, res) {
	const error = (status, message) =>
		res.status(status).json({
			error: message,
			message,
		});

	try {
		const { amount, upi_qr_link = "", comment = "" } = req.body; // amount -> Paise
		const { access_token } = req.cookies;

		if (!access_token || !amount || !merchant || !upi_qr_link)
			return error(400, "Invalid information.");

		// Get user details from token.
		const { user, error } = await verifyAccessToken(access_token);
		if (!user || !user.id || error) return error(401, "Unauthorized");

		// Verify QR Link being used.
		const { data: qrCodeInfo, error: qrFetchingInfo } = await getMerchantQRInfo(
			upi_qr_link
		);
		if (!qrCodeInfo || !qrCodeInfo.merchant_id || qrFetchingInfo)
			return error(
				404,
				"Merchant hasn't registered this UPI ID yet. Please pay via UPI directly for now."
			);

		// Verify merchant
		const { data: merchantData, error: merchantFetchingError } =
			await getMerchant(qrCodeInfo.merchant_id);
		if (!merchantData || merchantFetchingError)
			return error(404, "Merchant not found");

		const isMerchantVerified = merchantData.is_verified;
		if (!isMerchantVerified) return error(400, "Merchant is not verified yet.");

		const order = await razorpay.orders.create({
			amount,
			currency: "INR",
			notes: {
				user: user.id,
				merchant,
				upi_qr_link,
				upi_id: qrCodeInfo.upi_id,
				comment,
			},
		});

		if (order) {
			return res.status(201).json({
				message: "Created Order Successfully",
				merchant: merchantData,
				order,
			});
		}
		return error(500, "Order could not be created.");
	} catch (err) {
		console.log(err);
		return error(500, err.message);
	}
}
