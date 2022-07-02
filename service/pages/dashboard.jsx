import Head from "next/head";
import { useRouter } from "next/router";

const UserDashboard = ({ user }) => {
	const { push } = useRouter();

	if (!user) push("/");

	return (
		<>
			<Head>
				<title>Alt | User Dashboard</title>
			</Head>
		</>
	);
};

export default UserDashboard;
