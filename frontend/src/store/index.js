import { createStore } from "vuex";

export default createStore({
	state: {
		token: null,
		user: null,
		isLoggedIn: false
	},

	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
		},

		SET_USER(state, user) {
			state.user = user;
		},

		SET_IS_LOGGED_IN(state, status) {
			state.isLoggedIn = status;
		},

		LOG_OUT(state) {
			state.token = null;
			state.isLoggedIn = false;
		}
	},

	actions: {
		signIn(context, { token, user }) {
			context.dispatch("setToken", token);
			context.dispatch("setUser", user);
			context.commit("SET_IS_LOGGED_IN", true);
		},

		setUser(context, user) {
			localStorage.setItem("user", JSON.stringify(user));
			context.commit("SET_USER", user);
		},

		setToken(context, token) {
			localStorage.setItem("token", JSON.stringify(token));
			context.commit("SET_TOKEN", token);
		},

		loadUser(context) {
			const token = JSON.parse(localStorage.getItem("token"));
			const user = JSON.parse(localStorage.getItem("user"));
			if (token && user) {
				context.commit("SET_USER", user);
				context.commit("SET_TOKEN", token);
				context.commit("SET_IS_LOGGED_IN", true);
			}
		},

		logOut(context) {
			context.commit("LOG_OUT");
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		}
	},

	modules: {}
});
