<template>
	<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
		<div class="card card0 border-0">
			<div class="row d-flex">
				<div class="col-lg-6">
					<div class="card1">
						<div class="row px-3 justify-content-center border-line">
							<img
								src="../assets/icon3.png"
								alt="Logo de Groupomania"
								class="image"
							/>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="card2 card border-0 px-4">
						<form>
							<div class="row px-3">
								<label class="mb-1">
									<h6 class="mb-0 text-sm">Email</h6>
								</label>
								<input
									class="mb-4"
									type="email"
									name="email"
									placeholder="Saisir une adresse mail"
									v-model="email"
								/>
								<div class="error" v-if="!emailGood && email.length > 5">
									Email incorrect
								</div>
							</div>
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
								<div class="error" v-if="!usernameGood && username.length > 3">
									Nom d'utilisateur doit avoir 5 à 12 caractères et sans
									d'espace
								</div>
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
								<div class="error" v-if="!passwordGood && password.length > 0">
									Mot de passe doit contenir au moins 8 caractères et un chiffre
								</div>
							</div>
							<div class="row px-3">
								<label class="mb-1">
									<h6 class="mb-0 text-sm">Confirmer mot de passe</h6>
								</label>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Resaisir votre mot de passe"
									v-model="confirmPassword"
								/>
								<div
									class="error"
									v-if="
										passwordGood &&
											password !== confirmPassword &&
											password.length > 0
									"
								>
									Mots de passe différents
								</div>
							</div>
							<div class="row px-3 mb-4"></div>
							<div class="row mb-3 px-3">
								<button
									type="button"
									class="btn btn-blue text-center"
									:disabled="!isFormValid"
									@click="signUp()"
								>
									S'inscrire
								</button>
							</div>
							<div class="text-danger " v-if="serverErrorMessage">
								{{ serverErrorMessage }}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userService from "../services/userService";
import { checkPassword, checkEmail, checkUsername } from "@/utils/helpers";

export default {
	data() {
		return {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			errorCheckPassword: "",
			errors: [],
			error: "",
			serverErrorMessage: ""
		};
	},

	computed: {
		isFormValid() {
			return (
				this.emailGood &&
				this.usernameGood &&
				this.passwordGood &&
				this.password === this.confirmPassword
			);
		},

		emailGood() {
			return checkEmail(this.email);
		},

		usernameGood() {
			return checkUsername(this.username);
		},

		passwordGood() {
			return checkPassword(this.password);
		}
	},

	methods: {
		signUp() {
			userService
				.signup({
					email: this.email,
					username: this.username,
					password: this.password
				})
				.then(() => {
					this.$router.push("/signin");
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
	margin-top: 10px;
}

.image {
	width: auto;
	margin-top: 50px;
}

.card2 {
	margin: 0px 40px;
}

h6 {
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 10px;
	margin-top: 10px;
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

.error {
	color: red;
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
	}

	input {
		padding: 5px;
	}
}
</style>
