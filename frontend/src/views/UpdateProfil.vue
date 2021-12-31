<template>
	<main>
		<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
			<div class="card card0 border-0">
				<div class="row d-flex">
					<div class="col-lg-6">
						<div class="cardbox-item">
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
								<h6 class="mb-0 mr-4 mt-2">Modifier mon profil</h6>
							</div>
							<form enctype="multipart/form-data">
								<div class="row px-3">
									<label class="mb-1">
										<h6 class="mb-0 text-sm">Biographie</h6>
									</label>
									<textarea
										class="form-control"
										row="5"
										name="bio"
										placeholder="Exprimez-vous..."
										v-model="profil.bio"
									>
									</textarea>
								</div>
								<div class="row px-3 mb-4"></div>
								<div class="row px-3">
									<label class="mb-1">
										<h6 class="mb-0 text-sm">Photo de profil</h6>
									</label>
									<input
										type="file"
										ref="file"
										name="image"
										accept=".jpg, .jpeg, .gif, .png"
										class="btn-link"
										@change="uploadFile()"
									/>
									<button
										type="button"
										class="btn btn-blue text-center"
										@click="updateUserProfil()"
									>
										Modifier
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import userService from "../services/userService";

export default {
	data() {
		return {
			photoProfil: "",
			profil: []
		};
	},

	async beforeMount() {
		const { data } = await userService.getUserProfil();
		this.profil = data;
	},

	methods: {
		uploadFile() {
			this.photoProfil = this.$refs.file.files[0];
		},

		updateUserProfil() {
			const formData = new FormData();
			formData.append("bio", this.profil.bio);
			formData.append("image", this.photoProfil);

			userService
				.updateUserProfil(formData)
				.then(() => {
					this.$router.push("/profil");
				})
				.catch(error => console.log(error));
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
	margin-top: 60px;
	padding-bottom: 20px;
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

input {
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

textarea {
	height: 75px;
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
	width: 100px;
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

@media (max-width: 991px) {
	.card0 {
		margin-top: 20px;
	}

	.image {
		display: none;
	}

	.border-line {
		border-right: none;
	}

	.cardbox-item {
		display: none;
	}
}
</style>
