import axios from "axios";

const request = async (endpoint, data, options, requestType = "get") => {
	try {
		let response = await axios[requestType](endpoint, data, options);
		return { data: response.data };
	} catch (err) {
		console.log(err);
		const errorMessage =
			err?.response?.data?.error ||
			err?.message ||
			"Something went wrong. Please try again later.";
		return { data: null, error: errorMessage };
	}
};

export default request;
