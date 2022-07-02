import Head from "next/head";
import useLoginRedirect from "../hooks/useLoginRedirect";

const UserDashboard = ({ user }) => {
	useLoginRedirect();

	return (
		<>
			<Head>
				<title>Alt | User Dashboard</title>
			</Head>
		</>
	);
};

export default UserDashboard;
