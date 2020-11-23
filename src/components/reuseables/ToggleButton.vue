<template>
	<span class="toggle_holder" v-bind:class="getState()" v-on:click="doToggle()">
		<span id="toggle" v-bind:class="getState()">
		
		</span>
	</span>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			initial: {
				default: false,
				required: false,
				type: Boolean,
			},
		},
		mounted(): void {
			this.state = this.$props.initial;
		},
	})
	export default class ToggleButton extends Vue {
		private state: boolean = false;

		public getState() {
			return this.state ? "on" : "off";
		}

		public doToggle() {
			this.state = !this.state;
			this.$emit("toggled", this.getState());
		}
	}
</script>

<style scoped>
	.toggle_holder {
		background-color: rgba(21, 166, 207, .8);
		position: relative;
		display: grid;
		overflow: hidden;
		box-sizing: border-box;
		transition: background-color .15s;
	}
	
	.toggle_holder.off {
		background-color: #c7c7c7;
	}
	
	#toggle {
		width: 50%;
		background-color: #FFFFFF;
		border-radius: 50%;
		border: 1px solid;
		box-sizing: border-box;
		transition: transform .15s, box-shadow .15s;
	}
	
	#toggle.off {
		transform: translate3d(0px, 0px, 0px);
		box-shadow: 0 0 2px rgba(0, 0, 0, .25);
		border-color: #c7c7c7;
	}
	
	#toggle.on {
		transform: translate3d(100%, 0px, 0px);
		box-shadow: 0 0 4px rgba(0, 0, 0, .5);
		border-color: rgb(68, 184, 217);
	}
</style>
