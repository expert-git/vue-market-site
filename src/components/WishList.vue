<template>
	<div class="currency-dropdown">
		<img id="shopping-bag" alt="expand dropdown" src="../assets/images/path.svg">
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({})
	export default class WishList extends Vue {

	}
</script>

<style scoped>
	.currency-dropdown {
		display: grid;
		grid-template-columns: auto auto;
	}
	
	label {
		font-family: "Poppins", sans-serif;
		font-size: .75em;
		font-weight: 700;
		letter-spacing: .0625rem;
	}
	
	#expand-dropdown {
		margin-left: .25rem;
		justify-self: end;
		align-self: center;
	}
</style>
