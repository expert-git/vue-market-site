<template>
	<div class="chart" v-if="topSearches">
		<div id="bars-holder">
			<bar :key="generateKey(index, search)" :ratio="getRatio(search.search_count)"
			     :search-count="search.search_count" v-for="(search, index) in topSearches"></bar>
		</div>
		<div id="keywords-holder">
			<label class="keyword-label" v-for="search in topSearches">{{search.keyword}}</label>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import Bar from "@/components/admin/top_searches_chart/Bar.vue";

	@Component({
		components: {Bar},
		props: {
			topSearches: {
				required: true,
				type: Array,
				default: [],
			},
		},
	})
	export default class TopSearchesChart extends Vue {
		public getRatio(count) {
			return (count / this.$props.topSearches[0].search_count) * 100;
		}

		// noinspection JSMethodCanBeStatic
		public generateKey(index: number, search: any): string {
			return `${index}${search.keyword}${search.search_count}`;
		}
	}
</script>

<style scoped>
	.chart {
		display: grid;
		grid-template-columns: .125fr .75fr .125fr;
		grid-template-rows: 1fr 1.5rem;
	}
	
	#keywords-holder, #bars-holder {
		display: grid;
		padding: 0 .25rem;
		grid-column: 2;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0px, 1fr);
	}
	
	#bars-holder {
		box-sizing: border-box;
		border-bottom: 2px #3FE0D0 solid;
		height: 90%;
		align-self: end;
	}
	
	#keywords-holder {
		grid-row: 2;
	}
	
	.keyword-label {
		height: fit-content;
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		align-self: center;
		justify-self: center;
		text-align: center;
		color: rgba(23, 24, 31, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-weight: 600;
		font-size: .625rem;
	}
	
	@media screen and (min-width: 360px) {
		.keyword-label {
			font-size: .75rem;
		}
	}
</style>
