<template>
	<transition appear name="fade">
		<div id="result-controls" v-if="showControls">
			<result-control control-icon-name="bar_chart.svg" control-text="Statistics"></result-control>
			<result-control control-icon-name="map_pin.svg" control-text="Locations"
			                v-if="!this.$route.query.social"></result-control>
			<result-control control-icon-name="black_sort_icon.svg" control-text="Sorting"></result-control>
			<result-control control-icon-name="switch_to_grid.svg" control-text="Grid View"></result-control>
		</div>
	</transition>
</template>
<script lang="ts">
	import ResultControl from "@/components/ResultControl.vue";

	export default {
		name: "ResultControlsHolder",
		components: {ResultControl},
		props: {
			showControls: {},
		},
	};
</script>
<style scoped>
	
	@keyframes animate-children-in {
		to {
			opacity: 1;
		}
	}
	
	#result-controls {
		display: grid;
		grid-template-columns: auto auto auto auto;
		grid-column-gap: 1.25rem;
		align-content: end;
		grid-column: 3;
		grid-row: 2 / span 2;
	}
	
	@media screen and (max-width: 800px) {
		#result-controls {
			grid-column-gap: .625rem;
		}
	}
	
	@media screen and (max-width: 500px) {
		#result-controls {
			grid-column-gap: 0;
		}
	}
</style>
