import authHeader from "../services/authHeader";

export default {
	getPosts() {
		return authHeader().get("post");
	},

	getPost(id) {
		return authHeader().get("post/" + id);
	},

	createPost(data) {
		return authHeader().post("post/createpost", data);
	},

	updatePost(id, data) {
		return authHeader().put("post/" + id, data);
	},

	deletePost(id) {
		return authHeader().delete("post/" + id);
	}
};
