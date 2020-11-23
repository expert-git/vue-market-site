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
				<label id="products-found-title" class="dataTitle">Profiles Found</label>
				<label id="products-found" class="dataText">
					{{getDataForSocial(shopDetails.name).length + ' Profiles'}}
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
	import {Component} from "vue-property-decorator";
	import ResultShop from "@/components/ResultShop.vue";
	import {mapGetters} from "vuex";

	@Component({
		computed: {
			...mapGetters(["getDataForSocial"]),
		},
	})
	export default class ResultSocial extends ResultShop {
		public gotoDetails() {
			this.$router.push({
				query: {
					...this.$route.query,
					social: this.$props.shopDetails.name,
					page: "1",
				},
			});
		}
	}
</script>
