import { verifyAccessToken } from "../../api/supabase/auth";

export default async function verifierFunction(req, res) {
	if (!req.cookies.access_token)
		return res
			.status(401)
			.json({ user: null, error: "Access token not available." });

	const { user, error } = await verifyAccessToken(req.cookies.access_token);
	return res.json({ user, error });
}
