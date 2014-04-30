//:include tagsdk-current.js
var version = "";
var classPath = "mediaplex.vouchercodeenterediframe" + version;

qubit.opentag.LibraryTag.define(classPath + ".Tag", {
	config: {
		/*DATA*/
		name: "Voucher code entered iframe",
		async: true,
		description: "This iframe passes back the pageview along with the validated voucher code being used. It should be fired once, as soon as possible after validating a voucher (before confirmation).",
		html: "<!--@SRC@--><script type=\"text/javascript\">\n(function(){\n\n  var frame = document.createElement(\"frame\");\n  var src = (document.location.protocol === \"https:\") ? \"https://secure.\" : \"http://\";\n  src = src + \"img-cdn.mediaplex.com/0/${client_id}/universal.html?page_name=${page_name}&${event_name}=1&PromoCode=${promo_code}&mpuid=\";\n  frame.src = src;\n  frame.height = 1;\n  frame.width = 1;\n  frame.frameborder = 0;\n  document.body.appendChild(frame);\n\n})();\n</script>",
		imageUrl: "https://s3-eu-west-1.amazonaws.com/opentag-images/mediaplex.png",
		locationDetail: "",
		isPrivate: false,
		url: "",
		usesDocWrite: false,
		parameters: [{
			name: "Mediaplex Client ID",
			description: "The ID assigned to you by Mediaplex",
			token: "client_id",
			uv: ""
		}, {
			name: "Page Name",
			description: "The name of the page being accessed. Typically all lowercase, with underscores",
			token: "page_name",
			uv: ""
		}, {
			name: "Event Name",
			description: "The name of the event triggered. Typically, this is a CamelCased version of the page name",
			token: "event_name",
			uv: ""
		}, {
			name: "Voucher Code",
			description: "The voucher code used in this order - leave blank if none.",
			token: "promo_code",
			uv: "universal_variable.basket.voucher"
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
		/*~POST*/
	}
});