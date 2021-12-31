<template>
	<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
		<div class="card card0 border-0">
			<div class="row d-flex">
				<div class="col-lg-6">
					<div class="card1">
						<div class="row px-3 justify-content-center border-line">
							<img
								src="../assets/icon2.png"
								alt="Logo de Groupomania"
								class="image"
							/>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="card2 card border-0 px-4">
						<div class="row px-3 mb-4">
							<h6 class="mb-0 mr-4 mt-2">Se connecter</h6>
						</div>
						<form>
							<div class="row px-3">
								<label class="mb-1">
									<h6 class="mb-0 text-sm">Nom d'utilisateur</h6>
								</label>
								<input
									class="mb-4"
									type="text"
									name="username"
									placeholder="Saisir un nom d'utilisateur"
									v-model="username"
								/>
							</div>
							<div class="row px-3">
								<label class="mb-1">
									<h6 class="mb-0 text-sm">Mot de passe</h6>
								</label>
								<input
									type="password"
									name="password"
									placeholder="Saisir un mot de passe"
									v-model="password"
								/>
							</div>
							<div class="row px-3 mb-4"></div>
							<div class="row mb-3 px-3">
								<button
									type="button"
									class="btn btn-blue text-center"
									:disabled="!isFormValid"
									@click="signIn()"
								>
									Se connecter
								</button>
							</div>
							<div class="text-danger " v-if="serverErrorMessage">
								{{ serverErrorMessage }}
							</div>
						</form>
						<div class="row mb-4 px-3">
							<small class="font-weight-bold">
								Vous n'avez pas de compte?
								<router-link to="/signup" class="text-danger ">
									Inscrivez-vous!
								</router-link>
							</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userService from "../services/userService";

export default {
	data() {
		return {
			username: null,
			password: null,
			error: "",
			errors: [],
			serverErrorMessage: ""
		};
	},

	computed: {
		isFormValid() {
			return !!this.username && !!this.password;
		}
	},

	methods: {
		signIn() {
			userService
				.signin({
					username: this.username,
					password: this.password
				})
				.then(response => {
					this.$store.dispatch("signIn", {
						token: response.data.token.token,
						user: response.data.user
					});
					this.$router.push("/wall");
				})
				.catch(error => {
					this.serverErrorMessage = error.response.data;
				});
		}
	}
};
</script>

<style scoped>
body {
	color: #000;
	overflow-x: hidden;
	height: 100%;
	background-color: #b0bec5;
	background-repeat: no-repeat;
}

.card0 {
	box-shadow: 0px 4px 8px 0px #757575;
	border-radius: 0px;
	margin-top: 15px;
}

.image {
	width: auto;
}

.card2 {
	margin: 0px 40px;
}

h6 {
	font-weight: bold;
	font-size: 1.5rem;
}

.text-sm {
	font-size: 14px !important;
}

::placeholder {
	color: #bdbdbd;
	opacity: 1;
	font-weight: 300;
}

:-ms-input-placeholder {
	color: #bdbdbd;
	font-weight: 300;
}

::-ms-input-placeholder {
	color: #bdbdbd;
	font-weight: 300;
}

input,
textarea {
	padding: 10px 12px 10px 12px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	margin-bottom: 5px;
	margin-top: 2px;
	width: 100%;
	box-sizing: border-box;
	color: #2c3e50;
	font-size: 14px;
	letter-spacing: 1px;
}

input:focus,
textarea:focus {
	-moz-box-shadow: none !important;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
	border: 1px solid #304ffe;
	outline-width: 0;
}

button:focus {
	-moz-box-shadow: none !important;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
	outline-width: 0;
}

a {
	color: inherit;
	cursor: pointer;
}

.btn-blue {
	background-color: #1a237e;
	width: 150px;
	color: #fff;
	border-radius: 2px;
}

.btn-blue:hover {
	background-color: #000;
	cursor: pointer;
}

.bg-blue {
	color: #fff;
	background-color: #1a237e;
}
footer {
	margin-top: 20px;
}

@media (max-width: 991px) {
	.image {
		display: none;
	}

	.border-line {
		border-right: none;
	}

	.card2 {
		border-top: 1px solid #eeeeee !important;
		margin: 0px 15px;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
}
</style>
