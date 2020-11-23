import {Color} from "csstype";

export default class Shops {
	public icon!: string;
	public name!: string;
	public displayName!: string;
	public filter!: string;
	public website!: string;
	public category!: ShopCategories;
	public primaryColor!: Color;
}

export enum ShopCategories {
	SocialMedia = "Social Media",
	ECommerce = "E-Commerce",
}


const instagram: Shops = {
	name: "instagram",
	displayName: "Instagram",
	category: ShopCategories.SocialMedia,
	filter: "Instagram",
	icon: "instagram.svg",
	website: "instagram.com",
	primaryColor: "rgba(193,53,132,.7)",
};

export const AllSocials = {
	instagram,
	* [Symbol.iterator](): IterableIterator<Shops> {
		const shops: Shops[] = Object.values(this);
		for (const shop of shops) {
			yield shop;
		}
	},
};

//region E-Commerce shops
const aeononline: Shops = {
	name: "aeononlineshopping",
	displayName: "Aeon Online",
	category: ShopCategories.ECommerce,
	filter: "Aeon",
	icon: "aeon.svg",
	website: "aeononlineshopping.com",
	primaryColor: "rgba(153,61,134,.7)",
};

const baganMart: Shops = {
	name: "baganmart",
	displayName: "Baganmart",
	category: ShopCategories.ECommerce,
	filter: "Baganmart",
	icon: "baganmart.svg",
	website: "baganmart.com",
	primaryColor: "rgba(238 , 93, 47, .7)",
};

const bestbuyLA: Shops = {
	name: "bestbuy.com.la",
	displayName: "BestBuy.com.la",
	category: ShopCategories.ECommerce,
	filter: "BestbuyLA",
	icon: "bestbuy.svg",
	website: "bestbuy.com.la",
	primaryColor: "rgba(198 , 49, 27, .7)",
};

const bigc: Shops = {
	name: "bigc",
	displayName: "Big C",
	category: ShopCategories.ECommerce,
	filter: "Bigc",
	icon: "bigc.svg",
	website: "bigc.co.th",
	primaryColor: "rgba(237 , 29, 36, .7)",
};

const bukalapak: Shops = {
	name: "bukalapak",
	displayName: "Bukalapak",
	category: ShopCategories.ECommerce,
	filter: "Bukalapak",
	icon: "bukalapak.svg",
	website: "bukalapak.com",
	primaryColor: "rgba(196, 13, 65, .7)",
};

const deliShop: Shops = {
	name: "delishop",
	displayName: "Delishop",
	filter: "Delishop",
	category: ShopCategories.ECommerce,
	icon: "delishop.svg",
	website: "delishop.asia",
	primaryColor: "rgba(14, 99, 57, .7)",
};

const epasar: Shops = {
	name: "epasarcambodia",
	displayName: "Epasar",
	filter: "Epasar",
	category: ShopCategories.ECommerce,
	icon: "epasar.svg",
	website: "epasarcambodia.com",
	primaryColor: "rgba(52, 83, 92, .7)",
};

const jdID: Shops = {
	name: "jd.id",
	displayName: "JD",
	filter: "JdID",
	category: ShopCategories.ECommerce,
	icon: "jd.svg",
	website: "jd.id",
	primaryColor: "rgba(227, 28, 25, .7)",
};

const jdTH: Shops = {
	name: "jd.co.th",
	displayName: "JD",
	filter: "JdTH",
	category: ShopCategories.ECommerce,
	icon: "jd.svg",
	website: "jd.co.th",
	primaryColor: "rgba(227, 28, 25, .7)",
};

const larue: Shops = {
	name: "larue",
	displayName: "La Rue",
	filter: "Larue",
	category: ShopCategories.ECommerce,
	icon: "larue.svg",
	website: "larue.com.kh",
	primaryColor: "rgba(102, 102, 102, .7)",
};

const lazadaID: Shops = {
	name: "lazada.co.id",
	displayName: "Lazada",
	filter: "LazadaID",
	category: ShopCategories.ECommerce,
	icon: "lazada.svg",
	website: "lazada.co.id",
	primaryColor: "rgba(243, 110, 42, .7)",
};

const lazadaMY: Shops = {
	name: "lazada.com.my",
	displayName: "Lazada",
	filter: "LazadaMY",
	category: ShopCategories.ECommerce,
	icon: "lazada.svg",
	website: "lazada.com.my",
	primaryColor: "rgba(243, 110, 42, .7)",
};

const lazadaPH: Shops = {
	name: "lazada.com.ph",
	displayName: "Lazada",
	filter: "LazadaPH",
	category: ShopCategories.ECommerce,
	icon: "lazada.svg",
	website: "lazada.com.ph",
	primaryColor: "rgba(243, 110, 42, .7)",
};

const lazadaTH: Shops = {
	name: "lazada.com.th",
	displayName: "Lazada",
	filter: "LazadaTH",
	category: ShopCategories.ECommerce,
	icon: "lazada.svg",
	website: "lazada.co.th",
	primaryColor: "rgba(243, 110, 42, .7)",
};

const shopCom: Shops = {
	name: "shopcom",
	displayName: "Shop.com",
	filter: "Shopcom",
	category: ShopCategories.ECommerce,
	icon: "shopcom.svg",
	website: "shop.com.mm",
	primaryColor: "rgba(69, 49, 144, .7)",
};

const shopeeID: Shops = {
	name: "shopee.co.id",
	displayName: "Shopee",
	filter: "ShopeeID",
	category: ShopCategories.ECommerce,
	icon: "shopee.svg",
	website: "shopee.co.id",
	primaryColor: "rgba(254, 87, 33, .7)",
};

const shopeeMY: Shops = {
	name: "shopee.com.my",
	displayName: "Shopee",
	filter: "ShopeeMY",
	category: ShopCategories.ECommerce,
	icon: "shopee.svg",
	website: "shopee.com.my",
	primaryColor: "rgba(254, 87, 33, .7)",
};

const shopeePH: Shops = {
	name: "shopee.ph",
	displayName: "Shopee",
	filter: "ShopeePH",
	category: ShopCategories.ECommerce,
	icon: "shopee.svg",
	website: "shopee.ph",
	primaryColor: "rgba(254, 87, 33, .7)",
};

const shopeeTH: Shops = {
	name: "shopee.co.th",
	displayName: "Shopee",
	filter: "ShopeeTH",
	category: ShopCategories.ECommerce,
	icon: "shopee.svg",
	website: "shopee.co.th",
	primaryColor: "rgba(254, 87, 33, .7)",
};

const shoppingD: Shops = {
	name: "shopping-d",
	displayName: "Shopping D",
	filter: "ShoppingD",
	category: ShopCategories.ECommerce,
	icon: "shoppingd.svg",
	website: "shopping-d.com",
	primaryColor: "rgba(143, 195, 61, .7)",
};

const tokopedia: Shops = {
	name: "tokopedia",
	displayName: "Tokopedia",
	filter: "Tokopedia",
	category: ShopCategories.ECommerce,
	icon: "tokopedia.svg",
	website: "tokopedia.com",
	primaryColor: "rgba(79, 157, 78, .7)",
};

const topsTH: Shops = {
	name: "tops.co.th",
	displayName: "Tops",
	filter: "TopsTH",
	category: ShopCategories.ECommerce,
	icon: "tops.svg",
	website: "tops.co.th",
	primaryColor: "rgba(244, 4, 5, .7)",
};

const watsonsID: Shops = {
	name: "watsons.co.id",
	displayName: "Watsons",
	filter: "WatsonsID",
	category: ShopCategories.ECommerce,
	icon: "watsons.svg",
	website: "watsons.co.id",
	primaryColor: "rgba(6, 157, 162, .7)",
};

const watsonsTH: Shops = {
	name: "watsons.co.th",
	displayName: "Watsons",
	filter: "WatsonsTH",
	category: ShopCategories.ECommerce,
	icon: "watsons.svg",
	website: "watsons.co.th",
	primaryColor: "rgba(6, 157, 162, .7)",
};

const yangonbay: Shops = {
	name: "yangonbay",
	displayName: "YangonBay",
	filter: "Yangonbay",
	category: ShopCategories.ECommerce,
	icon: "yangonbay.svg",
	website: "yangonbay.com",
	primaryColor: "rgba(70, 75, 70, .7)",
};
//endregion

export const AllShops = {
	aeononline,
	baganMart,
	bestbuyLA,
	bigc,
	bukalapak,
	deliShop,
	epasar,
	jdID,
	jdTH,
	larue,
	lazadaID,
	lazadaMY,
	lazadaPH,
	lazadaTH,
	shopCom,
	shopeeID,
	shopeeMY,
	shopeePH,
	shopeeTH,
	shoppingD,
	tokopedia,
	topsTH,
	watsonsID,
	watsonsTH,
	yangonbay,
	* [Symbol.iterator](): IterableIterator<Shops> {
		const shops: Shops[] = Object.values(this);
		for (const shop of shops) {
			yield shop;
		}
	},
};

export const getDisplayName = (name: string, type: ShopCategories): string => {
	if (type === ShopCategories.ECommerce) {
		for (const shop of AllShops) {
			if (shop.name === name) {
				return shop.displayName;
			}
		}
	} else if (type === ShopCategories.SocialMedia) {
		for (const social of AllSocials) {
			if (social.name === name) {
				return social.displayName;
			}
		}
	}
};
