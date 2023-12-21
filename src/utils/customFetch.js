import axios from "axios";

const customFetch = axios.create({
	baseURL: "https://ordersysteem-api.onrender.com/api/v1",
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

export default customFetch;
