<template>
	<div class="search-holder">
		<img id="search-icon" alt="search icon" src="../assets/images/search_icon.svg">
		<input id="search-input" placeholder="Search for a product or store here" spellcheck="false"
		       v-model.trim="searchString" v-on:keyup.enter="doSearch()" />
	</div>
</template>

<script lang="ts">
	import {Component} from "vue-property-decorator";
	import Vue from "vue";

	@Component({})
	export default class NavBarSearch extends Vue {
		public searchString: string = "";

		public doSearch() {
			if (this.searchString && this.searchString.length > 0) {
				if (this.$route.query.q === this.searchString) {
					this.$emit("reload");
				}
				this.$router.push({path: "/search", query: {q: this.searchString}});
			}
		}

	}
</script>

<style scoped>
	.search-holder {
		display: grid;
		box-sizing: border-box;
		width: 95%;
		border: .0625rem solid rgba(23, 24, 31, .75);
		height: fit-content;
		border-radius: .3rem;
		grid-template-columns: .11fr .89fr;
	}
	
	#search-icon {
		height: 31.25%;
		align-self: center;
		justify-self: center;
	}
	
	#search-input {
		width: calc(100% - 1.25rem);
		justify-self: start;
		align-self: center;
		font-family: "Poppins", sans-serif;
		font-size: .75rem;
		line-height: 300%;
		background: transparent;
		letter-spacing: .0625rem;
		border: none;
		outline: none;
	}
	
	@media screen and (max-width: 800px) {
		#search-input {
			font-size: .625rem;
		}
	}
	
	@media screen and (max-width: 650px) {
		#search-input {
			width: calc(100% - .75rem);
		}
	}
	
	@media screen and (max-width: 500px) {
		#search-input {
			font-size: .5625rem;
		}
	}

</style>
