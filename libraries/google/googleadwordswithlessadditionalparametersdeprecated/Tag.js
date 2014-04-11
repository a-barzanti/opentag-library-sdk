//:include tagsdk-current.js
var version = "";
var classPath = "google.googleadwordswithlessadditionalparametersdeprecated" +
	version;

qubit.opentag.LibraryTag.define(classPath + ".Tag", {
	config: {
		/*DATA*/
		name: "Google AdWords with less additional parameters DEPRECATED",
		async: true,
		description: "Tracks users that have converted who previously clicked through on an ad.",
		html: "",
		imageUrl: "https://s3-eu-west-1.amazonaws.com/opentag-images/Google.jpeg",
		locationDetail: "",
		isPrivate: true,
		url: "www.googleadservices.com/pagead/conversion_async.js",
		usesDocWrite: false,
		parameters: [{
			name: "Conversion ID",
			description: "",
			token: "conversion_id",
			uv: ""
		}, {
			name: "Conversion Label",
			description: "",
			token: "conversion_label",
			uv: ""
		}, {
			name: "Conversion Value",
			description: "",
			token: "conversion_value",
			uv: "universal_variable.transaction.subtotal"
		}, {
			name: "Conversion Format",
			description: "",
			token: "conversion_format",
			uv: ""
		}, {
			name: "Conversion Color",
			description: "",
			token: "conversion_color",
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
		window.google_trackConversion({
			google_conversion_id: this.valueForToken("conversion_id"),
			google_conversion_label: "" + this.valueForToken("conversion_label") + "",
			google_conversion_value: this.valueForToken("conversion_value"),
			google_conversion_format: "" + this.valueForToken("conversion_format") +
				"",
			google_conversion_color: "" + this.valueForToken("conversion_color") + "";
		});

		/*~POST*/
	}
});