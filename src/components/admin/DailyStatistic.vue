<template>
	<div id="content-holder">
		<img id="stat-type-img" :src="statTypeImage" alt="">
		<label id="stat-value">{{statTypeValue}}</label>
		<label id="stat-type-label">{{statTypeLabel}}</label>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import {DailyStatsType} from "@/models/DailyStatsTypes";

	@Component({
		props: {
			type: DailyStatsType,
			stats: Object,
		},
		computed: {
			statTypeImage() {
				return require(`../../assets/images/daily_stats/${this.$props.type.image}`);
			},
			statTypeLabel() {
				return `${this.$props.type.label}`;
			},
			statTypeValue() {
				return `${this.$props.stats[this.$props.type.name] || 0}`;
			},
		},
	})
	export default class DailyStatistic extends Vue {

	}
</script>

<style scoped>
	#content-holder {
		width: 5rem;
		height: 100%;
		background-color: white;
		border-radius: .25rem;
		box-shadow: 0 0 4px rgba(230, 230, 230, .35);
		display: grid;
		justify-items: center;
		grid-template-rows: .5fr .255fr .245fr;
	}
	
	#stat-type-img {
		height: 1.25rem;
		align-self: center;
		grid-row: 1;
		border-radius: 50%;
		background-color: #dddddd;
	}
	
	#stat-value {
		color: rgba(23, 24, 31, 0.8);
		font-family: "Nunito Sans", sans-serif;
		font-size: .875rem;
		font-weight: bold;
		align-self: start;
	}
	
	#stat-type-label {
		color: rgba(23, 24, 31, 0.6);
		font-family: "Nunito Sans", sans-serif;
		align-self: start;
		grid-row: 3;
		font-size: .45rem;
		white-space: pre;
		text-align: center;
	}
	
	@media screen and (min-width: 360px) {
		#content-holder {
			width: 6rem;
			border-radius: .275rem;
		}
		
		#stat-type-img {
			height: 1.5rem;
		}
		
		#stat-value {
			font-size: 1rem;
		}
		
		#stat-type-label {
			font-size: .5rem;
		}
	}
</style>
