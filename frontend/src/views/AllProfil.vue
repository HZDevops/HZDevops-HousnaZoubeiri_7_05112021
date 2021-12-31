<template>
	<div class="container1">
		<div class="test">
			<h1>Team Groupomania</h1>
			<ul id="example-1">
				<li v-for="user in users" :key="user.id">
					<span>Nom d'utilisateur :</span> {{ user.username }}<br />
					<span>E-mail :</span> {{ user.email }}<br />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import userService from "@/services/userService";

export default {
	name: "AllProfil",
	data() {
		return {
			users: []
		};
	},

	mounted() {
		userService.getMembers().then(response => {
			this.users = response.data;
		});
	}
};
</script>

<style scoped>
#example-1 {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}

img {
	width: 250px;
	height: 50px;
}

h1 {
	font-weight: bold;
}

span {
	font-weight: bold;
	font-size: 1rem;
}

header {
	background-color: #f2f2f2;
	height: 70px;
	border-radius: 8px;
}

main {
	background-color: #fffafa;
}

.test li {
	background-color: #f2f2f2;
	margin-bottom: 30px;
	margin-left: auto;
	margin-right: auto;
	border: 2px solid none;
	border-radius: 8px;
	box-shadow: 1px 1px 2px #555;
	list-style: none;
	font-family: Arial, Helvetica, sans-serif;
	width: 30%;
}

@media (max-width: 767px) {
	.redirection-message {
		position: static;
	}

	img {
		height: 200px;
		width: 150px;
	}

	.test li {
		width: 90%;
	}

	#example-1 {
		margin: auto;
		margin-right: auto;
		margin-left: auto;
		padding: 0px;
	}
}
</style>
