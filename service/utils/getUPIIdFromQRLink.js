const getUPIIdFromQRLink = (link) => {
	return new URLSearchParams(
		new URL(link.replace("upi://", "https://")).search
	).get("pa");
};

export default getUPIIdFromQRLink;
