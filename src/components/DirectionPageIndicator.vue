<template>
	<div :class="indicatorIconDirection" class="direction-page-indicator" v-on:click="handleClick">
		<label id="direction-text">{{indicatorDirection}}</label>
		<img :class="indicatorIconDirection" alt="" src="../assets/images/details_icons/direction_arrow_icon.svg" />
	</div>
</template>

<script lang="ts">

	import {Component, Prop, Vue} from "vue-property-decorator";

	@Component({})
	export default class DirectionPageIndicator extends Vue {

		@Prop({
			type: String,
			required: true,
			default: "",
		})
		public indicatorDirection!: string;

		public handleClick() {
			this.$emit("click");
		}

		get indicatorIconDirection() {
			if (String(this.indicatorDirection)) {
				return String(this.indicatorDirection);
			}
		}
	}
</script>

<style scoped>
	.direction-page-indicator {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: 1fr;
		grid-auto-flow: column;
		grid-column-gap: .5rem;
		grid-column-end: span 2;
		color: #15A6CF;
		transition: color .3s ease-out, background-color .3s ease-out;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		background: transparent;
		border-radius: .3125rem;
		cursor: pointer;
		z-index: 50;
		pointer-events: all;
	}
	
	.direction-page-indicator:hover {
		background: rgba(21, 166, 207, 0.2);
	}
	
	.previous {
		grid-column-end: span 3;
	}
	
	label#direction-text {
		color: inherit;
		font-weight: bold;
		font-size: .875em;
		font-family: "Nunito Sans", sans-serif;
		width: fit-content;
		height: fit-content;
		cursor: pointer;
	}
	
	@media screen and (max-width: 900px) {
		.direction-page-indicator {
			grid-column-gap: .25rem;
		}
		
		label#direction-text {
			font-size: .75em;
		}
		
		img {
			transform: scale(.75);
		}
	}
	
	img.previous {
		transform: rotate3d(0, 1, 0, 180deg);
		grid-column: 1;
	}

</style>
