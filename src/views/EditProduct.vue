 <template>
	<div id="container" class="container">
        <logged-in-header></logged-in-header>
		<section>
			<div class="breadcrumb">
				<div><a href="#"> My Collection </a></div>
				<div> Edit {product_name} </div>
			</div>
			<h1> Product Name </h1>
			<div id="product-gallery">
				<div id="main-thumb">
					<img src="../assets/images/edit_product/main1.png" />
				</div>
				<div id="thumbnail-container">
					<ul>
						<li>
							<div>
								<img src="../assets/images/edit_product/thumb1.png" />
							</div>
						</li>
						<li>
							<div>
								<img src="../assets/images/edit_product/thumb2.png" />
							</div>
						</li>
						<li>
							<div>
								<img src="../assets/images/edit_product/thumb3.png" />
							</div>
						</li>
						<li>
							<div>
								<img src="../assets/images/edit_product/thumb4.png" />
							</div>
						</li>
						<li>
							<div id="upload-file"></div>
						</li>
					</ul>
				</div>
			</div>
			<form>
				<div id="product-info" class="panel-white">
					<h2>Product Info</h2>
					<div id="product-name">
						<label>Product Name</label>
						<input type="text" name="product_name" />
					</div>
					<div id="product-category">
						<label>Category</label>
						<select>
							<option>Accessories</option>
						</select>
					</div>
				</div>
				<div id="product-detail" class="panel-white">
					<h2>Product Detail</h2>
					<div id="product-detail-container">
						<div>
							<label>Price /pcs</label>
							<div class="two-col-panel">
								<div class="selectable">
									<p>$</p>
								</div>
								<div>
									<input type="text" value="1" />
								</div>
							</div>
						</div>
						<div>
							<label>Estimated Weight</label>
							<div class="two-col-panel">
								<div class="selectable">
									<p>Gram</p>
								</div>
								<div>
									<input type="text" value="1" />
								</div>
							</div>
						</div>
						<div>
							<label>Stock</label>
							<div class="two-col-panel">
								<div>
									<p>Pcs</p>
								</div>
								<div>
									<input type="text" value="1" />
								</div>
							</div>
						</div>
						<div>
							<label>Min. Purchase</label>
							<div class="two-col-panel">
								<div>
									<p>Pcs</p>
								</div>
								<div>
									<input type="text" value="1" />
								</div>
							</div>
						</div>
						<div class="toggle">
							<label>Condition</label>
							<div class="two-col-panel">
								<div class="selected">
									<p>New</p>
								</div>
								<div>
									<p>Second</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="product-description" class="panel-white">
					<h2>Product Description</h2>
					<div>
						<label>Product Description</label>
						<textarea rows="4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</textarea>
						<p class="disclaimer">Item's description contain less than 30 character</p>
					</div>
					<div id="youtube-link">
						<label>YouTube Video</label>
						<input type="text" name="youtube-link"/>
						<p class="disclaimer">Insert URL of the video from youtube which describes the item</p>
					</div>
				</div>
				<div class="btn-container">
					<button class="form-button">Save</button>
				</div>
			</form>
		</section>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
    import {mapGetters, mapState} from "vuex";
	import LoggedInHeader from "@/components/LoggedInHeader.vue";

	@Component({
		components: {
			LoggedInHeader,
		},
	})
	export default class EditProduct extends Vue {
	}
</script>
<style scoped>

	img{
		width: 100%;
	}

	#container{
		padding: 0 40px;
		height: 100%;
	}

	section{
		width: 100%;
		height: fit-content;
		border-radius: 3.125rem 3.125rem 0 0;
		background-color: rgba(241, 244, 248, 0.6);
		margin: 20px auto 0 auto;
		padding: 60px 70px;
		box-sizing: border-box;
	}

	.panel-white{
		background-color: #fff;
		-webkit-appearance: none;
		border: 1px solid transparent;
		border-radius: 10px;
		margin-top: 48px;
		padding: 35px;
		overflow: hidden;
	}

	.breadcrumb > div{
		display: inline-block;
		font-size: 12px;
		letter-spacing: 0.5px;
	}

	.breadcrumb > div a{
		color: #15A6CF;
	}

	.breadcrumb > div a:after{
		content: ">";
		padding: 0 5px;
		color: #15A6CF;
	}

	h1{
		font-family: "Nunito sans", sans-serif;
		font-size: 24px;
		letter-spacing: 1px;
		color: rgba(23,24,31,0.8);
		text-transform: uppercase;
		margin-top: 35px;
	}

	#product-gallery{
		overflow: hidden;
		border-bottom: 1px solid rgba(151,151,151,0.1);
		padding-bottom: 38px;
	}

	#main-thumb{
		max-width: 400px;
		max-heught: 500px;
		margin: auto;
		border-radius: 20px;
	}

	#thumbnail-container ul{
		list-style: none;
		padding: 0;
		margin: 30px auto;
		max-width: 820px;
	}

	#thumbnail-container ul li{
		display: inline-block;
		border-radius: 20px;
		width: 20%;
		text-align: center;
	}

	#thumbnail-container ul li div{
		width: 80%;
		margin: auto;
		border-radius: 20px;
		height: 140px;
		overflow: hidden;
	}

	#thumbnail-container ul li div img{
		height: 100%;
	}

	#upload-file{
		border: 2px dashed rgba(151,151,151,0.5);
		background-image: url('../assets/images/edit_product/plus.svg');
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
	}

	h2{
		color: rgba(23,24,31,0.8);
		font-family: "Nunito Sans";
		font-size: 24px;
		font-weight: bold;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	#product-info div{
		width: 48%;
		float: left;
		display: inline-block;
	}

	#product-info div:last-child{
		float: right;
	}

	label, textarea, select, input{
		width: 100%;
		color: rgba(23,24,31,0.8);
		font-family: "Nunito Sans";
		font-size: 14px;
	}

	label{
		font-weight: bold;
		letter-spacing: 0.58px;
	}

	label:after{
		color: #25A2CD;
    	content: " *";
	}

	input,select, textarea{
		padding: 15px 35px;
		margin-top: 15px;
		box-sizing: border-box;
		border-radius:10px;
		border: 1px solid rgba(151,151,151,0.5);
		-webkit-appearance: none;
		background-color: #ffffff;
	}

	select{
		background-image: url("../assets/images/edit_product/dropdown.svg");
		background-repeat: no-repeat;
		background-position: 93% center;
	}
	
	textarea{
		line-height: 29px;
		padding: 30px 35px;
	}

	.disclaimer{
		margin: 10px 0 0 0;
		color: rgba(23,24,31,0.5);
		font-size: 14px;
		letter-spacing: 1.5px;
		text-align: justify;
	}

	#product-detail-container > div{
		display: inline-block;
		float: left;
		width: 20%;
		padding-right: 20px;
		box-sizing: border-box;
	}

	#product-detail-container label{
		width: 100%;
	}

	.two-col-panel{
		width: 100%;
		border: 1px solid rgba(151,151,151,0.1);
		margin-top: 15px;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.two-col-panel div{
		display: inline-block;
		text-align: center;
		width: 49%;
	}

	.two-col-panel div input,
	.two-col-panel div select{
		width: 100%;
		border: 0;
		padding: 15px 0;
		margin: 0;
		text-align: center;
		box-sizing: border-box;
		position: relative;
	}

	.two-col-panel div:first-child{
		border-right: 1px solid  rgba(151,151,151,0.1);
	}

	.two-col-panel .selectable{
		position: relative;
	}

	.two-col-panel .selectable p:after{
		content: "";
		width: 20px;
		height: 20px;
		background-image: url('../assets/images/expand_down.svg');
		background-repeat: no-repeat;
		background-position:center;
		position: absolute;
		top: 30%;
	}

	.toggle .two-col-panel{
		padding: 0;
	}

	.toggle p{
		cursor: pointer;
		padding: 25px 0;
		margin: 0;
	}

	.toggle .selected{
		background-color: rgba(37,162,205,0.5);
		border-radius: 10px;
		color: #fff;
	}

	#product-description div{
		margin-bottom: 30px;
	}

	.btn-container{
		text-align: right;
		margin-top: 80px;
	}

	.form-button{
		width: 200px;
		text-align: center;
		background-color: #25A2CD;
		padding: 19px 0;
		border-radius: 10px;
		color: #fff;
		font-family: "Nunito Sans";
		font-size: 16px;
		text-transform: uppercase;
		font-weight: bold;
	}

	@media screen and (max-width: 500px){
		#container{
			padding: 0 10px;
		}

		section{
			padding: 30px 40px;
		}
	}
	
</style>
