<template>
  <router-link to="/login">
    <button>LOGIN</button>
  </router-link>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({})
	export default class LoginButton extends Vue {

	}
</script>

<style scoped>
	
	button {
		display: block;
		font-family: "Poppins", sans-serif;
		font-size: .75em;
		font-weight: 500;
		width: fit-content;
		height: 2.5rem;
		letter-spacing: .2rem;
		padding: 0 2rem;
		transition: .15s background-color ease-in, 0.15s color ease-in;
		color: #25A2CD;
		border: 1px solid rgba(37, 162, 205, 0.8);
		border-radius: .3rem;
		outline: none;
		background: white;
	}
	
	button:hover {
		transition: .15s background-color ease-out, 0.15s color ease-out;
		color: white;
		background: #25A2CD;
	}

</style>
