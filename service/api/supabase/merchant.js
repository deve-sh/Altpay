import supabase from "./index";

export const getMerchant = (merchantId) =>
	supabase.from("merchants").select().eq("id", merchantId).single();

export const getMerchantQRInfo = (qrLink, merchantId) => {
	try {
		const upiIdFromQRLink = new URLSearchParams(
			new URL(qrLink.replace("upi://", "https://")).search
		).get("pa");
		return supabase
			.from("merchant_upi_ids_and_qrs")
			.select()
			.eq("upi_id", upiIdFromQRLink)
			.single();
	} catch (err) {
		return { data: null, error: err.message };
	}
};