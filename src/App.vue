<template>
	<div class="main" v-if="this.$store.getters.getLoginChecked">
		<header-bar v-if="this.$route.name === 'search' && !this.$store.getters.isUserLoggedIn" v-on:reload="refreshKey()" />
		<header-bar-loggedin v-if="this.$store.getters.isUserLoggedIn" />
		<!--<header-bar-loggedin />-->
		<router-view :key="viewKey()"/>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import HeaderBar from "@/components/Header.vue";
	import LoggedInHeader from "@/components/LoggedInHeader.vue";
	import firebase from 'firebase/app';
	import 'firebase/auth';
	const firebaseApp = firebase.initializeApp(require('./firebase.json'));
	
	


	@Component({
		components: {
			'header-bar' : HeaderBar,
			'header-bar-loggedin' : LoggedInHeader
		},
		async beforeMount() {
			const that = this;
			await firebaseApp.auth().onAuthStateChanged(function(user) {
				that.$store.commit("setLoginChecked", true);
				if (user && user.emailVerified) {
					that.$store.commit("setUserLoggedIn", true);
					that.$store.commit("setUserFirstName", user.displayName);
				} else {
					that.$store.commit("setUserLoggedIn", false);
				}
			});
			await this.$store.dispatch("loadRates");
		},
	})
	export default class App extends Vue {
		public static getRandomInt(min, max, previous) {
			min = Math.ceil(min);
			max = Math.floor(max);
			let newNumber = Math.floor(Math.random() * (max - min)) + min;
			if (newNumber === previous) {
				newNumber *= max;
			}
			return newNumber; // The maximum is exclusive and the minimum is inclusive
		}

		public reloadKey = 0;

		public viewKey() {
			return `${this.$route.name}${this.$route.fullPath}${this.reloadKey}`;
		}

		public refreshKey() {
			this.reloadKey = App.getRandomInt(0, 10, this.reloadKey);
		}
	}
</script>

<style>
	.main {
		width: 100%;
		height: 100%;
		margin: 0;
		overflow-x: hidden;
		position: relative;
		min-width: 320px;
	}
	
	button {
		cursor: pointer;
		outline: none;
	}
	
	a {
		text-decoration: none;
	}
	.fade {
		opacity: 0.5!important;
		background-color: rgba(23,24,31,0.4);
	}
</style>
