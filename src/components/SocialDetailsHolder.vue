<template>
	<div class="shop-products-holder">
		<transition name="fade">
			<div id="tags-holder">
				<results-section-tag id="profiles-tag" :active="activeTab === 'profiles'" class="results-section-tag"
				                     section-tag-icon="open_box_with_two_hearts" section-tag-name="Profiles"
				                     v-on:click="setActive('profiles')" />
				
				<results-section-tag id="shop-tag" :active="activeTab === 'shop'" class="results-section-tag"
				                     section-tag-icon="shop_icon" section-tag-name="Shop"
				                     v-on:click="setActive('shop')" />
			</div>
		</transition>
		<transition name="fade">
			<div id="products-holder" v-if="activeTab === 'profiles'">
				<social-profile :index="index" :key="index" :profile-details="profile"
				                v-for="(profile, index) in currentSocialData" v-if="setRange(index)" />
			</div>
		</transition>
		<transition name="fade">
			<div class="page-navigation-panel"
			     v-if="currentSocialData != null && currentSocialData.length > 0 && activeTab === 'profiles'">
				<direction-page-indicator indicator-direction="previous" v-if="!onFirstPage"
				                          v-on:click="movePage('previous')" />
				<page-indicator :class="isCurrentPage(page)" :key="page" :page-number="page"
				                v-for="(page) in numberOfPagesNeeded" v-if="showIndicator(page)"
				                v-on:click="setPage(page)" />
				<direction-page-indicator indicator-direction="next" v-if="!onLastPage" v-on:click="movePage('next')" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
	import ResultsSectionTag from "@/components/ResultsSectionTag.vue";
	import {mapGetters} from "vuex";
	import PageIndicator from "@/components/PageIndicator.vue";
	import DirectionPageIndicator from "@/components/DirectionPageIndicator.vue";
	import {Component} from "vue-property-decorator";
	import ShopDetailsHolder from "@/components/ShopDetailsHolder.vue";
	import SocialProfile from "@/components/SocialProfile.vue";

	@Component({
		components: {SocialProfile, DirectionPageIndicator, PageIndicator, ResultsSectionTag},
		computed: {
			...mapGetters({
				currentSocialData: "getCurrentSocialData",
			}),
		},
	})
	export default class SocialDetailsHolder extends ShopDetailsHolder {
		public currentSocialData!: any;
		public activeTab: string = "profiles";

		get numberOfPagesNeeded() {
			if (this.currentSocialData.length > 15) {
				return Math.ceil(this.currentSocialData.length / 15);
			} else {
				return 1;
			}
		}
	}
</script>
