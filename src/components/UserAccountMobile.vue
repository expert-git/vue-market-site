<template>
	<div class="mobile-dropdown" v-click-outside="closeDropdown">
		<div  @click="dropdown">
			<div class="line line-sm"></div>
			<div class="line line-l"></div>
			<div class="line line-sm line-last"></div>
		</div>
		<div class="dropdown-menu-container" v-if="isDropdownActive">
				<div class="dropdown-item-title">Hi, {{this.$store.getters.getUserFirstName}}</div>
				<div class="dropdown-item">
					<div class="icon">
						<div class="oval"></div>
						<div class="shoulders"></div>
					</div>
					<div class="label">Account</div>
				</div>
				<div class="dropdown-item not-first">
					<div class="icon">
						<img id="shopping-bag" alt="expand dropdown" src="../assets/images/shopping-bag_black.svg">
					</div>
					<div class="label">Your cart</div>
				</div>
				<div class="dropdown-item not-first">
					<div class="icon">
						<img alt="expand dropdown" src="../assets/images/shopping-bag_black.svg">
					</div>
					<div class="label">History</div>
				</div>
				<div class="dropdown-item not-first">
					<div class="icon">
						<img alt="expand dropdown" src="../assets/images/shopping-bag_black.svg">
					</div>
					<div class="label">Help</div>
				</div>
				<div class="dropdown-item not-first">
					<div class="icon">
						<img id="log-out" class="img-logout" src="../assets/images/header_bar/log-out.svg">
					</div>
					<div class="label" @click="logOut()">Log Out</div>
				</div>
				<!--<div class="dropdown-item settings">Account Settings</div>-->
				<!--<div class="dropdown-item logout" @click="logOut()">Log Out <img id="log-out" class="img-logout" src="../assets/images/header_bar/log-out.svg" ></div>-->
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
	export default class UserAccountMobile extends Vue {
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
	.line {
		box-sizing: border-box;
		height: 0.8px;
		border: 1.0px solid rgba(0,0,0,0.8);
		margin-top: 6px;
		margin-left : 15px;
	}
	.line-sm {
		width: 12px;
	}
	.line-l {
		width: 24px;
	}
	.line-last {
		margin-left : 27px;
	}
	.mobile-dropdown {
		align-self: center;
	}
	.dropdown-menu-container {
		height: 100vh;
		top: 0;
		width: 165px;
		position: absolute;
		border-radius: 0 20px 20px 0;
		background-color: #FFFFFF!important;
		box-shadow: 0 15px 40px 0 rgba(37,162,205,0.05);
	}
	.dropdown-item-title {
		width: 100%;
		height: 22px;
		color: #17181F;
		font-family: "Nunito Sans";
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 0.11px;
		line-height: 22px;
		padding-top: 60px;
		padding-left: 20px;
		color: rgba(23,24,31,0.8);
	}
	.dropdown-item {
		width: 100%;
		height: 30px;
		padding-left: 20px;
		padding-top: 40px;
	}
	.dropdown-item.not-first {
		padding-top: 20px;
	}
	.dropdown-item .icon {
		min-width: 30px;
		align-self: center;
		display: inline-block;
	}
	.dropdown-item .label {
		display: inline-block;
	}
	
	.dropdown-item .oval {
		box-sizing: border-box;
		height: 8px;
		width: 8px;
		border: 1px solid #000000;
		border-radius: 4px;
		margin-left: 3.5px;
	}
	.shoulders {
		box-sizing: border-box;
		height: 6.63px;
		width: 16px;
		border: 1px solid #000000;
		border-radius: 4px;
		border-bottom-width: 0px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 0px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 0px;
		margin-top: 2px;
	}
</style>


