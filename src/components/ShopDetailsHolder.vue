<template>
	<div class="shop-products-holder">
		<transition name="fade">
			<div id="tags-holder">
				<results-section-tag id="products-tag" :active="activeTab === 'products'" class="results-section-tag"
				                     section-tag-icon="open_box_with_two_hearts" section-tag-name="Products"
				                     v-on:click="setActive('products')" />
				
				<results-section-tag id="shop-tag" :active="activeTab === 'shop'" class="results-section-tag"
				                     section-tag-icon="shop_icon" section-tag-name="Shop"
				                     v-on:click="setActive('shop')" />
			</div>
		</transition>
		<transition name="fade">
			<div id="products-holder" v-if="activeTab === 'products' && currentShopData != null">
				<shop-product :index="index" :key="index" :product-details="product"
				              v-for="(product, index) in currentShopData.products" v-if="setRange(index)" />
			</div>
		</transition>
		<transition name="fade">
			<div class="page-navigation-panel"
			     v-if="currentShopData && currentShopData.products.length > 0 && activeTab === 'products'">
				<direction-page-indicator indicator-direction="previous" v-if="!onFirstPage"
				                          v-on:click="movePage('previous')" />
				<page-indicator :class="isCurrentPage(page)" :key="page" :page-number="page"
				                v-for="(page) in numberOfPagesNeeded" v-if="showIndicator(page)"
				                v-on:click="setPage(page)" />
				<direction-page-indicator indicator-direction="next" v-if="!onLastPage" v-on:click="movePage('next')" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {mapGetters} from "vuex";
	import DirectionPageIndicator from "@/components/DirectionPageIndicator.vue";
	import PageIndicator from "@/components/PageIndicator.vue";
	import ResultsSectionTag from "@/components/ResultsSectionTag.vue";
	import ShopProduct from "@/components/ShopProduct.vue";

	@Component({
		components: {DirectionPageIndicator, PageIndicator, ShopProduct, ResultsSectionTag},
		computed: {
			...mapGetters({
				currentShopData: "getCurrentShopData",
			}),

		},
	})
	export default class ShopProductsHolder extends Vue {
		public activeTab: string = "products";
		public lowerLimit: number = 0;
		public currentShopData!: any;
		public self: ShopProductsHolder = this;

		public isCurrentPage(page: number) {
			if (page === this.currentPage) {
				return "current";
			}
			return "";
		}

		public movePage(direction: string) {
			if (direction && direction === "next") {
				this.setPage(this.currentPage + 1);
			} else if (direction && direction === "previous") {
				this.setPage(this.currentPage - 1);
			}
		}

		public setPage(page: number) {
			if (page && page !== this.currentPage) {
				this.$router.push({
					query: {
						...this.$route.query,
						page: `${page}`,
					},
				});
			}
		}

		// public onLastPage!: boolean;

		get currentPage() {
			return Number(this.$route.query.page);
		}

		get numberOfPagesNeeded() {
			if (this.currentShopData) {
				return this.currentShopData.products.length > 15 ? Math.ceil(this.currentShopData.products.length / 15) : 1;
			}
		}

		get onLastPage() {
			return this.currentPage === this.numberOfPagesNeeded;
		}

		get onFirstPage() {
			return this.currentPage === 1;
		}

		public showIndicator(page: number) {
			if (this.currentPage >= 3 && !this.onLastPage) {
				return page === this.currentPage || page === this.currentPage + 1 || page === this.currentPage - 1;
			}
			if (this.onLastPage) {
				return page === this.currentPage || page === this.currentPage - 1 || page === this.currentPage - 2;
			}
			return page <= 3;
		}

		public setActive(tabName: string) {
			this.activeTab = tabName;
		}

		public setRange(index: number): boolean {
			const pageIncrement = (this.currentPage - 1) * 15;
			const upperLimit = this.lowerLimit + 15 + pageIncrement;
			if (index >= this.lowerLimit + pageIncrement) {
				return index < upperLimit;
			}
			return false;
		}
	}
</script>

<style scoped>
	.shop-products-holder {
		display: grid;
		height: fit-content;
		width: 100%;
		grid-template-rows: 4.5rem auto 2.75rem 1fr 11.25rem;
	}
	
	#tags-holder {
		display: grid;
		grid-row: 2;
		grid-auto-flow: column;
		grid-template-columns: auto auto 1fr;
		grid-column-gap: .5rem;
		width: fit-content;
	}
	
	#products-holder {
		display: grid;
		grid-row: 4;
		grid-template-columns: repeat(auto-fit, 15rem);
		grid-auto-rows: 18.125rem;
		grid-auto-flow: dense;
		grid-column-gap: 1.5%;
		grid-row-gap: 1.25rem;
	}
	
	@media screen and (max-width: 900px) {
		#products-holder {
			grid-template-columns: repeat(auto-fit, 14.21875rem);
			grid-auto-rows: 17.1875rem;
			grid-row-gap: 1.125rem;
		}
	}
	
	@media screen and (max-width: 800px) {
		#products-holder {
			grid-template-columns: repeat(auto-fit, 13rem);
			grid-auto-rows: 15rem;
			grid-row-gap: 1.125rem;
		}
		
		.shop-products-holder {
			grid-template-rows: 3.75rem auto 2.75rem 1fr 11.25rem;
		}
	}
	
	@media screen and (max-width: 700px) {
		.shop-products-holder {
			grid-template-rows: 1.5rem auto 2.75rem 1fr 11.25rem;
		}
		
		#tags-holder {
			grid-column-gap: .25rem;
		}
	}
	
	/*@media screen and (max-width: 500px) {*/
	/*	#products-holder {*/
	/*		grid-template-columns: repeat(auto-fit, 8.5rem);*/
	/*		grid-auto-rows: 9.75rem;*/
	/*		grid-row-gap: 1rem;*/
	/*	}*/
	/*	*/
	/*	.shop-products-holder {*/
	/*		grid-template-rows: 1rem auto 1.25rem 1fr 11.25rem;*/
	/*	}*/
	/*	*/
	/*}*/
	
	@media screen and (max-width: 500px) {
		#products-holder {
			justify-self: center;
			grid-template-columns: repeat(auto-fit, 14.21875rem);
			grid-auto-rows: 17.1875rem;
			grid-row-gap: 1.125rem;
		}
	}
	
	.page-navigation-panel {
		align-self: center;
		justify-self: center;
		height: fit-content;
		width: fit-content;
		justify-content: center;
		grid-row: 5;
		display: grid;
		position: relative;
		grid-auto-flow: column;
		grid-auto-columns: 2.5rem;
		grid-template-rows: 2.5rem;
		grid-column-gap: .625rem;
		user-select: none;
		pointer-events: none;
		background: transparent !important;
	}
	
	@media screen and (max-width: 900px) {
		.page-navigation-panel {
			grid-auto-columns: 2rem;
			grid-template-rows: 2rem;
		}
	}
	
	@media screen and (max-width: 800px) {
		.page-navigation-panel {
			grid-auto-columns: 1.5rem;
			grid-template-rows: 1.5rem;
		}
	}

</style>
