<template>
	<div class="row">
		<div class="col-lg-6 offset-lg-3">
			<div class="card mb-4">
				<div class="card-body">
					<div class="media mb-3">
						<img
							v-if="post.User.photo"
							class="ui-w-40 rounded-circle"
							:src="post.User.photo"
							alt="image du profil"
						/>
						<div class="media-body ml-3">
							<div class="media-head">
								<div class="username">{{ post.User.username }}</div>
								<div class="text-muted small">
									{{ displayDate }}
								</div>
							</div>
						</div>
						<p class="content title">
							{{ post.title }}
						</p>
						<p class="content">
							{{ post.content }}
						</p>
						<img
							v-if="post.attachment"
							class="ui-rect ui-bg-cover attachment"
							:src="post.attachment"
							alt="image du post"
						/>
					</div>
					<!--Display trash button if the user is the owner of the post-->
					<div class="icon" v-if="user.id === post.UserId || user.isAdmin">
						<a
							class="d-inline-block text-muted ml-3"
							type="button"
							@click="deletePost(post.id)"
						>
							<i class="fas fa-trash-alt"></i>
						</a>

						<a
							class="d-inline-block text-muted ml-3"
							type="button"
							@click="
								$router.push({
									name: 'UpdatePost',
									params: { postId: post.id }
								})
							"
							><i class="far fa-edit"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import postService from "../services/postService";
import moment from "moment";
import { mapState } from "vuex";

export default {
	name: "Post",

	props: {
		post: {}
	},

	computed: {
		displayDate() {
			return moment(this.post.createdAt).format("YYYY-MM-DD [at] hh:mm");
		},

		...mapState(["user"])
	},

	methods: {
		uploadFile() {
			this.attachment = this.$refs.file.files[0];
		},

		deletePost(id) {
			if (window.confirm("Voulez vous vraiment supprimer le post?")) {
				postService
					.deletePost(id)
					.then(() => {
						this.$router.go("/wall");
					})
					.catch(error => console.log(error));
			}
		}
	}
};
</script>
<style scoped>
body {
	background: #eee;
}

.media {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	text-align: left;
}

.username {
	font-size: 1.1rem;
	font-weight: 700;
}

.title {
	font-weight: 600;
}

.content {
	width: 100%;
	text-align: left;
	font-size: 0.95rem;
	margin-top: 20px;
	margin-bottom: 5px;
	margin-left: 10px;
}

.posts-content {
	margin-top: 20px;
}

.ui-w-40 {
	width: 60px !important;
	height: 60px;
	margin-right: 10px;
}

.default-style .ui-bordered {
	border: 1px solid rgba(24, 28, 33, 0.06);
}

.ui-bg-cover {
	background-color: transparent;
	background-position: center center;
	background-size: cover;
}

.attachment {
	height: 300px;
	width: 500px;
}

.ui-rect,
.ui-rect-30,
.ui-rect-60,
.ui-rect-67,
.ui-rect-75 {
	position: relative !important;
	display: block !important;
	width: 100% !important;
}

.d-flex,
.d-inline-flex,
.media,
.media > :not(.media-body),
.jumbotron,
.card {
	-ms-flex-negative: 1;
	flex-shrink: 1;
}

.bg-dark {
	background-color: rgba(24, 28, 33, 0.9) !important;
}

.ui-rect-content {
	position: absolute !important;
	top: 0 !important;
	right: 0 !important;
	bottom: 0 !important;
	left: 0 !important;
}

.default-style .ui-bordered {
	border: 1px solid rgba(24, 28, 33, 0.06);
}

.icon {
	display: flex;
	justify-content: space-around;
	font-size: 1.2rem;
	font-weight: 900;
}

.fa-thumbs-up {
	font-size: 1.5rem;
}

a :hover {
	color: red;
}
</style>
