<template>
	<div class="currency-dropdown" v-click-outside="closeDropdown">
		<img id="shopping-bag" alt="expand dropdown" src="../assets/images/account_icon.png" @click="dropdown">
		<div class="dropdown-menu-container" v-if="isDropdownActive">
			<div class="dropdown-menu-top"/>
			<div class="dropdown-menu">
				<div class="dropdown-item-title">Hi, {{this.$store.getters.getUserFirstName}}</div>
				<div class="dropdown-item history">History</div>
				<div class="dropdown-item settings">Account Settings</div>
				<div class="dropdown-item logout" @click="logOut()">Log Out <img id="log-out" class="img-logout" src="../assets/images/header_bar/log-out.svg" ></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	
	import {Component, Vue} from "vue-property-decorator";
	@Component({
		directives: {
			'click-outside': {
				bind: function(el, binding, vNode) {
					// Provided expression must evaluate to a function.
					if (typeof binding.value !== 'function') {
						const compName = vNode.context.name
						let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
						if (compName) { warn += `Found in component '${compName}'` }

						console.warn(warn)
					}
					// Define Handler and cache it on the element
					const bubble = binding.modifiers.bubble
					const handler = (e) => {
						if (bubble || (!el.contains(e.target) && el !== e.target)) {
							binding.value(e)
						}
					}
					el.__vueClickOutside__ = handler

					// add Event Listeners
					document.addEventListener('click', handler)
				},

				unbind: function(el, binding) {
					// Remove Event Listeners
					// @ts-ignore
					document.removeEventListener('click', el.__vueClickOutside__)
					// @ts-ignore
					el.__vueClickOutside__ = null

				}
			}
		},
		
	})
	export default class UserAccount extends Vue {
		public isDropdownActive: boolean = false;
		closeDropdown() : void {
			if (!this.isDropdownActive) return;
			document.getElementsByClassName("container")[0].classList.remove("fade");
			this.isDropdownActive = false;
		};
		dropdown() : void {
			if (!this.isDropdownActive) {
				document.getElementsByClassName("container")[0].classList.add("fade");
			} else {
				document.getElementsByClassName("container")[0].classList.remove("fade");
			}
			this.isDropdownActive = !this.isDropdownActive;
		};
		async logOut() {
			await this.$store.dispatch("signOut", {});
			this.closeDropdown()
		}
	}
</script>

<style scoped>
	.currency-dropdown {
		display: grid;
		grid-template-columns: auto auto;
		position: relative;
	}
	
	label {
		font-family: "Poppins", sans-serif;
		font-size: .75em;
		font-weight: 700;
		letter-spacing: .0625rem;
	}
	
	#expand-dropdown {
		margin-left: .25rem;
		justify-self: end;
		align-self: center;
	}
	.dropdown-menu-container {
		position: absolute;
		top: 100%;
		right: -40px;
		left: auto;
	}
	.dropdown-menu-top {
		height: 45px;
		width: 70px;
		background-color: #FFFFFF;
		transform: translateX(85px) translateY(45px) rotate(45deg);
		border-radius: 5px;
	}
	.dropdown-menu {
		/*display: none;*/
		float: left;
		height: 200px;
		width: 170px;
		border-radius: 15px;
		background-color: #FFFFFF;
		/*position: relative;*/
	}
	.dropdown-item-title {
		width: 100%;
		height: 24px;
		opacity: 0.8;
		color: #17181F;
		font-family: "Nunito Sans";
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 0.13px;
		line-height: 24px;
		padding-top: 25px;
		padding-left: 25px;
		/*position: absolute;*/
	}
	.dropdown-item {
		width: 100%;
		height: 19px;
		color: rgba(23,24,31,0.8);;
		font-family: "Nunito Sans";
		font-weight: bold;
		font-size: 14px;
		letter-spacing: 0.1px;
		line-height: 19px;
		padding-left: 25px;
	}
	.dropdown-item.history {
		padding-top: 20px;
	}
	.dropdown-item.settings {
		padding-top: 10px;
	}
	.dropdown-item.logout {
		padding-top: 39px;
		cursor: pointer;
	}
	.dropdown-item.logout .img-logout{
		padding-left: 15px;
		vertical-align: sub;
	}
	
</style>


