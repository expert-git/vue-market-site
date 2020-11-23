<template>
	<div class="container">
		<login-button class="login-button" v-if="!this.$store.getters.isUserLoggedIn"/>
		<div id="main-content">
			<img id="blue-oval-placeholder" alt="oval-card" src="../assets/images/circle_card.svg" />
			<label id="call-to-action" for="search-input">Search for a {{searchType.toLowerCase()}}</label>
			<div id="search-box-holder">
				<dotted-square :dotColor="dotColors.Black" :squareType="squareSizes.Small" class="left" />
				<div id="search-box">
					<input id="search-input" placeholder="Input your search query" spellcheck="false" type="text"
					       v-model.trim="searchString" v-on:keyup.enter="doSearch()" />
					<button id="search-button" v-bind:disabled="disableSearch" v-on:click="doSearch()">SEARCH</button>
				</div>
				<dotted-square :dotColor="dotColors.Black" :squareType="squareSizes.Small" class="right" />
				<span id="shop-search-label">I'm looking for a shop</span>
				<toggle-button id="search-type-toggle" v-on:toggled="switchSearchType" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue} from "vue-property-decorator";
	import DottedSquare from "@/components/DottedSquare.vue";
	import Component from "vue-class-component";
	import {DotColors, SquareTypes} from "@/types/DottedSquares";
	import LoginButton from "@/components/LoginButton.vue";
	import ToggleButton from "@/components/reuseables/ToggleButton.vue";
	import {SearchType} from "@/models/SearchType";

	// TODO: implement Enter to search functionality
	@Component({
		components: {
			ToggleButton,
			LoginButton,
			DottedSquare,
		},
	})
	export default class Home extends Vue {
		public searchString: string = "";
		public searchType: SearchType = SearchType.ProductSearch;
		public squareSizes = SquareTypes;
		public dotColors = DotColors;
		
		get disableSearch() {
			return this.searchString.trim() === "" || !Number.isNaN(Number(this.searchString));
		}

		public doSearch() {
			if (this.searchType === SearchType.ProductSearch) {
				if (this.searchString && this.searchString.length > 0) {
					this.$router.push({path: "/search", query: {q: this.searchString}});
				}
			} else if (this.searchType === SearchType.ShopSearch) {
				this.$router.push({path: "/shop-search", query: {q: this.searchString}});
			}
		}

		public switchSearchType(toggleState) {
			switch (toggleState) {
				case "on":
					this.searchType = SearchType.ShopSearch;
					break;
				case "off":
					this.searchType = SearchType.ProductSearch;
					break;
			}
		}
	}
</script>

<style scoped>
	.container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-rows: 5.625rem 1fr 1.08fr 1.356fr;
		grid-template-columns: .05fr .9fr .05fr;
	}
	
	.login-button {
		align-self: center;
		grid-column: 2;
		justify-self: end;
	}
	
	.dotted-square.left {
		grid-row: 1;
		grid-column: 1;
	}
	
	.dotted-square.right {
		grid-row: 4;
		grid-column: 2;
		align-self: end;
		justify-self: end;
	}
	
	#main-content {
		display: grid;
		width: 100%;
		height: 100%;
		grid-row: 3;
		grid-column: 2;
		font-size: calc(14px + (20 - 14) * ((100vw - 320px) / (1920 - 320)));
		grid-template-rows: auto 1fr fit-content(100%);
	}
	
	#blue-oval-placeholder {
		display: block;
		align-self: start;
		width: 2.67em;
		height: 2.67em;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: 0 0.5rem 3rem 0 rgba(14, 130, 232, 0.25);
		justify-self: center;
		grid-column: 1;
	}
	
	/* TODO: change font-weight back to 400 after putting Sofia Pro font */
	#call-to-action {
		font-family: "Poppins", sans-serif;
		font-size: 1.5em;
		font-weight: 400;
		line-height: 4em;
		align-self: center;
		width: fit-content;
		height: fit-content;
		opacity: 1;
		transition: opacity .3s ease-out;
		text-align: center;
		letter-spacing: .015em;
		color: #262626;
		justify-self: center;
	}
	
	#search-box-holder {
		display: grid;
		row-gap: .5rem;
		position: relative;
		align-self: center;
		width: 50vw;
		min-width: 40rem;
		max-width: 60rem;
		max-height: 112px;
		justify-self: center;
		grid-template-columns: 1fr auto;
		column-gap: .5rem;
	}
	
	/deep/ .dotted-square {
		position: absolute;
		opacity: .25;
	}
	
	/deep/ .dotted-square.left {
		top: 2.25rem;
		left: -2.25rem;
	}
	
	/deep/ .dotted-square.right {
		top: -2.25rem;
		right: -2.25rem;
	}
	
	@media screen and (max-width: 768px) {
		/deep/ .dotted-square {
			display: none;
		}
		
		#search-box-holder {
			width: 90vw;
			min-width: unset;
			max-width: unset;
		}
	}
	
	#search-box {
		display: grid;
		z-index: 99;
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		padding: .5rem;
		transition: box-shadow .6s ease;
		border: 2px solid #15A6CF;
		border-radius: 1rem;
		background-color: #FFFFFF;
		grid-row: 1;
		grid-column: 1 / span 2;
		grid-template-columns: auto minmax(auto, auto);
	}
	
	#search-box:focus-within {
		transform: translateZ(1em);
		box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.2);
	}
	
	#search-input {
		font-family: "Poppins", sans-serif;
		position: relative;
		font-size: .8em;
		line-height: 2em;
		align-self: center;
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		color: #262626;
		padding: .5rem 1rem;
		opacity: 1;
		transition: opacity .3s ease-out, color .3s ease-out;
		border: none;
		grid-column: 1;
	}
	
	@-webkit-keyframes autofill {
		to {
			color: #262626;
			background: transparent;
		}
	}
	
	#search-input:-webkit-autofill {
		-webkit-animation-name: autofill;
		-webkit-animation-fill-mode: both;
	}
	
	#search-input::placeholder {
		color: rgba(38, 38, 38, 0.6);
	}
	
	#search-input:focus::placeholder {
		color: #262626;
	}
	
	#search-input:focus {
		outline: none;
	}
	
	#search-button {
		font-family: "Poppins", sans-serif;
		font-size: 0.8em;
		font-weight: bold;
		text-align: center;
		letter-spacing: .15rem;
		color: white;
		transition: background-color .3s ease-out;
		border: none;
		border-radius: .75rem;
		justify-self: end;
		background-color: #25A2CD;
		width: 100%;
		min-width: 6rem;
		max-width: 8rem;
	}
	
	button#search-button:disabled {
		transition: color .3s ease-in, background-color .3s ease-in;
		background-color: rgb(225, 225, 225);
		cursor: not-allowed;
	}
	
	#search-type-toggle {
		grid-row: 2;
		width: 2em;
		height: 1em;
		border-radius: .5em;
		align-self: center;
		justify-self: end;
	}
	
	#shop-search-label {
		grid-row: 2;
		height: fit-content;
		align-self: center;
		font-family: "Poppins", sans-serif;
		font-size: .875em;
		color: #484848;
		justify-self: end;
	}
</style>
