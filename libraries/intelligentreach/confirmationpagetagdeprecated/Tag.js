//:include tagsdk-current.js
var version = "";
var classPath = "intelligentreach.confirmationpagetagdeprecated" + version;

qubit.opentag.LibraryTag.define(classPath + ".Tag", {
	config: {
		/*DATA*/
		name: "Confirmation Page Tag - Deprecated",
		async: true,
		description: "The tag is placed on final checkout confirmation page only.",
		html: "",
		imageUrl: "https://s3-eu-west-1.amazonaws.com/opentag-images/IntelligentReach.png",
		locationDetail: "",
		isPrivate: true,
		url: "www.ist-track.com/ProcessPurchaseJavaScript.ashx?companyId=${id}",
		usesDocWrite: true,
		parameters: [{
			name: "Ultimate Feed ID",
			description: "Ultimate Feed client ID",
			token: "id",
			uv: ""
		}, {
			name: "Order Id",
			description: "A unique id for the order",
			token: "orderId",
			uv: "universal_variable.transaction.order_id"
		}, {
			name: "Order Total",
			description: "The total cost of the order",
			token: "orderTotal",
			uv: "universal_variable.transaction.total"
		}, {
			name: "Product SKUs",
			description: "An array of SKUs for each product",
			token: "productSku",
			uv: "universal_variable.transaction.line_items[#].product.sku_code"
		}, {
			name: "Order Quantities",
			description: "The quantities of each product purchased",
			token: "quantity",
			uv: "universal_variable.transaction.line_items[#].quantity"
		}, {
			name: "Sale Amounts",
			description: "The price of each product purchased, including any discounts",
			token: "saleAmount",
			uv: "universal_variable.transaction.line_items[#].product.unit_sale_price"
		}, {
			name: "Voucher Code",
			description: "The voucher code used with the purchase, if any",
			token: "voucher",
			uv: "universal_variable.transaction.voucher"
		}]
		/*~DATA*/
	},
	script: function() {
		/*SCRIPT*/
		/*~SCRIPT*/
	},
	pre: function() {
		/*PRE*/
		istCompanyId = "" + this.valueForToken("id") + "";
		istOrderId = this.valueForToken("orderId");
		istTotal = this.valueForToken("orderTotal");
		istItemCount = this.valueForToken("productSku").length;
		istNewCustomer = false;
		istPurchasedItems = "";
		istPurchasedItemQuantities = "";
		istPurchasedItemPrices = "";
		for (var i = 0; i < this.valueForToken("productSku").length; i++) {
			istPurchasedItems += this.valueForToken("productSku")[i];
			istPurchasedItemQuantities += this.valueForToken("quantity")[i].toString();
			istPurchasedItemPrices += this.valueForToken("saleAmount")[i].toString();

			if (this.valueForToken("productSku").length !== (i + 1)) {
				istPurchasedItems += "|";
				istPurchasedItemQuantities += "|";
				istPurchasedItemPrices += "|";
			}
		}
		istInstorePickup = false;
		istUserDefinedFieldOne = "";
		istUserDefinedFieldTwo = "";
		istUserDefinedFieldThree = "";
		istVoucherCode = this.valueForToken("voucher");
		istLastAffiliateCode = "";

		/*~PRE*/
	},
	post: function() {
		/*POST*/
		/*~POST*/
	}
});