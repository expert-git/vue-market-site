<template>
	<div class="container">
		<label id="stats-indicator">Statistics Overview</label>
		<div id="stats">
			<chart-filter id="chart-filter" />
			<transition-group id="stats-summary-holder" name="fade" tag="div">
				<daily-statistic :key="type.name" :stats="allStats.summary" :style="{'--index': index}" :type="type"
				                 v-for="(type, index) in dailyStatsTypes" v-if="allStats.summary" />
			</transition-group>
			<transition name="fade" tag="div">
				<div id="keyword-stats-chart-holder" v-if="allStats.summary">
					<span id="chart-label">Most Searched Keywords</span>
					<top-searches-chart id="chart" :top-searches="topSearches" />
				</div>
			</transition>
			<transition name="fade">
				<div id="benchmark-info-holder" v-if="avgBenchmark">
					<p id="avg-benchmark-holder">
						<span id="avg-benchmark">
							{{avgBenchmark}}s
						</span>
						<span id="avg-benchmark-text">
							average server search time
						</span>
					</p>
					<span id="separator"></span>
					<div id="benchmark-controls-holder">
						<p id="benchmark-detail-text">see benchmarks details</p>
						<button id="benchmark-by-store">store</button>
						<button id="benchmark-by-keyword">keyword</button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
	// import  from "vue-class-component";
	import DailyStatistic from "@/components/admin/DailyStatistic.vue";
	import {DailyStatsTypes} from "@/models/DailyStatsTypes";
	import Component from "vue-class-component";
	import {mapGetters} from "vuex";
	import Vue from "vue";
	import TopSearchesChart from "@/components/admin/top_searches_chart/TopSearchesChart.vue";
	import ChartFilter from "@/components/admin/top_searches_chart/ChartFilter.vue";

	@Component({
		components: {ChartFilter, TopSearchesChart, DailyStatistic},
		computed: {
			...mapGetters({
				allStats: "getStats",
				benchmarkInfo: "getBenchmarkInfo",
			}),
			topSearches() {
				if (this.allStats) {
					return Object.keys(this.allStats).map(key => {
						const stat = {
							keyword: undefined,
							search_count: 0,
						};
						stat.keyword = key;
						stat.search_count = this.allStats[key].search_count || 0;
						return stat;
					}).filter((stat) => {
						return stat.search_count > 0;
					}).sort((a, b) => {
						if (a.search_count > b.search_count) {
							return -1;
						}
						if (a.search_count < b.search_count) {
							return 1;
						}
						return 0;
					}).slice(0, 5);
				}
				return null;
			},
			avgBenchmark() {
				if (this.benchmarkInfo && Object.values(this.benchmarkInfo).length > 0) {
					const summedBenchmarkInfo: any = Object.values(this.benchmarkInfo)
						.reduce((previousValue: any, currentValue: any) => {
							return {
								count: previousValue.count + currentValue.count,
								overallBenchmark: previousValue.overallBenchmark + currentValue.overallBenchmark,
							};
						});
					const {count, overallBenchmark} = summedBenchmarkInfo;
					return (overallBenchmark / count).toPrecision(4);
				}
			},
		},
	})
	export default class Statistics extends Vue {
		public dailyStatsTypes = DailyStatsTypes;


	}
</script>

<style scoped>
	.container {
		height: 100%;
		width: 100%;
		display: grid;
		position: relative;
		padding: 1.25rem 1.25rem 0;
		box-sizing: border-box;
		row-gap: .5rem;
		background-color: rgba(241, 244, 248, 0.6);
		grid-template-rows: auto 1fr;
		--index: 0;
	}
	
	#stats-indicator {
		height: fit-content;
		width: fit-content;
		color: rgba(23, 24, 31, 0.9);
		font-family: "Nunito Sans", sans-serif;
		/*font-size: 1.375rem;*/
		font-size: 1.125rem;
		font-weight: 600;
	}
	
	#stats {
		height: 100%;
		padding: 4px;
		box-sizing: border-box;
		display: grid;
		grid-template-rows: 2rem 5rem minmax(7.5rem, 10rem) min-content;
		row-gap: .625rem;
		overflow: hidden;
		grid-auto-flow: row;
	}
	
	#chart-filter {
		grid-row: 1;
	}
	
	#stats-summary-holder {
		display: grid;
		grid-row: 2;
		grid-auto-flow: column;
		justify-content: space-between;
	}
	
	#keyword-stats-chart-holder {
		display: grid;
		grid-row: 3;
		grid-template-rows: 2rem 1fr;
		min-height: 7.5rem;
		max-height: 10rem;
		background-color: white;
		border-radius: .25rem;
		box-shadow: 0 0 4px rgba(230, 230, 230, .35);
	}
	
	#chart-label {
		height: fit-content;
		width: fit-content;
		align-self: center;
		justify-self: center;
		text-align: center;
		color: rgba(23, 24, 31, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-weight: 600;
		font-size: .75rem;
	}
	
	#chart {
		grid-row: 2;
	}
	
	#benchmark-info-holder {
		display: grid;
		grid-row: 4;
		column-gap: .5rem;
		grid-template-columns: .25fr min-content auto;
		grid-auto-flow: column;
		height: fit-content;
	}
	
	#avg-benchmark-holder {
		margin: 0;
	}
	
	#separator {
		display: block;
		height: 50%;
		width: 1px;
		background-color: #d0d0d0;
		align-self: center;
	}
	
	#avg-benchmark {
		display: block;
		height: fit-content;
		width: fit-content;
		font-family: "Nunito Sans", sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		color: #484848;
	}
	
	#avg-benchmark-text {
		display: block;
		height: fit-content;
		width: fit-content;
		font-family: "Nunito Sans", sans-serif;
		font-size: .625rem;
		color: #484848;
	}
	
	#benchmark-controls-holder {
		margin: 0;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr .5rem 1fr 1fr .25rem;
		grid-template-areas: "text text text text text text" "btn1 btn1 middle btn2 btn2 end";
	}
	
	#benchmark-detail-text {
		margin: 0;
		height: fit-content;
		width: fit-content;
		justify-self: start;
		align-self: center;
		grid-area: text;
		font-family: "Nunito Sans", sans-serif;
		font-size: .75rem;
		color: #484848;
	}
	
	#benchmark-by-store, #benchmark-by-keyword {
		border: none;
		margin: 0;
		outline: none;
		cursor: default;
		border-radius: 1rem;
		font-family: "Nunito Sans", sans-serif;
		font-size: .75rem;
		color: #242424;
		background-color: #fff;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
	}
	
	#benchmark-by-store {
		grid-area: btn1;
	}
	
	#benchmark-by-keyword {
		grid-area: btn2;
	}
	
	@media screen and (min-width: 360px) {
		.container {
			padding: 1.5rem 1.5rem 0;
		}
		
		#stats-indicator {
			font-size: 1.25rem;
		}
		
		#stats {
			grid-template-rows: 2.25rem 6rem minmax(9.5rem, 12rem) min-content;
		}
		
		#keyword-stats-chart-holder {
			min-height: 9.5rem;
			max-height: 12rem;
		}
		
		#chart-label {
			font-size: .875rem;
		}
		
		#avg-benchmark {
			font-size: 1.625rem;
		}
		
		#avg-benchmark-text {
			font-size: .75rem;
		}
		
		#benchmark-detail-text {
			font-size: .875rem;
		}
		
		#benchmark-by-store, #benchmark-by-keyword {
			font-size: .875rem;
		}
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity ease-out .9s calc(0.3s * var(--index));
	}
	
	.fade-enter, .fade-leave-to {
		transition: none;
		opacity: 0;
	}

</style>
