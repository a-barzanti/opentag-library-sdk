//:import CurrentSDK

qubit.opentag.LibraryTag.define("struq.basketpagetagv19us.v1.Tag", {
	getDefaultConfig: function () {
      return {
		/*config*/
		name: "Basket Page Tag v1.9 (US)",
		async: true,
		description: "",
		html: "",
		locationDetail: "",
		isPrivate: false,
		url: "",
		usesDocWrite: false,
		upgradeable: true,
		parameters: [{
			name: "Struq Basket Page Pixel ID",
			description: "",
			token: "pixelid",
			uv: ""
		}, {
			name: "Struq Product List",
			description: "",
			token: "products",
			uv: "universal_variable.basket.line_items[#].product.id"
		}],
		categories:[
			"Re-Targeting"
		]

		/*~config*/
      };
  },
	script: function() {
		/*script*/
		window._struqPI = window._struqPI || [];
		var productArr = [];
		for (var i = 0, ii = this.valueForToken("products").length; i < ii; i++) {
			productArr.push(this.valueForToken("products")[i]);
		}
		var productStr = productArr.join(",");
		_struqPI.push(['injectTrackingPixel', {
			trackingPixelId: '' + this.valueForToken("pixelid"),
			route: '/s/sa/',
			collectData: false,
			data: [{
				title: "si",
				pid: productStr
			}],
			options: {
				timeoutMs: 2000,
				firstPartyDomain: '',
				firstPartyCookie: '',
				firstPartyUid: ''
			}
		}]);

		window.struq = document.createElement('script');
		struq.type = 'text/javascript';
		struq.async = true;
		struq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') +
			'media.struq.com/content/scripts/Struq_Us_Pixel_Injector_min_v1-9.js';
		document.getElementsByTagName('head')[0].appendChild(struq);
		/*~script*/
	},
	pre: function() {
		/*pre*/
		/*~pre*/
	},
	post: function() {
		/*post*/
		/*~post*/
	}
});
