import {Vue} from "vue-property-decorator";
import Vuex, {Store} from "vuex";
import Shops, {AllShops, AllSocials, ShopCategories} from "@/models/Shops";
// @ts-ignore
import firestoreWorker from "workerize-loader!./FirestoreWorker";
import {formatNumberToIDR, getPriceByShop} from "@/helper";
import {ShopResultInfo} from "@/models/ShopResultInfo";
const fwInstance = firestoreWorker();


Vue.use(Vuex);

const store = new Store({
	state: {
		shopsData: {
			Aeon: null,
			Baganmart: null,
			BestbuyLA: null,
			Bigc: null,
			Bukalapak: null,
			Delishop: null,
			Epasar: null,
			JdID: null,
			JdTH: null,
			Larue: null,
			LazadaID: null,
			LazadaMY: null,
			LazadaPH: null,
			LazadaTH: null,
			Shopcom: null,
			ShopeeID: null,
			ShopeeMY: null,
			ShopeePH: null,
			ShopeeTH: null,
			Tokopedia: null,
			TopsTH: null,
			WatsonsID: null,
			WatsonsTH: null,
			Yangonbay: null,
		},
		socialData: {
			instagram: null,
			facebook: null,
		},
		categoriesFound: new Array<ShopCategories>(),
		// TODO: Show loader when getting data.
		isLoadingData: false,
		currentShopName: null,
		currentSocialName: null,
		isUserLoggedIn: false,
		userFirstName:null,
		lastQuery:null,
		currency:'USD',
		isLoginChecked:false,
		rates:{},
	},

	mutations: {
		setRates: (state, obj: any) => {
			state.rates[obj.name] = obj.main.rates;
		},
		setLoginChecked: (state, val: boolean) => {
			state.isLoginChecked = val;
		},
		setCurrency: (state, name: string) => {
			state.currency = name;
		},
		setSearchResults: (state, payload: any) => {
			for (const shop of AllShops) {
				const {filter, name} = shop;
				if (payload[name]) {
					state.shopsData[filter] = {};
					state.shopsData[filter].products = payload[name].results;
					state.shopsData[filter].name = name;
					state.shopsData[filter].count = payload[name].count;
				}
				// if (state.shopsData[filter]) {
				// 	state.shopsData[filter].name = name;
				// }
			}
		},
		setInstagramData: (state, results: any) => {
			state.socialData.instagram = results;
		},
		setUserFirstName: (state, name: string) => {
			state.userFirstName = name;
		},
		clearSearchResults: (state) => {
			state.shopsData = {
				Aeon: null,
				Baganmart: null,
				BestbuyLA: null,
				Bigc: null,
				Bukalapak: null,
				Delishop: null,
				Epasar: null,
				JdID: null,
				JdTH: null,
				Larue: null,
				LazadaID: null,
				LazadaMY: null,
				LazadaPH: null,
				LazadaTH: null,
				Shopcom: null,
				ShopeeID: null,
				ShopeeMY: null,
				ShopeePH: null,
				ShopeeTH: null,
				Tokopedia: null,
				TopsTH: null,
				WatsonsID: null,
				WatsonsTH: null,
				Yangonbay: null,
			};
			state.socialData = {
				instagram: null,
				facebook: null,
			};
			state.categoriesFound = new Array<ShopCategories>();
		},
		setCurrentShopName: (state, name: string | null) => {
			if (name) {
				state.currentShopName = name;
			}
		},
		setCurrentSocialName: (state, name: string | null) => {
			state.currentSocialName = name;
		},
		setLastQuery: (state, query : any) => {
			state.lastQuery = query;
		},
		addFoundCategories: (state, category: ShopCategories) => {
			state.categoriesFound.push(category);
		},
		removeCategory: (state, category: ShopCategories) => {
			state.categoriesFound = state.categoriesFound.filter(item => {
				return item !== category;
			});
		},
		toggleIsLoadingData: (state, payload) => {
			state.isLoadingData = payload;
		},
		setUserLoggedIn: (state, payload) => {
			state.isUserLoggedIn = payload;
		},
	},
	getters: {
		getLoginChecked: (state) => {
			return state.isLoginChecked;
		},
		getCurrency: (state) => {
			return state.currency;
		},
		isLoadingData: (state): boolean => {
			return state.isLoadingData;
		},
		isUserLoggedIn: (state): boolean => {
			return state.isUserLoggedIn;
		},
		getUserFirstName: (state): boolean => {
			return state.userFirstName;
		},
		getCurrentShopName(state) {
			return state.currentShopName;
		},
		getCurrentShopData(state, getters) {
			const {currentShopName} = state;
			// noinspection TypeScriptValidateJSTypes
			return currentShopName != null ? getters.getShopDataByName(currentShopName) : null;
		},

		getCurrentSocialData(state, getters) {
			const {currentSocialName} = state;
			// noinspection TypeScriptValidateJSTypes
			return currentSocialName != null ? getters.getDataForSocial(currentSocialName) : null;
		},

		checkIfCategoryIsShown: (state) => (category: ShopCategories): number => {
			return state.categoriesFound.indexOf(category);
		},

		numberOfShopsAndSocials(state, getters): number {
			return getters.shopsFound.length + getters.socialsFound.length;
		},


		// TODO: Fix this function
		shopsFound(state): Shops[] {
			const shops = [];

			for (const shop of Object.keys(AllShops)) {
				const shopFilter = AllShops[shop].filter;
				if (state.shopsData[shopFilter] && state.shopsData[shopFilter].count > 0) {
					shops.push(AllShops[shop]);
				}
			}

			return shops;
		},

		socialsFound(state, getters) {
			const socials = [];

			for (const social of AllSocials) {
				const filter = social.filter;
				if (getters[`get${filter}Data`] != null && getters[`get${filter}Data`].length > 0) {
					socials.push(social);
				}
			}
			return socials;
		},

		getInstagramData(state): [] {
			return state.socialData.instagram;
		},

		getFacebookData(state): [] {
			return state.socialData.facebook;
		},

		getShopDataByFilter: state => (shopFilter: string): ShopResultInfo => {
			const shop = state.shopsData[shopFilter];
			if (shop) {
				const {count, products, name} = shop;
				return {
					name,
					avgPrice: getAvg(shop.products, shop.name)+"",
					productCount: count,
					products,
				};
			}
			return null;
		},

		getShopDataByName: (state) =>
			(shopName: string): ShopResultInfo => {
				const matchedNames = Object.keys(AllShops)
					.filter((item) => {
						return AllShops[item].name === shopName;
					});
				const {filter} = AllShops[matchedNames[0]];
				return state.shopsData[filter];
			},

		getDataForSocial: (state, getters) =>
			(socialName: string): ShopResultInfo => {
				// console.log(socialName);
				const matchedNames = Object.keys(AllSocials)
					.filter((item) => {
						return AllSocials[item].name === socialName;
					});
				return getters[`get${AllSocials[matchedNames[0]].filter}Data`];
			},
		getLastQuery: (state, getters) => {
			return state.lastQuery;
		}
	},

	// actions ********************************************************************************************************
	actions: {
		loadRates: async ({commit, dispatch, getters}, query: any) => {
			// @ts-ignore
			const fwInstance = firestoreWorker();
			fwInstance.getRates("IDR").then((data) =>commit("setRates", {name:"IDR", main:data}));
			fwInstance.getRates("EUR").then((data) =>commit("setRates", {name:"EUR", main:data}));
			fwInstance.getRates("KHR").then((data) =>commit("setRates", {name:"KHR", main:data}));
			fwInstance.getRates("LAK").then((data) =>commit("setRates", {name:"LAK", main:data}));
			fwInstance.getRates("MMK").then((data) =>commit("setRates", {name:"MMK", main:data}));
			fwInstance.getRates("MYR").then((data) =>commit("setRates", {name:"MYR", main:data}));
			fwInstance.getRates("PHP").then((data) =>commit("setRates", {name:"PHP", main:data}));
			fwInstance.getRates("SGD").then((data) =>commit("setRates", {name:"SGD", main:data}));
			fwInstance.getRates("THB").then((data) =>commit("setRates", {name:"THB", main:data}));
			fwInstance.getRates("VND").then((data) =>commit("setRates", {name:"VND", main:data}));
			return;
		},
		loadResultsData: async ({commit, dispatch, getters}, query: any) => {
			commit("toggleIsLoadingData", true);
			commit("clearSearchResults");
			commit("setLastQuery", query);

			if (query.q === null) {
				return;
			}
			const queryString = query.q.toLowerCase();
			if (queryString === "summary") {
				commit("toggleIsLoadingData", false);
				return;
			}
			// @ts-ignore
			const fwInstance = firestoreWorker();
			fwInstance.getSearchDoc(queryString).then(async (data) => {
				commit("toggleIsLoadingData", false);
				// console.log(data);
				if (data) {
					const {stores, instagram} = data;
					const hasInstagramData = instagram && instagram.data && instagram.data.length > 0 && instagram.count > 0;
					const hasStoresAndProducts = stores && stores.results && stores.totalProducts > 0;

					if (hasInstagramData) {
						commit("setInstagramData", instagram.data);
						commit("addFoundCategories", ShopCategories.SocialMedia);
					}
					if (hasStoresAndProducts) {
						commit("setSearchResults", stores.results);
						commit("addFoundCategories", ShopCategories.ECommerce);
					}
					if (hasInstagramData || hasStoresAndProducts) {
						await incrementSearch(queryString, true);
					} else {
						await incrementSearch(queryString, false);
					}

				} else {
					await incrementSearch(queryString, false);
					await dispatch("loadFreshResultsData", queryString);
				}
			});
			return;
		},
		async loadFreshResultsData({commit, dispatch, getters}, query: string) {
			commit("toggleIsLoadingData", true);
			requestCloudFunction(query).then((results) => {
				commit("toggleIsLoadingData", false);
				if (results) {
					commit("setSearchResults", results);
				}
			});
			return;
		},
		signUp: async ({commit, dispatch, getters}, obj : any) => {
			commit("toggleIsLoadingData", true);
			// @ts-ignore
			await fwInstance.signUp(obj, document.location.origin).then(async () => {
			}).finally(() => {
				commit("toggleIsLoadingData", false);
			});
			return;
		},
		signIn: async ({commit, dispatch, getters}, obj : any) => {
			commit("toggleIsLoadingData", true);
			// @ts-ignore
			await fwInstance.signIn(obj.email, obj.password).then(async (result) => {
				commit("setUserLoggedIn", true);
				commit("setUserFirstName", result.user.fname);

				//this.$cookie.set("keyName", keyValue, "expiring time")
			}).catch(e => {
				commit("setUserLoggedIn", false);
				throw e;
			}).finally(() => {
				commit("toggleIsLoadingData", false);
			});
			return;
		},
		signOut: async ({commit, dispatch, getters}) => {
			commit("toggleIsLoadingData", true);
			// @ts-ignore
			await fwInstance.signOut().then(async (result) => {
				if (result.success) {
					console.log("signOut OK");
					commit("setUserLoggedIn", false);
				} else {
					commit("setUserLoggedIn", true);
					throw result.message;
				}
				commit("toggleIsLoadingData", false);
			});
			return;
		},
	},
});

async function requestCloudFunction(query: string) {
	let res;
	const HOST = "https://us-central1-driven-manifest-244106.cloudfunctions.net/search";
	const makeRequest = async () => {
		const data = {method: "search", q: query};
		res = await fetch(HOST, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data),
		});
		// console.log(response);
		return await res.json();
	};
	try {
		const respBody = await makeRequest();
		// console.log(respBody);
		if (respBody.data && respBody.data.resultData) {
			return (respBody.data.resultData);
		} else {
			return null;
		}
	} catch (e) {
		// console.log("e", e);
	}
}

async function incrementSearch(query: string, hadResults: boolean) {
	if (query === "summary") {
		return;
	}
	let res;
	const functionURL = "https://us-central1-driven-manifest-244106.cloudfunctions.net/noResultSearchCount";
	const makeRequest = async () => {
		const data = {searchName: query, hadResults};
		res = await fetch(functionURL, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data),
		});
		console.log(res);
		return res;
	};
	try {
		await makeRequest();
	} catch (e) {
		console.log("e", e);
	}
}

// Todo: Correct this function
const getAvg = (resultArr: any[], shop : string) => {
	let avgNumber = 0;
	if (resultArr.length > 0) {
		const tempAvg = resultArr.reduce((prev, cur) => {
			return prev + Number(cur["price Show"]);
		}, 0) / resultArr.length;
		avgNumber = Math.floor(tempAvg);

	}
	return getPriceByShop(avgNumber, shop, store.state.currency);
};




export default store;

