//:include tagsdk-current.js
var version = "";
var classPath = "ownedit.confirmationpagetag" + version;

qubit.opentag.LibraryTag.define(classPath + ".Tag", {
	config: {
		/*DATA*/
		name: "Confirmation Page Tag",
		async: true,
		description: "Owned it is integrated at the order confirmation page of a store. Owned it allocates a unique store ID for each\nstore to manage, test and analyse post-purchase campaigns from its back end.",
		html: "",
		imageUrl: "https://www.ownedit.com/assets/css/OwnedItLogo.png",
		locationDetail: "",
		isPrivate: false,
		url: "www.ownedit.com/ownedit_js/ownedit.js?store_id=${STORE_ID}&anchor=${DIV_CLASS_NAME}",
		usesDocWrite: false,
		parameters: [{
			name: "Store Id",
			description: "Each store is allocated a unique store ID by Owned it.",
			token: "STORE_ID",
			uv: ""
		}, {
			name: "Anchor Div Class",
			description: "It is a Div on the order confirmation page with unique class name for the call-to-action banner",
			token: "DIV_CLASS_NAME",
			uv: ""
		}, {
			name: "User Email",
			description: "Email address of the customer",
			token: "USER_EMAIL",
			uv: "universal_variable.user.email"
		}, {
			name: "Order Id",
			description: "Order Id of the purchase",
			token: "ORDER_ID",
			uv: "universal_variable.transaction.order_id"
		}, {
			name: "Product Name",
			description: "Name of the product",
			token: "PRODUCT_NAME",
			uv: "universal_variable.transaction.line_items[#].product.name"
		}, {
			name: "Product URL",
			description: "URL of the product page",
			token: "PRODUCT_URL",
			uv: "universal_variable.transaction.line_items[#].product.url"
		}, {
			name: "Product Description",
			description: "Short description of the product",
			token: "PRODUCT_DESC",
			uv: "universal_variable.transaction.line_items[#].product.description"
		}, {
			name: "Product Image URL",
			description: "URL of the product image",
			token: "PRODUCT_IMAGE_URL",
			uv: "universal_variable.transaction.line_items[#].product.image_url"
		}, {
			name: "Product Price",
			description: "Price of the product",
			token: "PRODUCT_PRICE",
			uv: "universal_variable.transaction.line_items[#].product.unit_sale_price"
		}, {
			name: "Currency",
			description: "Currency Code",
			token: "PRODUCT_CURRENCY",
			uv: "universal_variable.transaction.currency"
		}, {
			name: "Product SKU",
			description: "SKU of the product",
			token: "PRODUCT_SKU",
			uv: "universal_variable.transaction.line_items[#].product.sku_code"
		}, {
			name: "Product Id",
			description: "Unique identifier for the product within the catalog",
			token: "PRODUCT_IDS",
			uv: "universal_variable.transaction.line_items[#].product.id"
		}, {
			name: "Product Category",
			description: "Category of the product: e.g. Electronics",
			token: "PRODUCT_CATEGORY",
			uv: "universal_variable.transaction.line_items[#].product.category"
		}, {
			name: "Product Quantity",
			description: "Number of units of the product purchased",
			token: "PRODUCT_QUANTITY",
			uv: "universal_variable.transaction.line_items[#].quantity"
		}, {
			name: "Store Name",
			description: "The name of the store that would be displayed on referrals",
			token: "STORE_NAME",
			uv: ""
		}]
		/*~DATA*/
	},
	script: function() {
		/*SCRIPT*/
		/*~SCRIPT*/
	},
	pre: function() {
		/*PRE*/
		/*~PRE*/
	},
	post: function() {
		/*POST*/
		function post_to_owned_it() {
			var details = {
				"customer_email": "" + this.valueForToken("USER_EMAIL") + "",
				"order_id": "" + this.valueForToken("ORDER_ID") + "",
				"store_name": "" + this.valueForToken("STORE_NAME") + "",
				"products": []
			};
			for (var i = 0; i < this.valueForToken("PRODUCT_IDS").length; i++) {
				details.products.push({
					"product_name": this.valueForToken("PRODUCT_NAME")[i],
					"product_url": this.valueForToken("PRODUCT_URL")[i],
					"product_desc": this.valueForToken("PRODUCT_DESC")[i],
					"product_image_url": this.valueForToken("PRODUCT_IMAGE_URL")[i],
					"product_price": this.valueForToken("PRODUCT_PRICE")[i],
					"currency": "" + this.valueForToken("PRODUCT_CURRENCY") + "",
					"product_sku": this.valueForToken("PRODUCT_SKU")[i],
					"product_id": this.valueForToken("PRODUCT_IDS")[i],
					"product_category": this.valueForToken("PRODUCT_CATEGORY")[i],
					"product_quantity": this.valueForToken("PRODUCT_QUANTITY")[i]
				});
			}
			post_it(details);
		}
		onLoadCallBack(post_to_owned_it);

		/*~POST*/
	}
});