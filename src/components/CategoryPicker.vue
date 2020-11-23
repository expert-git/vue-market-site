<template>
	<div class="category-dropdown">
		<label>Category</label>
		<img id="expand-dropdown" alt="expand dropdown" src="../assets/images/expand_down.svg">
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({})
	export default class CategoryPicker extends Vue {

	}
</script>

<style scoped>
	.category-dropdown {
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
