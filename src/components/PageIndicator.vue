<template>
	<span class="page-indicator" v-on:click="handleClick">
		<label id="page-number">{{pageNumber}}</label>
	</span>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			pageNumber: {
				default: null,
				required: true,
				type: Number,
			},
		},
	})
	export default class PageIndicator extends Vue {
		public handleClick() {
			this.$emit("click");
		}
	}
</script>

<style scoped>
	.page-indicator {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		color: #15A6CF;
		border: 1px solid rgba(21, 166, 207, 1);
		transition: color .3s ease-out, background-color .3s ease-out;
		box-sizing: border-box;
		align-items: center;
		justify-items: center;
		background: transparent;
		border-radius: .3125rem;
		cursor: pointer;
		z-index: 50;
		pointer-events: all;
	}

	.page-indicator.current {
		color: white;
		background: #15A6CF;
	}
	
	.page-indicator:not(.current):hover {
		background: rgba(21, 166, 207, 0.2);
	}
	
	label#page-number {
		color: inherit;
		font-weight: bold;
		font-size: .875em;
		font-family: "Nunito Sans", sans-serif;
		width: fit-content;
		height: fit-content;
		cursor: pointer;
	}
	
	@media screen and (max-width: 900px) {
		label#page-number {
			font-size: .75em;
		}
	}

</style>
