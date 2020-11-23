import Vue from "vue";
import Router from "vue-router";
import Stats from "@/views/Stats.vue";
import {AdminPageFonts, HomePageFonts, SearchPageFonts} from "./FontsHelper";
import User, {UserTypes} from "@/models/User";

Vue.use(Router);

function getFont(font) {
	const prefetchLink = document.createElement("link");
	prefetchLink.as = "style";
	prefetchLink.rel = "preload";
	prefetchLink.href = font;
	document.body.appendChild(prefetchLink);

	const mainLink = document.createElement("link");
	mainLink.rel = "stylesheet";
	mainLink.href = font;
	mainLink.type = "text/css";
	document.body.appendChild(mainLink);
}

function loadView(component: string) {
	return async () =>
		await import(/* webpackPrefetch: true */ `@/views/${component}.vue`);
}

function loadAdminChild(component: string) {
	return async () =>
		await import(/* webpackPrefetch: true */ `@/components/admin/${component}.vue`);
}

const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: loadView("Home"),
			beforeEnter: (to, from, next) => {
				for (const font of HomePageFonts) {
					getFont(font);
				}
				next();
			},
		},
		{
			path: "/search",
			name: "search",
			meta: {
				title: route => {
					const {q, shop, social} = route.query;
					if (q) {
						const title: string = `Search > ${q}`;
						if (shop) {
							return `${title} in ${shop}`;
						}
						if (social) {
							return `${title} in ${social}`;
						}
						return title;
					}
				},
			},
			component: loadView("SearchResults"),
			beforeEnter: (to, from, next) => {
				const {q} = to.query;
				if (q && Object.keys(q).length > 0) {
					for (const font of SearchPageFonts) {
						getFont(font);
					}
					next();
				} else if (from !== null) {
					next(false);
					router.go(-1);
				} else if (from === null) {
					next(false);
					router.push({path: "/"});
				}
			},
		},
		{
			path: "/shop-search",
			name: "shop-search",
			meta: {
				title: route => {
					const {q} = route.query;
					if (q) {
						return `Shop search > ${q}`;
					}
				},
			},
			beforeEnter: (to, from, next) => {
				const {q} = to.query;
				if (q && Object.keys(q).length > 0) {
					for (const font of SearchPageFonts) {
						getFont(font);
					}
					next();
				} else if (from !== null) {
					next(false);
					router.go(-1);
				} else if (from === null) {
					next(false);
					router.push({path: "/"});
				}
			},
			component: loadView("ShopSearchResults"),
		},
		{
			path: "/stats",
			name: "stats",
			component: loadView("Stats"),
		},
		{
			path: "/admin",
			name: "admin",
			meta: {
				requiresAuth: true,
				title: route => {
					console.log(route);
					return "Admin Home";
				},
			},
			beforeEnter: (to, from, next) => {
				const currentUser = new User("Peter", "Esenwa", UserTypes.Admin);
				for (const font of AdminPageFonts) {
					getFont(font);
				}
				if (currentUser && currentUser.rank === UserTypes.Admin) {
					next();
				}
			},
			component: loadView("Admin"),
			children: [
				// { path: '', component: InternalLogin },
				{
					path: "statistics",
					alias: ["stats"],
					name: "statistics",
					meta: {
						title: route => {
							return "Admin Statistics";
						},
					},
					component: loadAdminChild("Statistics"),
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: loadView("Login"),
			beforeEnter: (to, from, next) => {
				for (const font of SearchPageFonts) {
					getFont(font);
				}
				next();
			},
		},
		{
			path: "/register",
			name: "register",
			component: loadView("Register"),
			beforeEnter: (to, from, next) => {
				for (const font of SearchPageFonts) {
					getFont(font);
				}
				next();
			},
		},
		{
			path: "/store_account",
			name: "store_account",
			component: loadView("StoreAccount"),
			beforeEnter: (to, from, next) => {
				for (const font of SearchPageFonts) {
					getFont(font);
				}
				next();
			}
		},

		{
			path: "/edit/:product_id",
			name: "edit",
			component: loadView("EditProduct"),
			beforeEnter: (to, from, next) => {
				for (const font of SearchPageFonts) {
					getFont(font);
				}
				next();
			}
		},
	],
});
router.afterEach((to, from) => {
	Vue.nextTick(() => {
		document.title = to.meta.title ? to.meta.title(to) : "CodeMilkTea";
	});
});
export default router;
