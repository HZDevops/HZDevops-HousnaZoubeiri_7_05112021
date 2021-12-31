import axios from "axios";
import store from "../store/index";
import router from "../router/index";

export default () => {
	const instance = axios.create({
		baseURL: process.env.VUE_APP_API_ENDPOINT,
		headers: {
			Authorization: `Bearer ${store.state.token}`
		}
	});
	instance.interceptors.response.use(
		response => response,
		error => {
			if (error.response.status === 401) {
				store.dispatch("logOut");
				router.replace("/");
				throw error;
			} else {
				throw error;
			}
		}
	);

	return instance;
};
