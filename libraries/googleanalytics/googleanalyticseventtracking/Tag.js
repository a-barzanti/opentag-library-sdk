//:include tagsdk-current.js
var version = "";
var classPath = "googleanalytics.googleanalyticseventtracking" + version;

qubit.opentag.LibraryTag.define(classPath + ".Tag", {
	config: {
		/*DATA*/
		name: "Google Analytics Event Tracking",
		async: true,
		description: "Allow the tracking of custom events on the page through Google Analytics. NOTE: This module does not load in Google Analytics, it simply allows for event tracking. The main GA script should be added separately.",
		html: "",
		imageUrl: "https://s3-eu-west-1.amazonaws.com/opentag-images/GoogleAnalytics.png",
		locationDetail: "",
		isPrivate: false,
		url: "",
		usesDocWrite: false,
		parameters: [{
			name: "Event Category",
			description: "Required. The name you supply for the group of objects you want to track.",
			token: "category",
			uv: ""
		}, {
			name: "Event Action",
			description: "Required. A string paired with each category. Used to define the type of interaction.",
			token: "action",
			uv: ""
		}, {
			name: "Event Label",
			description: "An optional string to provide additional dimensions to the event data.",
			token: "label",
			uv: ""
		}, {
			name: "Event Value",
			description: "An integer that you can use to provide numerical data about the user event.",
			token: "value",
			uv: ""
		}, {
			name: "Event Non Interaction",
			description: "A boolean that when set to true, the event hit will not be used in bounce-rate calculation.",
			token: "non_interaction",
			uv: ""
		}]
		/*~DATA*/
	},
	script: function() {
		/*SCRIPT*/

		window._gaq = window._gaq || [];
		window._gaq.push(['_trackEvent', '' + this.valueForToken("category") + '',
			'' + this.valueForToken("action") + '', '' + this.valueForToken("label") +
			'', this.valueForToken("value"), this.valueForToken("non_interaction")
		]);

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