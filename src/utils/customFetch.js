import axios from "axios";

let baseUrl = "";

if (process.env.NODE_ENV === "production") {
	baseUrl = "https://ordersystem-api-fieret-53b1e883cc92.herokuapp.com/api/v1";
} else {
	baseUrl = "http://localhost:5000/api/v1";
}
// console.log(baseUrl);

const customFetch = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

export default customFetch;
