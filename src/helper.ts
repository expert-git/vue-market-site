import {number} from "prop-types";

export function formatNumberToIDR(value) {
	let newValue = value;
	if (value >= 999999) {
		const suffixes = ["", "K", "M", "B", "T"];
		const suffixNum = Math.ceil(("" + value).length / 3) - 1;
		let shortValue;
		for (let precision = 2; precision >= 1; precision--) {
			shortValue =
				String(parseFloat((suffixNum !== 0 ?
					(value / Math.pow(1000, suffixNum)) : value).toPrecision(precision + 1)));

			const dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");

			if (dotLessShortValue.length <= 3) {
				break;
			}
		}

		newValue = "Rp " + shortValue + suffixes[suffixNum];
		return newValue;
	}
	return "Rp " + newValue;
}
import shopcur from "@/shopcur.json";
import store from "@/Store.ts";
import moment from "moment";

function getAvgCurValue(cur) {
	if (cur === "USD") return 1
	let curDate = new Date();
	let prevMDate = moment(curDate).subtract(1,'months');
	let pPrevMDate = moment(curDate).subtract(2,'months');

	let result = 0;
	let count = 0;

	const rates = store.state.rates;
	rates[cur].forEach(item => {
		if (curDate.getMonth() === item.month && curDate.getFullYear() === item.year) {
			result += item.value; count++;
		}
		if (prevMDate.month() === item.month && prevMDate.year() === item.year) {
			result += item.value; count++;
		}
		if (pPrevMDate.month() === item.month && pPrevMDate.year() === item.year) {
			result += item.value; count++;
		}
	});
	if (count === 0) {
		console.log("Cannot calc avg currency!")
		return 0;
	} else {
		return result/count;
	}
}

function convertToCurrency (val, shopCur, targetCur) {
	/* to USD */
	const shopCurRate = getAvgCurValue(shopCur);
	const targetCurRate = getAvgCurValue(targetCur);

	if (shopCurRate === 0 || targetCurRate === 0){
		console.log("Cannot calc target price!")
		return 0;
	}
	const valUSD = val*shopCurRate;
	/* to target Currency */
	const valTarget = valUSD/targetCurRate;
	return valTarget;
}

export function getPriceByShop(value, shop, targetCur) {
	/* 1 - get Currency by shop */
	const shopname = shopcur.filter(item => item.shop === shop)[0];
	if (!shopname) {
		console.log("Shop " + shop + " not found in shopcur.json");
		return 0;
	}
	const cur = shopname.cur;
	if (!cur) {
		console.log("Currency for this shop not found!");
		return 0;
	}
	/* 2 - Recalc to Cur Val*/
	const targetVal =  Math.round(convertToCurrency(value, cur, targetCur));
	if (targetCur === "USD") return "$ " + targetVal.toLocaleString('eu-EU');
	if (targetCur === "EUR") return "€ " + targetVal.toLocaleString('eu-EU');
	if (targetCur === "IDR") return "Rp " + targetVal.toLocaleString('eu-EU');
	return targetCur + " " + targetVal.toLocaleString('eu-EU');
}

