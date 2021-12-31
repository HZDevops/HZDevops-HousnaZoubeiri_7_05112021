<template>
	<div class="col-lg-6 offset-lg-3">
		<div class="card mb-4">
			<div class="card-body">
				<div class="media mb-3">
					<img
						v-if="profil.photo"
						class="ui-w-40 rounded-circle"
						:src="profil.photo"
						alt="image du profil"
					/>
					<img
						v-else
						class="ui-w-40 rounded-circle"
						src="../assets/icon3.png"
						alt="logo Groupomania"
					/>
					<div class="media-body ml-3">
						<div class="username">
							Nom d'utilisateur : {{ profil.username }}
						</div>
						<div class="username text-muted small">
							Email: {{ profil.email }}
						</div>
						<div class="username text-muted small" v-if="profil.bio">
							Biographie: {{ profil.bio }}
						</div>
					</div>
				</div>
				<div class="card-footer icon">
					<a
						class="d-inline-block text-muted ml-3"
						type="button"
						@click="deleteProfil()"
					>
						<i class="fas fa-trash-alt"></i>
					</a>

					<a
						class="d-inline-block text-muted ml-3"
						type="button"
						@click="
							$router.push({
								name: 'UpdateProfil'
							})
						"
						><i class="far fa-edit"></i>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userService from "../services/userService";
import { mapActions } from "vuex";

export default {
	name: "Profil",

	data() {
		return {
			profil: []
		};
	},

	mounted() {
		userService
			.getUserProfil()
			.then(response => {
				this.profil = response.data;
			})
			.catch(error => console.log(error));
	},

	methods: {
		...mapActions(["logOut"]),

		deleteProfil() {
			if (window.confirm("Voulez vous vraiment supprimer votre compte?")) {
				userService.deleteUserProfil().then(() => {
					this.logOut();
					this.$router.replace("/");
				});
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
	justify-content: space-around;
	flex-wrap: wrap;
	text-align: left;
}
.media-body {
	width: 100%;
	text-align: center;
}
.username {
	font-size: 1.1rem;
	font-weight: 700;
}
.title {
	font-weight: 600;
}
.mb-4 {
	margin-top: 40px;
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
	margin-bottom: 50px;
	margin-top: 50px;
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
.card-footer {
	background-color: white;
}
.card-footer,
.card hr {
	border-color: rgba(24, 28, 33, 0.06);
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
