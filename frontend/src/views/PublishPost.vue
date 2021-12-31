<template>
	<main>
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
								<h6 class="mb-0 mr-4 mt-2">Publier un Post</h6>
							</div>
							<form enctype="multipart/form-data">
								<div class="row px-3">
									<label class="mb-1">
										<h6 class="mb-0 text-sm">Titre</h6>
									</label>
									<input
										class="mb-4"
										type="text"
										name="title"
										placeholder="Saisir un titre"
										v-model="title"
									/>
								</div>
								<div class="row px-3">
									<label class="mb-1">
										<h6 class="mb-0 text-sm">Description</h6>
									</label>
									<textarea
										class="form-control"
										row="5"
										name="content"
										placeholder="Exprimez-vous..."
										v-model="content"
									>
									</textarea>
								</div>
								<div class="row px-3 mb-4"></div>
								<div class="row mb-3 px-3">
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
										@click="publishPost()"
									>
										Publier
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
import postService from "../services/postService";

export default {
	data() {
		return {
			title: "",
			content: "",
			attachment: "",
			profil: [],
			postsUser: []
		};
	},

	methods: {
		uploadFile() {
			this.attachment = this.$refs.file.files[0];
		},

		publishPost() {
			const formData = new FormData();
			formData.append("title", this.title);
			formData.append("content", this.content);
			formData.append("image", this.attachment);

			postService
				.createPost(formData)
				.then(response => {
					console.log(response.data);
					this.$router.push("/wall");
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
	height: 100px;
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
}
</style>
