<template>
	<div class="product-content-holder">
		<div id="image-container" :style="`background-image: url('${this.productDetails.Image}');`"></div>
		<!--		<label>{{this.productDetails.shop}}</label>-->
		<div id="product-details-holder">
			<label id="product-name">{{this.productDetails.Name}}</label>
			<div id="seller-info">
				<div id="seller-profile">
					<img id="seller-avatar" alt="seller avatar" src="../assets/images/details_icons/seller_avatar.svg">
					<label id="seller-name">{{this.productDetails["seller name"]}}</label>
				</div>
				<span class="section-separator vertical"></span>
				<star-rating :rating="rating" class="star-rating" />
			</div>
			<label id="product-price">{{productPrice}}</label>
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
	export default class StoreProduct extends Vue {
		constructor() {
			super();
		}
	}
</script>

<style scoped>
	.product-content-holder {
		height: 18.125rem;
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
		padding: .5rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center bottom;
		background-origin: content-box;
		border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
	}
	
	#product-details-holder {
		display: grid;
		grid-template-rows: 1.05fr 1fr 1.2fr;
		padding: 0 1rem;
	}
	
	#product-name {
		height: fit-content;
		width: 99%;
		color: rgba(38, 38, 38, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-size: .875em;
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
		color: #15A6CF;
		font-family: "Nunito Sans", sans-serif;
		font-size: 1em;
		font-weight: bold;
		align-self: center;
		justify-self: center;
	}
	
	#seller-info {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 2px .8fr;
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
		grid-column-gap: .625rem;
		height: fit-content;
		width: 100%;
		align-self: center;
		justify-self: start;
	}
	
	#seller-avatar {
		height: 1rem;
		width: 1rem;
		font-size: .25em;
		grid-column: 1;
		border-radius: 100%;
	}
	
	#seller-name {
		width: 95%;
		grid-column: 2;
		color: rgba(38, 38, 38, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-weight: 600;
		font-size: 0.625em;
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
</style>
