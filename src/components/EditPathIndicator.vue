<template>
	<label id="edit-path-indicator" v-if="this.$route.query.q">
		<span v-on:click="goBackToHome">My Collection</span>
		<span v-on:click="goBackToResults">Edit Product</span>
		<!-- <span v-if="this.$route.query.shop || this.$route.query.social">{{getShop}}</span> -->
	</label>
</template>
<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({})
	export default class EditPathIndicator extends Vue {
	}
</script>
<style scoped>
	
	#edit-path-indicator {
		user-select: none;
		justify-self: start;
		align-self: end;
		grid-row: 1;
		grid-column: 2;
		font-family: "Poppins", sans-serif;
		color: rgba(23, 24, 31, 0.65);
		font-size: .75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 0.875rem;
		opacity: 0;
		cursor: pointer;
		animation: .6s animate-children-in ease forwards;
	}
	
	@keyframes animate-children-in {
		to {
			opacity: 1;
		}
	}
	
	#edit-path-indicator > span {
		cursor: pointer;
	}
	
	#edit-path-indicator > span:not(:first-child)::before {
		font-family: "Poppins", sans-serif;
		color: rgba(23, 24, 31, 0.65);
		font-size: .75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 0.875rem;
		content: " / ";
	}
	
	#edit-path-indicator > span:hover {
		cursor: pointer;
		color: rgba(23, 24, 31, .9);
	}

</style>
