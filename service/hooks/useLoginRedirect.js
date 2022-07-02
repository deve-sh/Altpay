import { useRouter } from "next/router";
import useAuthState from "./useAuthState";

const useLoginRedirect = () => {
	const router = useRouter();
	const user = useAuthState();

	if (typeof window === "undefined") return;
	if (!user && router.pathname !== "/login")
		return router.push(
			`/login?redirect=${router.pathname}${window.location.search}`
		);
};

export default useLoginRedirect;
