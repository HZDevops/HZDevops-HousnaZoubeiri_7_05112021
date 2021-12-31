<template>
	<header
		class="d-flex flex-wrap align-items-center
		justify-content-center justify-content-md-between border-bottom"
	>
		<router-link to="/" class="nav-link px-2 link-dark" aria-label="Accueil">
			<img
				class="bi me-2"
				width="150"
				height="32"
				role="img"
				src="../assets/icon-left-font-v2.png"
				alt="Logo de Groupomania"
			/>
		</router-link>
		<ul
			v-if="isLoggedIn"
			class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"
		>
			<li>
				<router-link
					to="/publishpost"
					class="nav-link px-2 link-dark"
					aria-label="Publication de post"
					title="Publier un post"
				>
					Publier un post
				</router-link>
			</li>
			<li>
				<router-link
					to="/wall"
					class="nav-link px-2 link-dark"
					aria-label="Fil d'actualité"
					title="Voir le fil d'actualité"
				>
					Fil d'actualité
				</router-link>
			</li>
			<li>
				<router-link
					to="/allprofil"
					class="nav-link px-2 link-dark"
					aria-label="Membres"
					title="Voir les membres"
				>
					Membres
				</router-link>
			</li>
			<li>
				<router-link to="/profil" class="nav-link px-2 link-dark">
					Profil
				</router-link>
			</li>
			<li>
				<a
					class="nav-link px-2 link-dark"
					aria-label="Se déconnecter"
					title="Se déconnecter"
					@click="onClickLogoutButton"
				>
					Déconnexion
				</a>
			</li>
		</ul>
		<div v-else class="col-md-3 text-end">
			<router-link
				class="btn btn-outline-primary me-2"
				to="/signin"
				aria-label="Se connecter"
			>
				Se connecter
			</router-link>
			<router-link
				class="btn btn-outline-primary me-2"
				to="/signup"
				aria-label="S'inscrire"
			>
				S'inscrire
			</router-link>
		</div>
	</header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		...mapState(["isLoggedIn"])
	},

	methods: {
		...mapActions(["logOut"]),

		onClickLogoutButton() {
			this.logOut();
			this.$router.replace("/");
		}
	}
};
</script>

<style scoped>
.form-control-dark {
	color: #fff;
	background-color: var(--bs-dark);
	border-color: var(--bs-gray);
}

.form-control-dark:focus {
	color: #fff;
	background-color: var(--bs-dark);
	border-color: #fff;
	box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.text-small {
	font-size: 85%;
}

.dropdown-toggle {
	outline: 0;
}

a {
	cursor: pointer;
}
</style>
