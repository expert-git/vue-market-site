<template>
	<div class="product-content-holder">
		<div id="image-container" :style="`background-image: url('${imageSource}');`"></div>
		<!--		<label>{{this.productDetails.shop}}</label>-->
		<div id="product-details-holder">
			<label id="product-name">{{ this.productDetails.Name }}</label>
			<div id="seller-info">
				<div id="seller-profile">
					<img id="seller-avatar" alt="seller avatar"
					     src="../assets/images/details_icons/seller_avatar.svg" />
					<label id="seller-name">{{sellerName}}
					</label>
				</div>
				<span class="section-separator vertical"></span>
				<star-rating :rating="rating" class="star-rating" />
			</div>
			<label id="product-price">{{ productPrice }}</label>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {formatNumberToIDR, getPriceByShop} from "@/helper";
	import StarRating from "@/components/StarRating.vue";

	@Component({
		components: {StarRating},
		computed: {
			productPrice() {
				return getPriceByShop(this.productDetails["price Show"], this.$store.getters.getCurrentShopName, this.$store.getters.getCurrency);
			},
			rating() {
				const rating = Number(this.productDetails.rate);
				return !isNaN(rating) ? rating : 0;
			},
			sellerName() {
				if (this.productDetails["seller name"] !== (null || "null")) {
					return this.productDetails["seller name"];
				}
				return "—";
			},
			imageSource() {
				const {Image} = this.productDetails;
				if (Image) {
					const imageString = Image as string;
					if (imageString.startsWith("http") || imageString.startsWith("www")) {
						return imageString;
					} else {
						return `http://${imageString}`;
					}
				} else {
					return "";
				}
			},
		},
		props: {
			index: {
				default: 0,
				required: false,
				type: Number,
			},
			productDetails: {},
		},
	})
	export default class ShopProduct extends Vue {
		constructor() {
			super();
		}


	}
</script>

<style scoped>
	.product-content-holder {
		height: 100%;
		width: 100%;
		position: relative;
		justify-self: center;
		align-self: center;
		background-color: white;
		border-radius: 1.25rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(9.06rem, auto) 1fr;
		overflow: hidden;
		box-shadow: 0 0 1rem 0 rgba(21, 166, 207, 0.1);
	}
	
	div#image-container {
		grid-row: 1;
		padding: 0.5rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center bottom;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
	}
	
	#product-details-holder {
		overflow: hidden;
		display: grid;
		grid-template-rows: auto auto auto;
		margin: 0 1rem;
	}
	
	#product-name {
		height: fit-content;
		width: 99%;
		color: rgba(38, 38, 38, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-size: 1rem;
		font-weight: bold;
		align-self: center;
		justify-self: start;
		text-align: start;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	#product-price {
		grid-row: 3;
		height: fit-content;
		width: fit-content;
		color: #15a6cf;
		font-family: "Nunito Sans", sans-serif;
		font-size: 1em;
		font-weight: bold;
		align-self: center;
		justify-self: center;
	}
	
	#seller-info {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr 2px 0.8fr;
		width: 100%;
		height: 100%;
		grid-row: 2;
	}
	
	.section-separator.vertical {
		box-sizing: border-box;
		background: #000000;
		opacity: 0.1;
		height: 80%;
		width: 1px;
		grid-row: 1 / span 2;
		grid-column: 2;
		align-self: center;
		justify-self: center;
		position: relative;
	}
	
	#seller-profile {
		display: grid;
		grid-row: 1;
		grid-column: 1;
		grid-template-columns: auto 1fr;
		grid-column-gap: 0.625rem;
		height: fit-content;
		width: 100%;
		align-self: center;
		justify-self: start;
	}
	
	#seller-avatar {
		height: 1rem;
		width: 1rem;
		font-size: 0.25em;
		grid-column: 1;
		border-radius: 100%;
	}
	
	#seller-name {
		width: 90%;
		grid-column: 2;
		color: rgba(38, 38, 38, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-weight: 600;
		font-size: 0.75rem;
		text-align: start;
		justify-self: start;
		align-self: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.star-rating {
		grid-row: 1;
		grid-column: 3;
		align-self: center;
		justify-self: end;
	}
	
	@media screen and (max-width: 900px) {
		#product-name {
			font-size: 0.875rem;
		}
		
		#seller-name {
			font-size: 0.625rem;
		}
		
		#product-price {
			font-size: 0.875rem;
		}
		
		#seller-avatar {
			width: 0.875rem;
			height: 0.875rem;
		}
	}
	
	@media screen and (max-width: 500px) {
		.product-content-holder {
			border-radius: 1.25rem;
		}
		
		#seller-name {
		}
	}
</style>
