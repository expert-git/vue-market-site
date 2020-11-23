<template>
	<div class="category-content">
		<label id="category-name">{{categoryName}}</label>
		<div class="category-shops-holder" v-if="isSocial()">
			<result-social :shop-details="social" v-bind:key="index" v-for="(social,index) in socialsFound" />
		</div>
		<div class="category-shops-holder" v-if="isECommerce()">
			<result-shop :shop-details="shop" v-bind:key="index" v-for="(shop,index) in shopsFound" />
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {mapGetters} from "vuex";
	import ResultShop from "@/components/ResultShop.vue";
	import ResultSocial from "@/components/ResultSocial.vue";
	import {ShopCategories} from "@/models/Shops";

	@Component({
		components: {ResultSocial, ResultShop},
		props: {
			categoryName: {
				type: String,
				default: null,
			},
		},
		computed: {
			...mapGetters({
				shopsFound: "shopsFound",
				socialsFound: "socialsFound",
			}),
		},
	})
	export default class ResultsCategory extends Vue {
		public isECommerce() {
			return this.$props.categoryName === ShopCategories.ECommerce;
		}

		public isSocial() {
			return this.$props.categoryName === ShopCategories.SocialMedia;
		}
	}
</script>

<style scoped>
	.category-content {
		display: grid;
		grid-template-rows: 5rem 3rem;
		width: 100%;
		height: fit-content;
	}
	
	#category-name {
		justify-self: start;
		align-self: start;
		grid-row: 2;
		font-family: "Poppins", sans-serif;
		color: #262626;
		font-size: 1.125rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		line-height: 1.22em;
	}
	
	.category-shops-holder {
		height: fit-content;
		display: grid;
		grid-row: 3;
		grid-template-columns: repeat(auto-fit, 20rem);
		grid-auto-rows: 20rem;
		grid-auto-flow: dense;
		justify-content: space-between;
		grid-row-gap: .725rem;
		/*margin-bottom: 10rem;*/
	}
	
	/*#category-shops-holder {*/
	/*	height: fit-content;*/
	/*	display: grid;*/
	/*	grid-row: 3;*/
	/*	grid-template-columns: repeat(auto-fit, 25rem);*/
	/*	grid-auto-rows: minmax(25rem, auto);*/
	/*	grid-auto-flow: dense;*/
	/*	grid-column-gap: 3.225%;*/
	/*	grid-row-gap: 1.875rem;*/
	/*  margin-bottom: 10rem;*/
	/*}*/
	
	@media screen and (max-width: 900px) {
		.category-content {
			grid-template-rows: 4rem 2.5rem;
		}
		
		#category-name {
			font-size: 0.875rem;
		}
		
		.category-shops-holder {
			grid-template-columns: repeat(auto-fit, 18rem);
			grid-auto-rows: 18rem;
		}
	}
	
	@media screen and (max-width: 400px) {
		.category-content {
			grid-template-rows: 1.25rem 2rem;
		}
		
		#category-name {
			font-size: 0.75rem;
		}
		
		.category-shops-holder {
			grid-template-columns: repeat(auto-fit, 8.5rem);
			grid-auto-rows: 8.5rem;
			column-gap: 2.5%;
		}
	}
</style>
