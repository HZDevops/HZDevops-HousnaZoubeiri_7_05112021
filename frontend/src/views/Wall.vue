<template>
	<div class="container posts-content">
		<Post v-for="post in posts" :key="post.id" :post="post" />
	</div>
</template>

<script>
import Post from "../components/Post.vue";
import postService from "../services/postService";

export default {
	components: {
		Post
	},

	data() {
		return {
			posts: []
		};
	},

	mounted() {
		postService
			.getPosts()
			.then(response => {
				this.posts = response.data.posts;
			})
			.catch(error => console.log(error));
	}
};
</script>

<style scoped>
.posts-content {
	margin-top: 20px;
}
</style>
