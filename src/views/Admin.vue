<template>
	<router-view></router-view>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import AdminStore from "../AdminStore";

	@Component({
		async beforeMount() {
			this.$store.registerModule("adminStore", AdminStore);
			await this.$store.dispatch("loadTodayStatistics");
			await this.$store.dispatch("loadBenchmarkInfo");
		},
	})
	export default class Admin extends Vue {

	}
</script>

<style scoped>

</style>
