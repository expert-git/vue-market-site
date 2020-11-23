<template>
	<div class="store-products-holder">
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
			<div id="products-holder" v-if="activeTab === 'products'">
				<store-product :index="index" :key="index" :product-details="product"
				               v-for="(product, index) in currentStoreData.products" v-if="setRange(index)" />
			</div>
		</transition>
		<transition name="fade">
			<div class="page-navigation-panel" v-if="currentStoreData.products.length > 0 && activeTab === 'products'">
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
	// import {Component} from "vue-property-decorator";
	import ResultsSectionTag from "@/components/ResultsSectionTag.vue";
	import StoreProduct from "@/components/StoreProduct.vue";
	import {mapGetters} from "vuex";
	import PageIndicator from "@/components/PageIndicator.vue";
	import DirectionPageIndicator from "@/components/DirectionPageIndicator.vue";
	import {Vue} from "vue-property-decorator";
	import Component from "vue-class-component";

	@Component({
		components: {DirectionPageIndicator, PageIndicator, StoreProduct, ResultsSectionTag},
		computed: {
			...mapGetters({
				currentStoreData: "getCurrentStoreData",
			}),

		},
		methods: {
			isCurrentPage(page: number) {
				if (page === this.$data.currentPage) {
					return "current";
				}
				return "";
			},
			setPage(page: number) {
				if (page) {
					let ticking = false;
					const self = this;
					const container = document.getElementById("container");
					const scrollListener = e => {
						if (!ticking) {
							window.requestAnimationFrame(() => {
								setTimeout(() => {
									self.$data.currentPage = page;
									document.getElementsByClassName("main")[0].removeEventListener("scroll", scrollListener);
								}, 450);
								ticking = false;
							});

							ticking = true;
						}
					};
					document.getElementsByClassName("main")[0].addEventListener("scroll", scrollListener);
					container.scrollIntoView({block: "start", behavior: "smooth"});
				}
			},
			movePage(direction: string) {
				if (direction && direction === "next") {
					(this as any).setPage(this.$data.currentPage + 1);
				} else if (direction && direction === "previous") {
					(this as any).setPage(this.$data.currentPage - 1);
				}
			},
		},
		props: {},
		data() {
			return {
				currentPage: 1,
			};
		},
	})
	export default class StoreProductsHolder extends Vue {
		public activeTab: string = "products";
		public lowerLimit: number = 0;
		public currentStoreData!: any;
		public self: StoreProductsHolder = this;

		// public onLastPage!: boolean;


		get numberOfPagesNeeded() {
			if (this.currentStoreData.products.length > 15) {
				return Math.ceil(this.currentStoreData.products.length / 15);
			} else {
				return 1;
			}
		}

		get onLastPage() {
			return this.$data.currentPage === this.numberOfPagesNeeded;
		}

		get onFirstPage() {
			return this.$data.currentPage === 1;
		}

		public showIndicator(page: number) {
			if (this.$data.currentPage >= 3 && !this.onLastPage) {
				return page === this.$data.currentPage || page === this.$data.currentPage + 1 || page === this.$data.currentPage - 1;
			}
			if (this.onLastPage) {
				return page === this.$data.currentPage || page === this.$data.currentPage - 1 || page === this.$data.currentPage - 2;
			}
			return page <= 3;
		}

		public setActive(tabName: string) {
			this.activeTab = tabName;
		}

		public setRange(index: number): boolean {
			const pageIncrement = (this.$data.currentPage - 1) * 15;
			const upperLimit = this.lowerLimit + 15 + pageIncrement;
			if (index >= this.lowerLimit + pageIncrement) {
				return index < upperLimit;
			}
			return false;
		}
	}
</script>

<style scoped>
	.store-products-holder {
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
		grid-auto-rows: 18rem;
		grid-auto-flow: dense;
		grid-column-gap: 1.5%;
		grid-row-gap: 1.25rem;
	}
	
	.page-navigation-panel {
		align-self: center;
		justify-self: center;
		height: fit-content;
		width: fit-content;
		justify-content: center;
		grid-row: 5;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 2.5rem;
		grid-template-rows: 2.5rem;
		grid-column-gap: .625rem;
		cursor: pointer;
	}
</style>
