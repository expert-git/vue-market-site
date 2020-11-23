<template>
	<div class="stars-holder">
		<img :key="index" :src="setStars(index)" alt="" class="stars" v-for="index in 5" />
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			rating: {
				type: Number,
				default: null,
				required: true,
			},
		},
		methods: {
			setStars(index: number): string {
				if (index <= this.$props.rating) {
					return require("../assets/images/details_icons/yellow_star.svg");
				}
				return require("../assets/images/details_icons/grey_star.svg");
			},
		},
	})
	export default class StarRating extends Vue {

	}
</script>

<style scoped>
	.stars-holder {
		display: grid;
		height: 100%;
		width: fit-content;
		grid-auto-flow: column;
		grid-template-columns: repeat(5, auto);
		grid-column-gap: .25rem;
	}
	
	.stars {
		width: .5rem;
		height: .5rem;
		align-self: center;
		justify-self: center;
	}
</style>
