import authHeader from "./authHeader";

export default {
	signup(data) {
		return authHeader().post("auth/signup", data);
	},
	signin(data) {
		return authHeader().post("auth/signin", data);
	},
	getUserProfil() {
		return authHeader().get("auth/profil");
	},
	updateUserProfil(data) {
		return authHeader().put("auth/profil", data);
	},
	deleteUserProfil() {
		return authHeader().delete("auth/profil");
	},
	getMembers() {
		return authHeader().get("auth/allmembers");
	}
};
