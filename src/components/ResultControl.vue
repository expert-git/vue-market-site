<template>
	<div class="control-content">
		<transition name="fade">
			<img id="control-icon" :alt="`${controlText}-icon`" :class="this.iconLoaded ? 'loaded' : ''"
			     :src="require(`../assets/images/result_control/${this.controlIconName}`)"
			     v-on:load="setIconLoaded(true)">
		</transition>
		<label id="control-text" :class="this.iconLoaded ? 'loaded' : ''">
			{{controlText}}
		</label>
	
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator";

	@Component({})
	export default class ResultControl extends Vue {

		public iconLoaded: boolean = false;
		@Prop({
			default: "",
			type: String,
		}) private controlText!: string;

		@Prop({
			default: "",
			type: String,
		}) private controlIconName!: string;

		constructor() {
			super();
		}

		public setIconLoaded(isLoaded: boolean) {
			this.iconLoaded = isLoaded;
		}
	}
</script>

<style scoped>
	.control-content {
		user-select: none;
		cursor: pointer;
		display: grid;
		padding: 0 1rem;
		width: fit-content;
		height: fit-content;
		grid-template-rows: .8125rem 1.5rem .8125rem;
		grid-column-gap: .625rem;
		border-radius: .3125rem;
		background-color: #FFFFFF;
		transition: box-shadow .45s ease-out;
		box-shadow: 0 0 16px rgba(0, 0, 0, 0.025);
	}
	
	.control-content:hover, .control-content:active {
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
	}
	
	
	#control-icon {
		pointer-events: none;
		opacity: 0;
		grid-row: 2;
		grid-column: 1;
		align-self: center;
		justify-self: center;
		width: .875rem;
		transition: opacity .6s cubic-bezier(0.23, 1, 0.32, 1);
	}
	
	#control-icon.loaded {
		opacity: 1;
	}
	
	#control-text {
		pointer-events: none;
		opacity: 0;
		grid-row: 2;
		grid-column: 2;
		align-self: center;
		justify-self: center;
		color: #000000;
		font-family: "Poppins", sans-serif;
		font-size: .875em;
		font-weight: 500;
		/*line-height: 1.125rem;*/
		letter-spacing: .04em;
		transition: opacity .6s cubic-bezier(0.23, 1, 0.32, 1);
		/*padding: 1rem 0;*/
	}
	
	#control-text.loaded {
		opacity: 1;
	}
	
	@media screen and (max-width: 900px) {
		.control-content {
			grid-template-rows: .5rem 1.5rem .5rem;
		}
		
		#control-text {
			font-size: .75em;
		}
		
		#control-icon {
			width: .75em;
		}
	}
	
	@media screen and (max-width: 800px) {
		.control-content {
			grid-template-rows: .5rem 1rem .5rem;
			grid-column-gap: .5rem;
		}
		
		#control-text {
			font-size: .625em;
		}
		
		#control-icon {
			width: .625em;
		}
	}
	
	@media screen and (max-width: 650px) {
		.control-content {
			padding: 0 .75rem;
		}
		
		
		#control-text {
			display: none;
		}
		
		#control-icon {
			width: .625em;
		}
	}
	
	#control-text.loaded {
		opacity: 1;
	}
	
	@media screen and (max-width: 500px) {
		.control-content {
			background-color: transparent;
			box-shadow: none;
			padding: 0 .75rem;
			cursor: auto;
		}
		
		.control-content:hover, .control-content:active {
			box-shadow: none;
		}
		
	}

</style>
