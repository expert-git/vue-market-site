<template>
	<div class="filter-holder">
		<button :class="index === selectedFilter ? 'selected' : '' " class="filter-button"
		        v-for="(filter, index) in filters" v-on:click="filterChanged(index)">
			{{filter}}
		</button>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		// computed: {},
	})
	export default class ChartFilter extends Vue {
		public selectedDates = [];
		public selectedFilter = 0;
		public filters = [
			"Today",
			"7days",
			"This Month",
			"Custom",
		];

		public async filterChanged(index: number) {
			this.selectedFilter = index;
			const filter = this.filters[this.selectedFilter];
			switch (filter) {
				case this.filters[0] : {
					await this.$store.dispatch("loadTodayStatistics");
					break;
				}
				case this.filters[1] : {
					await this.$store.dispatch("loadSavedStatistics", this.filters[1]);
					break;
				}
				case this.filters[2] : {
					await this.$store.dispatch("loadSavedStatistics", this.filters[2]);
					break;
				}
				case this.filters[3] : {
					break;
				}
			}
		}
	}
</script>

<style scoped>
	.filter-holder {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-flow: column;
		box-shadow: 0 0 4px 1px rgb(230, 230, 230);
		box-sizing: border-box;
		border-radius: .75rem;
		overflow: hidden;
	}
	
	.filter-button {
		border: 0;
		background: none;
		outline: none;
		cursor: default;
		box-shadow: none;
		border-radius: 0;
		font-family: "Nunito Sans", sans-serif;
		font-size: .625rem;
		font-weight: 600;
		color: rgba(23, 24, 31, 0.5);
		transition: background-color .3s ease, color .3s ease;
	}
	
	.filter-button.selected {
		background: white;
		color: rgba(23, 24, 31, 0.9);
	}
	
	.filter-button:not(.selected):hover {
		color: rgba(23, 24, 31, 0.9);
	}
	
	@media screen and (min-width: 360px) {
		.filter-holder {
			box-shadow: 0 0 4px 2px rgb(230, 230, 230);
			border-radius: 1em;
		}
		
		.filter-button {
			font-size: .75rem;
		}
	}
</style>
