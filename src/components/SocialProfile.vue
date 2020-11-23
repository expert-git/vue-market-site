<template>
	<div class="profile-content-holder">
		<div id="image-container" :style="`background-image: url('${profileImage}');`"></div>
		<label id="profile-name">{{profileName}}</label>
		<label id="product-count">{{`${productCount} Products`}}</label>
		<label id="latest-post-on">{{`Latest Post: ${latestPostDate}`}}</label>
		<button id="see-products">
			See Details
		</button>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";

	@Component({
		props: {
			index: {
				default: 0,
				required: false,
				type: Number,
			},
			profileDetails: {},
		},
	})
	export default class SocialProfile extends Vue {
		get latestPostDate() {
			return this.$props.profileDetails.products[0]["Posted From"];
		}

		get productCount() {
			return this.$props.profileDetails.products.length;
		}

		get profileImage() {
			return this.$props.profileDetails.products[0].Image;
		}

		get profileName() {
			return this.$props.profileDetails.profile;
		}
	}
</script>

<style scoped>
	.profile-content-holder {
		height: 100%;
		width: 100%;
		position: relative;
		align-content: center;
		align-self: center;
		justify-items: center;
		justify-self: center;
		background-color: white;
		border-radius: 1.25rem;
		display: grid;
		grid-auto-flow: row;
		overflow: hidden;
		box-shadow: 0 0 1rem 0 rgba(21, 166, 207, 0.1);
	}

	
	div#image-container {
		grid-row: 1;
		width: 5rem;
		height: 5rem;
		margin-bottom: 1.25rem;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center bottom;
		background-origin: content-box;
		border-radius: 50%;
	}
	
	#profile-name {
		height: fit-content;
		color: rgba(23, 24, 31, 0.8);
		margin-bottom: 0.625rem;
		font-family: "Nunito Sans", sans-serif;
		font-size: 1rem;
		font-weight: bold;
		justify-self: center;
		text-align: center;
		width: 90%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	#product-count {
		color: rgba(23, 24, 31, 0.7);
		font-family: "Nunito Sans", sans-serif;
		font-weight: 600;
		font-size: 0.75rem;
		margin-bottom: 0.625rem;
	}
	
	#latest-post-on {
		color: rgba(23, 24, 31, 0.7);
		font-family: "Nunito Sans", sans-serif;
		font-weight: normal;
		font-size: 0.625rem;
		margin-bottom: 1rem;
	}
	
	#see-products {
		font-family: "Nunito Sans", sans-serif;
		font-size: 0.625rem;
		font-weight: bold;
		width: 5.625rem;
		height: 1.875rem;
		background: white;
		border-radius: .3125rem;
		color: #15A6CF;
		border: 1px solid #15A6CF;
		transition: .15s background-color ease-in, 0.15s color ease-in;
	}
	
	#see-products:hover {
		transition: .15s background-color ease-out, 0.15s color ease-out;
		color: white;
		background: #15A6CF;
	}
	
	@media screen and (max-width: 900px) {
		#profile-name {
			font-size: 0.875rem;
		}
		
		#product-count {
			font-size: 0.625rem;
		}
		
		#latest-post-on {
			font-size: 0.5rem;
		}
		
		#see-products {
			font-size: 0.625rem;
			height: 1.875rem;
		}
	}
	
	
	@media screen and (max-width: 500px) {
		
		.profile-content-holder {
			border-radius: 1.25rem;
		}
		
		div#image-container {
			width: 5rem;
			height: 5rem;
			margin-bottom: 1.25rem;
		}
		
		#profile-name {
			font-size: 1rem;
			margin-bottom: 0.625rem;
		}
		
		#product-count {
			margin-bottom: 0.625rem;
			font-size: 0.75rem;
		}
		
		#latest-post-on {
			font-size: 0.625rem;
		}
		
		#see-products {
			font-size: 0.75rem;
			width: 5.625rem;
			height: 1.875rem;
		}
	}


</style>
