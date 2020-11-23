<template>
	<img :class="`${squareType}`" :src="squareSvg" alt="dotted_square_space" class="dotted-square">
</template>
<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator";
	import {DotColors, SquareTypes} from "@/types/DottedSquares";

	const blueDottedSquare = require("../assets/images/dotted_square_blue.svg");
	const blackDottedSquare = require("../assets/images/dotted_square_black.svg");

	@Component
	export default class DottedSquare extends Vue {
		@Prop({default: SquareTypes.Large})
		public squareType!: SquareTypes;

		@Prop({default: DotColors.Blue})
		public dotColor!: DotColors;

		get squareSvg() {
			switch (this.dotColor) {
				case DotColors.Blue:
					return blueDottedSquare;
				case DotColors.Black:
					return blackDottedSquare;
			}
		}
	}
</script>
<style scoped>
	
	.dotted-square {
		z-index: -1;
	}
	
	.dotted-square.small {
		width: 4.5rem;
		height: 4.5rem;
	}
	
	.dotted-square.large {
		width: 6.25rem;
		height: 6.25rem;
	}

</style>
