<template>
	<label id="search-path-indicator" v-if="this.$route.query.q">
		<span v-on:click="goBackToHome">Search</span>
		<span v-on:click="goBackToResults">{{getQueryString}}</span>
		<span v-if="this.$route.query.shop || this.$route.query.social">{{getShop}}</span>
	</label>
</template>
<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {getDisplayName, ShopCategories} from "@/models/Shops";

	@Component({
		props: {},
		computed: {
			getQueryString() {
				const q = this.$route.query.q;
				if (q) {
					return q;
				}
			},

			getShop() {
				const shop = this.$route.query.shop;
				const social = this.$route.query.social;
				if (shop && !social) {
					return `\t${getDisplayName(shop, ShopCategories.ECommerce)}`;
				} else if (!shop && social) {
					return `\t${getDisplayName(social, ShopCategories.SocialMedia)}`;
				}
			},
		},
	})
	export default class SearchedPathIndicator extends Vue {
		public goBackToResults() {
			this.$router.push({query: {q: this.$route.query.q}});
		}

		public goBackToHome() {
			this.$router.push({name: "home"});
		}

	}
</script>
<style scoped>
	
	#search-path-indicator {
		user-select: none;
		justify-self: start;
		align-self: end;
		grid-row: 1;
		grid-column: 2;
		font-family: "Poppins", sans-serif;
		color: rgba(23, 24, 31, 0.65);
		font-size: .75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		/*line-height: 0.875rem;*/
		opacity: 0;
		animation: .6s animate-children-in ease forwards;
	}
	
	@keyframes animate-children-in {
		to {
			opacity: 1;
		}
	}
	
	#search-path-indicator > span:not(:last-child) {
		cursor: pointer;
		color: rgb(21, 166, 207);
	}
	
	#search-path-indicator > span:not(:last-child)::after {
		content: "   >   ";
		white-space: pre;
	}
	
	#search-path-indicator > span:not(:last-child):hover {
		cursor: pointer;
		color: rgb(17, 134, 166);
	}
	
	@media screen and (max-width: 900px) {
		#search-path-indicator {
			font-size: 0.625rem;
		}
		
		#search-path-indicator > span:not(:last-child)::after {
			content: " > ";
			white-space: pre;
		}
	}
	
	@media screen and (max-width: 400px) {
		#search-path-indicator {
			display: none;
		}
	}

</style>
