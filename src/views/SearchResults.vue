<template>
	<div id="container" class="container">
		<section id="search-results-section" :class="this.resultsShowing ? 'results-shown' : ''"
		         class="search-results-section">
			<transition name="fade">
				<searched-path-indicator />
			</transition>
			<transition name="fade">
				<label id="bold-search-name" v-if="this.$route.query.q">RESULTS FOR {{this.$route.query.q}}</label>
			</transition>
			<shop-and-product-counts :num-of-products="numOfProducts" :num-of-shops-and-socials="numOfShopsAndSocials"
			                         :show-product-count="showProductCount" :show-shop-count="showShopCount" />
			<result-controls-holder :show-controls="resultsShowing" />
			<transition name="fade">
				<div class="results-categories-holder"
				     v-if="!this.$route.query.shop && !this.$route.query.social && numOfShopsAndSocials > 0">
					<transition-group name="shops-list">
						<results-category :category-name="category" v-bind:key="category"
						                  v-for="category in this.categoriesFound"></results-category>
					</transition-group>
				</div>
			</transition>
			<transition name="fade">
				<div class="results-categories-holder" v-if="this.$route.query.shop">
					<transition name="stops-list">
						<shop-details-holder />
					</transition>
				</div>
			</transition>
			<transition name="fade">
				<div class="results-categories-holder" v-if="this.$route.query.social">
					<transition name="shops-list">
						<social-details-holder />
					</transition>
				</div>
			</transition>
			<transition name="fade">
				<div class="no_results_info_holder" v-if="!this.resultsShowing">
					<img id="no_results_image" alt="" src="../assets/images/no_results.svg">
					<label id="no_results_text">No results found</label>
				</div>
			</transition>
			<transition name="fade">
				<div class="see_popular_shops" v-if="!this.resultsShowing">
					<label id="checkout_popular_shops_text">Check out our most popular shops</label>
					<div id="popular_shops_holder">
					
					</div>
				</div>
			</transition>
		</section>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {mapGetters, mapState} from "vuex";
	import ResultControl from "@/components/ResultControl.vue";
	import ResultControlsHolder from "@/components/ResultControlsHolder.vue";
	import ResultsCategory from "@/components/ResultsCategory.vue";
	import SearchedPathIndicator from "@/components/SearchedPathIndicator.vue";
	import ShopAndProductCounts from "@/components/ShopAndProductCounts.vue";
	import ShopDetailsHolder from "@/components/ShopDetailsHolder.vue";
	import SocialDetailsHolder from "@/components/SocialDetailsHolder.vue";

	@Component({
		components: {
			ResultControl,
			ResultControlsHolder,
			ResultsCategory,
			SearchedPathIndicator,
			ShopAndProductCounts,
			ShopDetailsHolder,
			SocialDetailsHolder,
		},
		async beforeMount() {
			const {query} = this.$route;
			if (query.shop || query.social) {
				if (!query.page) {
					this.$router.push({
						query: {
							...this.$route.query,
							page: "1",
						},
					});
				}
			}

			this.$store.commit("setCurrentShopName", query.shop);
			this.$store.commit("setCurrentSocialName", query.social);
			await this.$store.dispatch("loadResultsData", this.$route.query);
		},
		computed: {
			...mapGetters({
				numOfShopsAndSocials: "numberOfShopsAndSocials",
				isLoadingData: "isLoadingData",
				currentShopData: "getCurrentShopData",
				currentSocialData: "getCurrentSocialData",
			}),
			...mapState({
				categoriesFound: "categoriesFound",
			}),

			numOfProducts(): number {
				if (this.$route.query.shop && !this.$route.query.social && this.currentShopData) {
					return this.currentShopData.count;
				} else if (!this.$route.query.shop && this.$route.query.social && this.currentSocialData) {
					return this.currentSocialData.length;
				}
			},

			showShopCount(): boolean {
				return this.numOfShopsAndSocials > 0 && !this.showProductCount;
			},

			showProductCount(): boolean {
				return this.numOfProducts > 0;
			},

			resultsShowing(): boolean {
				if (this.numOfShopsAndSocials > 0) {
					return true;
				}
				return this.isLoadingData;
			},
		},
		watch: {
			"$route.query": {
				handler(query, oldQuery) {
					if (query && query.q !== oldQuery.q) {
						this.$store.dispatch("loadResultsData", query);
					}
					if (query && query.shop !== oldQuery.shop) {
						this.$store.commit("setCurrentShopName", query.shop);
					}
					if (query && query.social !== oldQuery.social) {
						this.$store.commit("setCurrentSocialName", query.social);
					}
					const main = document.getElementsByClassName("main")[0];

					if (main.scrollTop < (window.innerHeight * 2.5)) {
						main.scrollTo({top: 0, behavior: "smooth"});
					} else {
						main.scrollTo({top: 0});
					}
				},
				deep: true,
			},
		},

	})
	export default class SearchResults extends Vue {

	}
</script>

<style scoped>
	.container {
		display: grid;
		height: 100%;
		width: auto;
		top: 1%;
		min-height: calc(100vh - 5.5rem - 1%);
		position: relative;
		margin: 0 3rem;
	}
	
	.search-results-section {
		width: 100%;
		height: fit-content;
		min-height: 100%;
		display: grid;
		grid-row: 1;
		border-radius: 3.125rem 3.125rem 0 0;
		grid-template-rows: 4.625rem 3.75rem 2.5rem minmax(0px, auto) minmax(20rem, 1fr) minmax(21.25rem, auto);
		grid-template-columns: 3.125rem minmax(auto, 1fr) auto 3.125rem;
		background-color: rgba(241, 244, 248, 0.6);
	}
	
	.search-results-section.results-shown {
		grid-template-rows: 4.625rem 3.75rem 2.5rem minmax(0px, auto) minmax(20rem, 1fr) 10rem;
	}
	
	#bold-search-name {
		user-select: none;
		justify-self: start;
		align-self: end;
		grid-row: 2;
		grid-column: 2;
		font-family: "Poppins", sans-serif;
		font-size: 1.5rem;
		font-weight: bold;
		color: rgba(38, 38, 38, 0.8);
		letter-spacing: 0.0075rem;
		/*line-height: 1.875rem;*/
		opacity: 0;
		animation: .3s .6s animate-children-in ease forwards;
	}
	
	@keyframes animate-children-in {
		to {
			opacity: 1;
		}
	}
	
	.results-categories-holder {
		display: grid;
		grid-auto-rows: auto;
		grid-row: 5;
		grid-column: 2 / span 2;
		height: fit-content;
		width: 100%;
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity .6s;
	}
	
	.fade-enter, .fade-leave-to {
		transition: none;
		opacity: 0;
	}
	
	.shops-list-enter-active, .shops-list-leave-active {
		transition: opacity .6s ease-out;
	}
	
	.shops-list-enter, .shops-list-leave-to {
		transition: none;
		opacity: 0;
	}
	
	.no_results_info_holder {
		height: fit-content;
		display: grid;
		grid-template-rows: 1fr auto;
		width: fit-content;
		justify-self: center;
		align-self: center;
		row-gap: 1.25rem;
		grid-row: 3 / span 3;
		grid-column: 2;
	}
	
	#no_results_image {
		width: 18rem;
		justify-self: center;
		align-self: center;
	}
	
	#no_results_text {
		color: rgba(41, 41, 41, 0.5);
		font-family: "Nunito", sans-serif;
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.0625em;
		justify-self: center;
		align-self: center;
		text-align: center;
		grid-row: 2;
	}
	
	.see_popular_shops {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-row-gap: 2.5rem;
		grid-row: 6;
		grid-column: 2 / span 2;
		margin-bottom: 3.75rem;
	}
	
	#checkout_popular_shops_text {
		font-family: "Nunito", sans-serif;
		font-weight: bold;
		font-size: 1.25rem;
		color: rgba(41, 41, 41, 0.8);
		align-self: center;
		justify-self: start;
	}
	
	#popular_shops_holder {
		grid-auto-rows: 22.5rem;
		row-gap: 2.5rem;
		grid-auto-flow: row dense;
	}
	
	@media screen and (max-width: 1024px) {
		.container {
			margin: 0;
		}
	}
	
	@media screen and (max-width: 900px) {
		.search-results-section {
			grid-template-rows: 4.625rem 3.25rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr) minmax(21.25rem, auto);
		}
		
		.search-results-section.results-shown {
			grid-template-rows: 4.625rem 3.25rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr);
		}
		
		#bold-search-name, #no_results_text {
			font-size: 1.25rem;
		}
		
		#no_results_image {
			width: 16rem;
		}
		
		#checkout_popular_shops_text {
			font-size: 1.125rem;
		}
		
	}
	
	@media screen and (max-width: 800px) {
		#bold-search-name, #no_results_text {
			font-size: 1.125rem;
		}
		
		.no_results_info_holder {
			row-gap: 1.125rem;
		}
		
		#no_results_image {
			width: 14.5rem;
		}
		
		.container {
			min-height: calc(100vh - 5rem - 1%);
		}
		
		#checkout_popular_shops_text {
			font-size: 1.125rem;
		}
		
		.search-results-section {
			border-radius: 2em 2rem 0 0;
			grid-template-columns: 2rem minmax(auto, 1fr) auto 2rem;
		}
	}
	
	@media screen and (max-width: 700px) {
		.search-results-section {
			grid-template-columns: 1.5rem minmax(auto, 1fr) auto 1.5rem;
			grid-template-rows: 3.125rem 2.5rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr) minmax(21.25rem, auto);
		}
		
		.search-results-section.results-shown {
			grid-template-rows: 3.125rem 2.5rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr);
		}
		
		.no_results_info_holder {
			row-gap: .625rem;
		}
		
		#no_results_image {
			width: 12.5rem;
		}
		
		#checkout_popular_shops_text {
			font-size: 1rem;
		}
		
	}
	
	@media screen and (max-width: 500px) {
		.search-results-section {
			border-radius: 1.25rem 1.25rem 0 0;
		}
	}
	
	@media screen and (max-width: 400px) {
		.search-results-section {
			grid-template-rows: 0 2rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr) minmax(21.25rem, auto);
			grid-template-columns: .625rem minmax(auto, 1fr) auto .625rem;
		}
		
		.search-results-section.results-shown {
			grid-template-rows: 0 2rem 1.85rem minmax(0px, auto) minmax(20rem, 1fr);
		}
		
		#bold-search-name {
			display: none;
		}
		
		.no_results_info_holder {
			row-gap: 1rem;
		}
		
		#no_results_text {
			font-size: 1rem;
		}
		
		#no_results_image {
			width: 10rem;
		}
		
		#checkout_popular_shops_text {
			font-size: 0.875rem;
		}
		
	}

</style>
