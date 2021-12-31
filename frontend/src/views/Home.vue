<template>
	<div>
		<h1 class="text-center">Bienvenu sur le réseau social de Groupomania</h1>
		<img
			src="../assets/icon3.png"
			class="img-responsive center-block"
			alt="Logo de Groupomania"
		/>
	</div>
</template>

<script>
export default {
	name: "Home"
};
</script>

<style scoped>
.img-responsive {
	margin: 0 auto;
}

h1 {
	color: #ec1111;
	margin-top: 45px;
	margin-bottom: 45px;
}

.display-4 {
	font-size: calc(1.475rem + 2.7vw);
	font-weight: bold;
	line-height: 1.2;
}
@media (max-width: 991px) {
	img {
		width: 40%;
	}

	h1 {
		margin-bottom: 0;
	}
}
</style>
