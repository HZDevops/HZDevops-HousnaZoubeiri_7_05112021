import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue")
	},
	{
		path: "/signin",
		name: "SignIn",
		component: () => import("../views/SignIn.vue")
	},

	{
		path: "/signup",
		name: "SignUp",
		component: () => import("../views/SignUp.vue")
	},

	{
		path: "/publishpost",
		name: "PublishPost",
		component: () => import("../views/PublishPost.vue")
	},

	{
		path: "/updatepost",
		name: "UpdatePost",
		component: () => import("../views/UpdatePost.vue")
	},

	{
		path: "/wall",
		name: "Wall",
		component: () => import("../views/Wall.vue")
	},

	{
		path: "/profil",
		name: "Profil",
		component: () => import("../views/Profil.vue")
	},
	{
		path: "/updateprofil",
		name: "UpdateProfil",
		component: () => import("../views/UpdateProfil.vue")
	},

	{
		path: "/allprofil",
		name: "AllProfil",
		component: () => import("../views/AllProfil.vue")
	}
];
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	const publicPages = ["/", "/signin", "/signup"];
	const authRequired = !publicPages.includes(to.path);
	const loggedToken = localStorage.getItem("token");
	if (authRequired && !loggedToken) {
		return next("/");
	} else {
		next();
	}
});

export default router;
