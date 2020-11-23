<template>
	<div class="currency-dropdown">
		<!--<label>IDR</label>-->
		<select type="text" id="currency" required v-model.trim="currency" @change="onChange">
			<option>USD</option>
			<option>EUR</option>
			<option>IDR</option>
			<option>THB</option>
			<option>IDR</option>
			<option>MYR</option>
			<option>PHP</option>
			<option>VND</option>
			<option>LAK</option>
			<option>MMK</option>
			<option>KHR</option>
			<option>SGD</option>
		</select>
		<!--<img id="expand-dropdown" alt="expand dropdown" src="../assets/images/expand_down.svg">-->
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({})
	export default class CurrencyPicker extends Vue {
		public currency: string = "USD";
		public onChange() {
			this.$store.commit("setCurrency", this.currency);
		}
	}
</script>

<style scoped>
	.currency-dropdown {
		display: grid;
		grid-template-columns: auto auto;
	}
	
	select {
		font-family: "Poppins", sans-serif;
		font-size: .75em;
		font-weight: 700;
		letter-spacing: .0625rem;
		border:0px;
		outline:0px;
	}
	
	#expand-dropdown {
		margin-left: .25rem;
		justify-self: end;
		align-self: center;
	}
	
	@media screen and (max-width: 800px) {
		label {
			font-size: .625rem;
		}
	}
	
	@media screen and (max-width: 650px) {
		label {
			font-size: .65rem;
		}
	}
</style>

