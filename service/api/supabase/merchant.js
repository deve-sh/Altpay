import supabase from "./index";
import supabaseServiceAdmin from "./adminClient";
import getUPIIdFromQRLink from "../../utils/getUPIIdFromQRLink";

export const getMerchant = (merchantId) =>
	supabase.from("merchants").select().eq("id", merchantId).single();

export const getMerchantQRInfo = (qrLink) => {
	try {
		const upiIdFromQRLink = getUPIIdFromQRLink(qrLink);
		return supabase
			.from("merchant_upi_ids_and_qrs")
			.select()
			.eq("upi_id", upiIdFromQRLink)
			.single();
	} catch (err) {
		return { data: null, error: err.message };
	}
};

export const createTransaction = ({
	merchant,
	user,
	comment,
	amount,
	currency = "INR",
	order = {},
	merchantUPIId,
}) =>
	supabaseServiceAdmin.from("transactions").insert([
		{
			merchant_id: merchant,
			user_id: user,
			comment: comment || "",
			amount,
			currency,
			is_complete: false,
			order_id: order.id,
			order_json: order,
			merchant_upi_id: merchantUPIId,
		},
	]);
