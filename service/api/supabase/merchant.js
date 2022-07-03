import supabase from "./index";
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
