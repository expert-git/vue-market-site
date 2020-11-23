<template>
	<transition appear name="fade">
		<div :class="active ? 'active' : ''" class="section-tag-content" v-on:click="handleClick">
			<img id="section-tag-icon" :alt="sectionTagName + '-icon'"
			     :src="require(`../assets/images/details_icons/${sectionTagIcon}.svg`)" />
			<label id="section-tag-name">{{sectionTagName}}</label>
		</div>
	</transition>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			active: {
				required: true,
				type: Boolean,
				default: false,
			},
			sectionTagIcon: {
				required: true,
				default: "",
				type: String,
			},
			sectionTagName: {
				required: true,
				default: "",
				type: String,
			},
		},
	})
	export default class ResultsSectionTag extends Vue {
		public handleClick() {
			this.$emit("click");
		}
	}
</script>

<style scoped>
	.section-tag-content {
		user-select: none;
		cursor: pointer;
		display: grid;
		margin: 0 .35rem;
		padding: 0 .35rem;
		align-self: center;
		width: fit-content;
		height: fit-content;
		box-sizing: border-box;
		border-bottom: 2px solid transparent;
		grid-template-rows: 1rem auto 1rem;
		grid-column-gap: 1rem;
		background-color: transparent;
	}
	
	.section-tag-content.active {
		border-bottom: 2px solid #15a6cf;
	}
	
	#section-tag-icon {
		pointer-events: none;
		grid-row: 2;
		grid-column: 1;
		align-self: center;
		justify-self: center;
		width: 1.5rem;
	}
	
	.section-tag-content:not(.active) #section-tag-icon {
		filter: grayscale(1) saturate(0);
	}
	
	#section-tag-name {
		pointer-events: none;
		grid-row: 2;
		grid-column: 2;
		opacity: 0.5;
		align-self: center;
		justify-self: center;
		font-family: "Poppins", sans-serif;
		font-size: 1em;
		font-weight: 600;
		color: rgb(82, 82, 82);
		text-align: center;
	}
	
	.section-tag-content.active #section-tag-name {
		color: #15a6cf;
	}
	
	@media screen and (max-width: 900px) {
		.section-tag-content {
			grid-template-rows: .75rem auto .75rem;
		}
		
		#section-tag-name {
			font-size: .875rem;
		}
		
		#section-tag-icon {
			width: 1.25rem;
		}
	}
	
	@media screen and (max-width: 800px) {
		.section-tag-content {
			grid-template-rows: .5rem auto .5rem;
		}
		
		#section-tag-name {
			font-size: .75rem;
		}
		
		#section-tag-icon {
			width: 1rem;
		}
	}
	
	@media screen and (max-width: 500px) {
		.section-tag-content {
			margin: 0 .175rem;
			padding: 0 .175rem;
			grid-column-gap: .625rem;
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .6s;
	}
	
	.fade-enter, .fade-leave-to {
		transition: none;
		opacity: 0;
	}

</style>
