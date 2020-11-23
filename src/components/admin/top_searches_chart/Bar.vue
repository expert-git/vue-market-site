<template>
	<div :style="`height: ${ratio}%`" class="bar">
		<label class="count-label">{{searchCount}}</label>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			ratio: {
				default: 0,
				type: Number,
				required: true,
			},
			searchCount: {
				default: 0,
				type: Number,
				required: true,
			},
		},
	})
	export default class Bar extends Vue {

	}
</script>

<style scoped>
	.bar {
		width: 35%;
		display: grid;
		max-width: .75rem;
		align-self: end;
		grid-template-rows: 1rem 1fr;
		justify-self: center;
		background-color: #3FE0D0;
		transform-origin: bottom center;
		transform: scale3d(1, 0, 1);
		animation: .6s .3s animate_bar_height forwards ease-out;
	}
	
	@keyframes animate_bar_height {
		from {
			transform: scale3d(1, 0, 1);
		}
		to {
			transform: scale3d(1, 1, 1);
			border-radius: 2px 2px 0 0;
		}
	}
	
	.count-label {
		align-self: center;
		justify-self: center;
		text-align: center;
		color: #FFFFFF;
		font-family: "Nunito Sans", sans-serif;
		font-weight: bold;
		font-size: .5rem;
	}
	
	@media screen and (min-width: 360px) {
		.bar {
			max-width: 1rem;
		}
		
		.count-label {
			font-size: .625rem;
		}
	}
</style>
