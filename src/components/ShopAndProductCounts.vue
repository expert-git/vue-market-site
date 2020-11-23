 <template>
	<transition appear name="fade">
		<label class="shops-products-found-count"
		       v-if="showShopCount && this.$route.query.shop == null && this.$route.query.social == null">
			{{numOfShopsAndSocials}} Shops Found
		</label>
		<label class="shops-products-found-count"
		       v-if="showProductCount && (this.$route.query.shop || this.$route.query.social)">
			{{`${numOfProducts} ${profilesOrProducts} Found`}}
		</label>
	</transition>
</template>
<script lang="ts">
	export default {
		name: "ShopAndProductCounts",
		props: {
			numOfProducts: {},
			numOfShopsAndSocials: {},
			showProductCount: {},
			showShopCount: {},
		},
		computed: {
			profilesOrProducts() {
				if (this.$route.query.shop) {
					return "Products";
				}
				if (this.$route.query.social) {
					return "Profiles";
				}
			},
		},
	};
</script>
<style scoped>
	
	@keyframes animate-children-in {
		to {
			opacity: 1;
		}
	}
	
	.shops-products-found-count {
		user-select: none;
		justify-self: start;
		align-self: center;
		grid-row: 3;
		grid-column: 2;
		font-family: "Poppins", sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: rgba(23, 24, 31, 0.65);
		letter-spacing: 0.007rem;
		/*line-height: 1.125rem;*/
	}
	
	@media screen and (max-width: 900px) {
		.shops-products-found-count {
			font-size: .875rem;
		}
	}
	
	@media screen and (max-width: 800px) {
		.shops-products-found-count {
			font-size: .75rem;
		}
	}
	
	@media screen and (max-width: 400px) {
		.shops-products-found-count {
			font-size: .625rem;
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
