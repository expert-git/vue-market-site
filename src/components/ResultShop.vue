<template>
	<div class="result-content-holder">
		<div id="result-details">
			<div id="shop-info">
				<a id="shop-icon-holder" :href="formattedWebsite" target="_blank">
					<img id="shop-icon" :src="require(`../assets/images/shop_icon/${shopDetails.icon}`)"
					     alt="shop-icon">
				</a>
				<div id="shop-text-holder">
					<a id="shop-name" :href="formattedWebsite" :style="`color: ${shopDetails.primaryColor};`"
					   target="_blank">{{shopDetails.displayName}}
					</a>
					<a id="shop-website" :href="formattedWebsite" target="_blank">{{shopDetails.website}}</a>
				</div>
			</div>
			<span id="upper" class="section-separator"></span>
			<div id="shop-products-details">
				<label id="products-found-title" class="dataTitle">Found</label>
				<label id="products-found" class="dataText">
					{{productsFound + ' Products'}}
				</label>
				<span class="section-separator vertical"></span>
				<label id="avg-price-title" class="dataTitle">Average Price</label>
				<label id="avg-price" class="dataText">
					{{shopData.avgPrice}}
				</label>
			</div>
			<span id="lower" class="section-separator"></span>
			<button class="product-details-btn" v-on:click="gotoDetails()">
				See Details
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {mapGetters} from "vuex";

	@Component({
		computed: {
			...mapGetters(["getShopDataByFilter"]),
			shopData() {
				return this.getShopDataByFilter(this.$props.shopDetails.filter);
			},
			formattedWebsite() {
				return `http://www.${this.shopDetails.website}`;
			},
		},
		props: {
			shopDetails: {
				type: Object,
				default: null,
			},
		},
	})
	export default class ResultShop extends Vue {
		public getShopDataByFilter!: any;
		public shopData!: any;

		public gotoDetails() {
			this.$router.push({
				query: {
					...this.$route.query,
					shop: this.$props.shopDetails.name,
					page: "1",
				},
			});
		}

		public get productsFound() {
			if (this.shopData != null) {
				return this.shopData.productCount;
			}
			console.log(this.$props.shopDetails.name);
			return 0;
		}
	}
</script>


<style scoped>
	.result-content-holder {
		height: 100%;
		width: 100%;
		justify-self: center;
		align-self: center;
		background-color: white;
		border-radius: 1rem;
		display: grid;
		grid-template-columns: 1fr minmax(16.5rem, auto) 1fr;
		grid-template-rows: 1fr minmax(16.5rem, auto) 1fr;
		box-shadow: 0 0 2rem 0 rgba(21, 166, 207, 0.05);
	}
	
	/*.result-content-holder {*/
	/*	height: 100%;*/
	/*	width: 100%;*/
	/*	justify-self: center;*/
	/*	align-self: center;*/
	/*	background-color: white;*/
	/*	border-radius: 1rem;*/
	/*	display: grid;*/
	/*	grid-template-columns: 1fr minmax(auto, 12.5rem) 1fr;*/
	/*	grid-template-rows: 1fr minmax(auto, 12.5rem) 1fr;*/
	/*	box-shadow: 0 0 2rem 0 rgba(21, 166, 207, 0.07);*/
	/*}*/
	
	@keyframes animate-result-holder-in {
		to {
			opacity: 1;
		}
	}
	
	/*#result-details {*/
	/*	display: grid;*/
	/*	position: relative;*/
	/*	height: calc(100%);*/
	/*	grid-column: 2;*/
	/*	grid-row: 2;*/
	/*	grid-template-rows: minmax(auto, 1.09fr) 1px 1fr 1px minmax(auto, 1.09fr);*/
	/*}*/
	
	#result-details {
		display: grid;
		position: relative;
		height: calc(100%);
		grid-column: 2;
		grid-row: 2;
		grid-template-rows: minmax(auto, 1.09fr) auto 1fr auto minmax(auto, 1.09fr);
	}
	
	#shop-info {
		display: grid;
		position: relative;
		justify-self: start;
		width: 100%;
		grid-template-rows: 1fr 8fr 3fr;
		grid-template-columns: minmax(4.125rem, auto) 1fr;
		grid-column-gap: 1.5rem;
	}
	
	/*#shop-info {*/
	/*	display: grid;*/
	/*	position: relative;*/
	/*	justify-self: start;*/
	/*	width: 100%;*/
	/*	grid-template-rows: 1fr 8fr 3fr;*/
	/*	grid-template-columns: minmax(3.125rem, auto) 1fr;*/
	/*	grid-column-gap: 1.25rem;*/
	/*}*/
	
	#shop-icon-holder {
		grid-column: 1;
		grid-row: 2;
		width: 4.125rem;
		height: 4.125rem;
	}
	
	#shop-icon {
		height: 100%;
	}
	
	/*#shop-icon {*/
	/*	grid-column: 1;*/
	/*	grid-row: 2;*/
	/*	width: 3.125rem;*/
	/*	height: 3.125rem;*/
	/*	align-self: center;*/
	/*	justify-self: center;*/
	/*}*/
	
	#shop-text-holder {
		display: grid;
		height: fit-content;
		width: fit-content;
		grid-column: 2;
		grid-row: 2;
		grid-template-rows: auto auto;
		grid-row-gap: .45rem;
		align-self: center;
		justify-self: start;
	}
	
	/*#shop-text-holder {*/
	/*	display: grid;*/
	/*	height: fit-content;*/
	/*	width: fit-content;*/
	/*	grid-column: 2;*/
	/*	grid-row: 2;*/
	/*	grid-template-rows: auto auto;*/
	/*	grid-row-gap: .25rem;*/
	/*	align-self: center;*/
	/*	justify-self: start;*/
	/*}*/
	
	/*#shop-name {*/
	/*	grid-row: 1;*/
	/*	font-family: "Poppins", sans-serif;*/
	/*	font-size: 1.125rem;*/
	/*	font-weight: 600;*/
	/*	line-height: 1.22em;*/
	/*}*/
	
	#shop-name {
		grid-row: 1;
		font-family: "Poppins", sans-serif;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.22em;
	}
	
	.section-separator {
		box-sizing: border-box;
		height: 1px;
		width: 100%;
		background: #000000;
		opacity: 0.1;
	}
	
	#upper.section-separator {
		grid-row: 2;
	}
	
	#lower.section-separator {
		grid-row: 4;
	}
	
	/*.section-separator.vertical {*/
	/*	height: 40%;*/
	/*	width: 1px;*/
	/*	grid-row: 1 / span 2;*/
	/*	grid-column: 2;*/
	/*	align-self: center;*/
	/*	top: 5%;*/
	/*	position: relative;*/
	/*}*/
	
	.section-separator.vertical {
		height: 70%;
		width: 2px;
		grid-row: 1 / span 2;
		grid-column: 2;
		align-self: center;
		position: relative;
	}
	
	#shop-website {
		color: rgba(38, 38, 38, 0.8);
		outline: none;
		cursor: pointer;
		text-decoration: none;
		font-family: "Poppins", sans-serif;
		font-size: .75rem;
		font-weight: 500;
		line-height: 1.167em;
	}
	
	/*#shop-website {*/
	/*	color: rgba(38, 38, 38, 0.8);*/
	/*	font-family: "Poppins", sans-serif;*/
	/*	font-size: .625rem;*/
	/*	font-weight: 500;*/
	/*	line-height: 1.167em;*/
	/*}*/
	
	/*.product-details-btn {*/
	/*	grid-row: 5;*/
	/*	display: block;*/
	/*	font-family: "Poppins", sans-serif;*/
	/*	font-size: 1em;*/
	/*	font-weight: 600;*/
	/*	width: 100%;*/
	/*	height: 3.75rem;*/
	/*	background: white;*/
	/*	border-radius: .3125rem;*/
	/*	color: #15A6CF;*/
	/*	border: 1px solid #15A6CF;*/
	/*	align-self: end;*/
	/*	transition: .15s background-color ease-in, 0.15s color ease-in;*/
	/*}*/
	
	.product-details-btn {
		grid-row: 5;
		display: block;
		font-family: "Poppins", sans-serif;
		font-size: .875em;
		width: 100%;
		height: 2.875rem;
		background: white;
		border-radius: .3125rem;
		color: #15A6CF;
		border: 1px solid #15A6CF;
		align-self: center;
		transition: .15s background-color ease-in, 0.15s color ease-in;
	}
	
	.product-details-btn:hover {
		transition: .15s background-color ease-out, 0.15s color ease-out;
		color: white;
		background: #15A6CF;
	}
	
	/*#product-details {*/
	/*	display: grid;*/
	/*	grid-row: 3;*/
	/*	width: 100%;*/
	/*	height: 100%;*/
	/*	grid-template-columns: 1fr 1px 1fr;*/
	/*	grid-template-rows: 1fr 1fr;*/
	/*	row-gap: .625rem;*/
	/*	padding: 0 .75rem;*/
	/*	box-sizing: border-box;*/
	/*}*/
	
	#shop-products-details {
		display: grid;
		grid-row: 3;
		width: 100%;
		height: 100%;
		grid-template-columns: 1fr 1px 1fr;
		grid-template-rows: 1fr 1fr;
		row-gap: .4375rem;
		box-sizing: border-box;
	}
	
	/*.dataTitle {*/
	/*	height: fit-content;*/
	/*	width: fit-content;*/
	/*	color: rgba(0, 0, 0, .6);*/
	/*	font-family: "Poppins", sans-serif;*/
	/*	font-size: .875rem;*/
	/*	letter-spacing: 0.05em;*/
	/*	line-height: 1.125rem;*/
	/*}*/
	
	.dataTitle {
		height: fit-content;
		width: fit-content;
		color: rgba(0, 0, 0, .6);
		font-family: "Poppins", sans-serif;
		font-size: .75rem;
		letter-spacing: 0.05em;
	}
	
	#products-found-title {
		justify-self: start;
		align-self: end;
	}
	
	/*.dataText {*/
	/*	height: fit-content;*/
	/*	width: 95%;*/
	/*	opacity: 0.7;*/
	/*	font-family: "Poppins", sans-serif;*/
	/*	font-size: 1.125rem;*/
	/*	font-weight: 600;*/
	/*	letter-spacing: 0.025em;*/
	/*	line-height: 1.22em;*/
	/*	white-space: nowrap;*/
	/*	text-overflow: ellipsis;*/
	/*	overflow: hidden;*/
	/*	text-align: end;*/
	/*}*/
	
	.dataText {
		height: fit-content;
		width: 95%;
		opacity: 0.7;
		font-family: "Poppins", sans-serif;
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		line-height: 1.22em;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: end;
	}
	
	#products-found {
		grid-row: 2;
		grid-column: 1;
		justify-self: start;
		color: rgb(21, 166, 207);
		align-self: start;
		text-align: start;
	}
	
	#avg-price-title {
		grid-row: 1;
		grid-column: 3;
		justify-self: end;
		align-self: end;
	}
	
	#avg-price {
		grid-row: 2;
		grid-column: 3;
		justify-self: end;
		align-self: start;
		color: rgb(253, 162, 50);
	}
	
	@media screen and (max-width: 900px) {
		.result-content-holder {
			grid-template-columns: 1fr minmax(15rem, auto) 1fr;
			grid-template-rows: 1fr minmax(15rem, auto) 1fr;
		}
		
		#shop-products-details {
			row-gap: 0.3125rem;
		}
		
		#shop-info {
			grid-template-columns: 3.5rem 1fr;
			grid-column-gap: 1rem;
		}
		
		#shop-icon-holder {
			width: 3.5rem;
			height: 3.5rem;
		}
		
		#shop-name {
			font-size: 0.875rem;
		}
		
		#shop-website {
			font-size: 0.625rem;
		}
		
		.dataTitle {
			font-size: 0.625rem;
		}
		
		.dataText {
			font-size: 0.875rem;
		}
		
		.product-details-btn {
			font-size: .75rem;
			height: 2.5rem;
			border-radius: .25rem;
		}
	}
	
	@media screen and (max-width: 400px) {
		.result-content-holder {
			grid-template-columns: 1fr minmax(7.25rem, auto) 1fr;
			grid-template-rows: 1fr minmax(7.25rem, auto) 1fr;
			border-radius: 0.625rem
		}
		
		#shop-products-details {
			row-gap: 0.3125rem;
		}
		
		#shop-info {
			grid-template-columns: 1.875rem 1fr;
			grid-column-gap: 0.625rem;
		}
		
		#shop-icon-holder {
			width: 1.875rem;
			height: 1.875rem;
		}
		
		#shop-text-holder {
			grid-row-gap: .25rem;
		}
		
		#shop-name {
			font-size: 0.625rem;
		}
		
		#shop-website {
			font-size: 0.375rem;
		}
		
		.dataTitle {
			font-size: 0.375rem;
		}
		
		.dataText {
			font-size: 0.5rem;
		}
		
		.product-details-btn {
			font-size: .5rem;
			height: 1.5rem;
			width: 7.25rem;
			border-radius: .25rem;
		}
	}
</style>
