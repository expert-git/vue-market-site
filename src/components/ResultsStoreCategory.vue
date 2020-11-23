<template>
	<div class="category-content">
		<label id="category-name">{{categoryName}}</label>
		<div class="category-stores-holder" v-if="isSocial()">
			<result-social :store-details="social" v-bind:key="index" v-for="(social,index) in socialsFound" />
		</div>
		<div class="category-stores-holder" v-if="isECommerce()">
			<result-store :store-details="shop" v-bind:key="index" v-for="(shop,index) in storesFound" />
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import ResultStore from "@/components/ResultStore.vue";
	import {mapGetters} from "vuex";
	import {ShopCategories} from "@/models/Shops";
	import ResultSocial from "@/components/ResultSocial.vue";

	@Component({
		components: {ResultSocial, ResultStore},
		props: {
			categoryName: {
				type: String,
				default: null,
			},
		},
		computed: {
			...mapGetters({
				storesFound: "storesFound",
				socialsFound: "socialsFound",
			}),
		},
	})
	export default class ResultsStoreCategory extends Vue {
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
	
	.category-stores-holder {
		height: fit-content;
		display: grid;
		grid-row: 3;
		/*grid-template-columns: repeat(auto-fit, minmax(20rem, auto));*/
		/*grid-auto-rows: minmax(20rem, auto);*/
		grid-template-columns: repeat(auto-fit, 20rem);
		grid-auto-rows: 20rem;
		grid-auto-flow: dense;
		grid-column-gap: 1%;
		grid-row-gap: .725rem;
		/*margin-bottom: 10rem;*/
	}
	
	/*#category-stores-holder {*/
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
</style>
