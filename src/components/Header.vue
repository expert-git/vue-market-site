<template>
	<header class="header-bar">
		<img id="logo" :src="logoImg" alt="logo" v-on:click="goHome" />
		<nav-bar-search id="nav-search" v-on:reload="reloadSearch()" />
		<currency-picker id="currency-placeholder" />
		<login-button id="login-button" />
	</header>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import LoginButton from "@/components/LoginButton.vue";
	import CurrencyPicker from "@/components/CurrencyPicker.vue";
	import NavBarSearch from "@/components/NavBarSearch.vue";

	const CMTLogo = require("../assets/images/header_bar/cmt_logo.svg");
	const BackArrow = require("../assets/images/header_bar/back_arrow.svg");

	@Component({
		components: {NavBarSearch, CurrencyPicker, LoginButton},
		mounted() {
			this.windowWidth = window.innerWidth;
			window.addEventListener("resize", () => {
				this.windowWidth = window.innerWidth;
			});
		},
	})
	export default class HeaderBar extends Vue {
		public windowWidth: number = 0;

		public reloadSearch() {
			this.$emit("reload");
		}

		public goHome() {
			if (this.windowWidth > 550) {
				this.$router.push({name: "home"});
			} else {
				this.$router.go(-1);
			}
		}

		get logoImg() {
			return this.windowWidth > 550 ? CMTLogo : BackArrow;
		}
	}
</script>

<style scoped>
	
	.header-bar {
		display: grid;
		height: 5.5rem;
		grid-row: 1;
		padding: 0 3.125rem;
		position: sticky;
		top: 0;
		grid-column: 2;
		border: none;
		align-items: center;
		z-index: 99999;
		/*box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);*/
		background: white;
		grid-template-columns: auto minmax(0, auto) .5fr auto auto;
	}
	
	#nav-search {
		grid-column: 3;
		justify-self: center;
		align-self: center;
		max-width: 40rem;
		min-width: 20rem;
	}
	
	#login-button {
		grid-column: 5;
		justify-self: end;
	}
	
	#currency-placeholder {
		grid-column: 4;
		justify-self: center;
	}
	
	
	#logo {
		justify-self: start;
		height: 70%;
		cursor: pointer;
	}
	
	@media screen and (max-width: 1024px) {
		.header-bar {
			padding: 0 3.125rem;
		}
	}
	
	@media screen and (max-width: 800px) {
		.header-bar {
			height: 5rem;
		}
		
		#nav-search {
			max-width: 32rem;
			min-width: 16rem;
		}
	}
	
	@media screen and (max-width: 700px) {
		.header-bar {
			padding: 0 1.5rem;
		}
	}
	
	@media screen and (max-width: 650px) {
		.header-bar {
			height: 4.25rem;
		}
		
		#logo {
			height: 3rem;
		}
		
	}
	
	@media screen and (max-width: 549px) {
		#logo {
			width: 1.25rem;
		}
		
		#login-button {
			display: none;
		}
	}
	
	@media screen and (max-width: 500px) {
		#logo {
			width: .75rem;
		}
		
		#currency-placeholder {
			grid-column: span 2;
		}
		
		#nav-search {
			min-width: 14rem;
		}
	}
	
	@media screen and (max-width: 400px) {
		.header-bar {
			padding: 0 1rem;
		}
		
		#currency-placeholder {
			justify-self: end;
		}
	}
</style>
