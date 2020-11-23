import Product from "@/models/Product";

export class ShopResultInfo {
	public name!: string;
	public avgPrice!: string;
	public products!: Product[];
	public productCount!: number;
}
