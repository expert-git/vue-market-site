<template>
	<header class="header-bar">
		<user-account-mobile id="user-account-mobile" v-if="$isMobile()"/>
		<img id="logo" alt="logo" src="../assets/images/cmt_logo.svg" v-on:click="goHome" v-if="!$isMobile()"/>
		<category-picker id="category-picker" v-show="this.$route.name !== 'home'" v-if="!$isMobile()"/>
		<nav-bar-search id="nav-search" v-show="this.$route.name !== 'home'"/>
		<shopping-bag id="shopping-bag" v-show="this.$route.name !== 'home'" v-if="!$isMobile()"/>
		<wish-list id="wish-list" v-show="this.$route.name !== 'home'"/>
		<currency-picker id="currency-placeholder" v-show="this.$route.name !== 'home'"/>
		<my-store-button id="login-button" v-if="!$isMobile()"/>
		<user-account id="user-account" v-if="!$isMobile()" />
	</header>
	
</template>


<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import MyStoreButton from "@/components/MyStoreButton.vue";
	import CurrencyPicker from "@/components/CurrencyPicker.vue";
	import NavBarSearch from "@/components/NavBarSearch.vue";
	import CategoryPicker from "@/components/CategoryPicker.vue";
	import ShoppingBag from "@/components/ShoppingBag.vue";
	import WishList from "@/components/WishList.vue";
	import UserAccount from "@/components/UserAccount.vue";
	import UserAccountMobile from "@/components/UserAccountMobile.vue";

	@Component({
		components: {NavBarSearch, CurrencyPicker, MyStoreButton, CategoryPicker, ShoppingBag, WishList, UserAccount, UserAccountMobile},
	})
	export default class LoggedInHeader extends Vue {
		public goHome() {
			this.$router.push({name: "home"});
		}
	}
</script>

<style scoped>
	.header-bar {
		display: grid;
		height: 5.5rem;
		grid-row: 1;
		position: sticky;
		top: 0;
		grid-column: 1;
		border: none;
		z-index: 99999;
		background: white;
		grid-template-columns: 0.14fr .095fr .42fr .03fr .03fr .05fr .17fr .04fr;
	}

	#logo {
		justify-self: center;
		align-self: center;
		height: 70%;
		cursor: pointer;
	}

	#category-picker{
		grid-column: 2;
		justify-self: center;
		align-self: center;
	}
	
	#nav-search {
		grid-column: 3;
		justify-self: start;
		align-self: center;
	}

	#shopping-bag{
		grid-column: 4;
		align-self: center;
		justify-self: center;
	}

	#wish-list{
		grid-column: 5;
		align-self: center;
		justify-self: center;
	}

	
	#login-button {
		grid-column: 7;
		align-self: center;
		justify-self: center;
	}
	
	#currency-placeholder {
		grid-column: 6;
		align-self: center;
		justify-self: center;
	}

	#user-account{
		grid-column: 8;
		align-self: center;
		justify-self: center;
	}

	@media screen and (max-width: 500px){
		.header-bar {
			grid-template-columns: 15% 0% 60% 0% 5% 15% 10% 0%;
		}
		.container{
			padding: 0 10px;
		}
	}
</style>
