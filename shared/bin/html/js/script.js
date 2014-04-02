var libraryTemplate = document.getElementById("library-template").innerHTML;
/**
 * 
 * @type @exp;document@call;getElementById@pro;innerHTML
 */
function renderLibraryToNode(libraryClass ,libraryNode, className, cfg) {
  cfg = cfg || {};
  var instance = new libraryClass();
  instance.unregisterTag();
  
  if (cfg.parameters && instance.config.parameters) {
    for (var i = 0; i < cfg.parameters.length; i++) {
      var token = cfg.parameters[i].token;
      for (var j = 0; j < instance.config.parameters.length; j++) {
        if (instance.config.parameters[j].token === token) {
          instance.config.parameters[j] = cfg.parameters[i];
        }
      }
    }
  }
  
  var fullName = instance.PACKAGE_NAME + "." + instance.CLASS_NAME;
  
  if (!libraryNode) {
    libraryNode =  document.getElementById(fullName);
    qubit.opentag.Utils.removeClass(libraryNode, "tests-failed");
    qubit.opentag.Utils.removeClass(libraryNode, "tests-passed");
    qubit.opentag.Utils.removeClass(libraryNode, "tests-notests");
  }

  libraryNode.setAttribute("library-node", "true");

  libraryNode.innerHTML = libraryTemplate;
  libraryNode.children[0].children[1].innerHTML = instance.config.name;
  qubit.opentag.Utils.addClass(libraryNode, "library");
  if (className) {
    qubit.opentag.Utils.addClass(libraryNode, className);
  }
  libraryNode.reference = instance;
  libraryNode.classReference = libraryClass;
  libraryNode.id = fullName;

  var params = instance.config.parameters;
  var head = libraryNode.children[6].children[0];
  var contents = libraryNode.children[6].children[1];
  try {
    var configObject = qubit.opentag.Utils
            .getObjectUsingPath(instance.PACKAGE_NAME + ".local.Config");
    if (configObject && configObject.parameters) {
      params = configObject.parameters;
    }
  } catch (ex) {
    //may not be in there
  }
  head.children[0].innerHTML =  
          (instance.config.imageUrl ?
            "<img class='logo' src='" + instance.config.imageUrl +
              "' align='right' />" :
            "") +
            instance.config.description;
  
  addParameters(contents, params);
  addConfig(contents, instance.config);
  addPrePostTemplate(contents, instance);
  addTestsSuite(contents, instance);
}
/**
 * 
 * Adding library function to anchor.
 * 
 * 
 * @type @exp;document@call;getElementById@pro;innerHTML
 */
function addLibrary(anchor, libraryClass) {
  var libraryNode = document.createElement("div");
  anchor.appendChild(libraryNode);
  
  var url = "/getClassPath?classPath=libraries." +
          libraryClass.prototype.PACKAGE_NAME +
          ".local&file=Config.js";
  try {
    GET(url, function(msg) {
      try {
        qubit.opentag.Utils.geval(msg);//RUN CONFIG HERE WHEN CLASS IS LOADED
      } catch (e) {}
      renderLibraryToNode(libraryClass, libraryNode, "hide");
    });
  } catch (ex) {
    //any excpetion
    renderLibraryToNode(libraryClass, libraryNode, "hide");
  }
}







var parameterTemplate = document.getElementById("parameter-template").innerHTML;
var parametersTemplate = document.getElementById("parameters-template").innerHTML;
/**
 * 
 * @param {type} anchor
 * @param {type} params
 * @returns {undefined}
 */
function addParameters(anchor, params) {
  var e = document.createElement("div");
  e.innerHTML = parametersTemplate;
  e.className = "parameters-container";
  anchor.appendChild(e);
  anchor = e.children[1];
  for (var i = 0; i < params.length; i++) {
    e = document.createElement("div");
    var parameter = params[i];
    e.innerHTML = parameterTemplate;
    e.getElementsByTagName("input")[0].pindex = i;
    e.getElementsByTagName("label")[0].innerHTML = parameter.name;
    var enterValue = parameter.inputVariable ? parameter.inputVariable : "";
    e.getElementsByTagName("input")[0].value = enterValue;
    e.getElementsByTagName("input")[0].className = 
            parameter.inputVariable ? "" : "red";
    anchor.appendChild(e);
  }
}




var excluded = [
  "parameters",
  "PACKAGE",
  "dependencies",
  "CONSTRUCTOR",
  "dedupe",
  "priv",
  "name",
  "description",
  "inactive",
  "loadDependenciesOnLoad"
];
function propertyExcludedFromConfig(prop) {
  for (var i = 0; i < excluded.length; i++) {
    if (prop === excluded[i]) {
      return true;
    }
  }
  return false;
}
var hidden = [
  "filterTimeout",
  "isPrivate", ,
  "usesDocumentWrite",
  "timeout",
  "singleton",
  "locationPlaceHolder",
  "locationDetail",
  "locationObject",
  "noMultipleLoad",
  "__proto__"
];
function propertyHiddenFromConfig(prop) {
  for (var i = 0; i < hidden.length; i++) {
    if (prop === hidden[i]) {
      return true;
    }
  }
  return false;
}
function prepareConfigElement(prop, value, configTemplate) {
  var e = document.createElement("div");
  var p = value;
  e.innerHTML = configTemplate;
  e.children[0].className = "config";
  e.getElementsByTagName("input")[0].cname = prop;
  e.getElementsByTagName("label")[0].innerHTML = prop;
  if (p !== undefined) {
    e.getElementsByTagName("input")[0].value = p;
  }
  e.getElementsByTagName("input")[0].entered = true;
  return e;
}
/**
 * 
 * @type @exp;document@call;getElementById@pro;innerHTML
 */
var configTemplate = document.getElementById("config-template").innerHTML;
var hiddenConfigTemplate = document.getElementById("toggled-config-template").innerHTML;
function addConfig(anchor, config) {
  var el = document.createElement("div");
  el.innerHTML = hiddenConfigTemplate;
  el.className = "config-header";
  var confHead = el.children[0].children[0];
  confHead.innerHTML = "+ Configuration";
  toggleShowSibling(confHead);
  var configAnchor = el.children[0].children[1];
  anchor.appendChild(el);
  for (var prop in config) {
    if (!propertyExcludedFromConfig(prop) && !propertyHiddenFromConfig(prop)) {
      var e = prepareConfigElement(prop, config[prop], configTemplate);
      configAnchor.appendChild(e);
    }
  }
  var hel = document.createElement("div");
  hel.innerHTML = hiddenConfigTemplate;
  hel.className = "config-header";
  configAnchor.appendChild(hel);
  var confHead = hel.children[0].children[0];
  configAnchor = hel.children[0].children[1];
  toggleShowSibling(confHead);
  confHead.innerHTML = "+ Advanced";
  for (var prop in config) {
    if (!propertyExcludedFromConfig(prop) && propertyHiddenFromConfig(prop)) {
      var e = prepareConfigElement(prop, config[prop], configTemplate);
      configAnchor.appendChild(e);
    }
  }
}



/**
 * 
 * @type @exp;document@call;getElementById@pro;innerHTML
 */
var prePostTemplate = document.getElementById("pre-post-script-template").innerHTML;
function addPrePostTemplate(anchor, tag) {
  var e = document.createElement("div");
  e.innerHTML = prePostTemplate;
  var txtAreas = e.getElementsByTagName("textarea");
  //we know order
  var pre = txtAreas[0];
  var post = txtAreas[1];
  var script = txtAreas[2];

  var pre_value = tag.config.pre ? tag.config.pre : String(tag.pre);
  var post_value = tag.config.post ? tag.config.post : String(tag.post);
  var script_value = tag.config.script ? tag.config.script : String(tag.script);

  pre.value = String(pre_value);
  post.value = String(post_value);
  script.value = String(script_value);

  pre.style.display = "none";
  post.style.display = "none";
  script.style.display = "none";

  tag.preNode = pre;
  tag.postNode = post;
  tag.scriptNode = script;

  //@TODO add case config.prop is a function...
  anchor.appendChild(e);
}






/**
 * Tests section
 * 
 */
var testTemplate = document.getElementById("unit-test-template").innerHTML;
function addTest(anchor, testInstance) {
  var e = document.createElement("div");
  e.innerHTML = testTemplate;
  e.className = "unit-test";
  testInstance.testNode = e;
  
  testInstance.statusNode = e.children[0];
  testInstance.nameNode = e.children[1];
  
  testInstance.nameNode.innerHTML = testInstance.name;
  
  testInstance.onFinished = function () {
    var Utils = qubit.opentag.Utils;
    if (this.failed) {
      Utils.addClass(this.statusNode, "failed");
    } else if (this.passed) {
      Utils.addClass(this.statusNode, "passed");
    }
  };
  
  //@TODO add case config.prop is a function...
  anchor.appendChild(e);
}
var testsSuiteTemplate = document.getElementById("unit-tests-suite-template").innerHTML;
function addTestsSuite(anchor, tagInstance) {
  var e = document.createElement("div");
  e.className = "unit-tests-suite";
  e.innerHTML = testsSuiteTemplate;
  
  var Utils = qubit.opentag.Utils;
  var suite = Utils
          .getObjectUsingPath(tagInstance.PACKAGE_NAME + ".local.TestsSuite");
  anchor.appendChild(e);
  if (suite) {
//    e.children[1].children[0].innerHTML = suite.before ? String(suite.before) : "";
//    e.children[2].children[0].innerHTML = suite.after ? String(suite.after) : "";
    var unitTestsNode = e.children[1];
    renderTestsToNode(unitTestsNode, suite);
    
  }
}
function renderTestsToNode(unitTestsNode, suite) {
  if (suite) {
    unitTestsNode.innerHTML = "";
    var tests = suite.tests;
    for (var i = 0; i < tests.length; i++) {
      addTest(unitTestsNode, tests[i]);
    }
  }
}



function prepareVendorNode(name) {
  var vendorNode = document.createElement("div");
  vendorNode.innerHTML = "<a class='plain' href='#-2'>" + name + "</a>";
  vendorNode.className = "vendor";
  vendorNode.children[0].onclick = function() {
    var hs = !this.ishidden ? "hide" : "show";
    this.ishidden = !this.ishidden;
    this.parentNode.className = "vendor " + hs;
  };
  return vendorNode;
}

/**
 * 
 * @returns {undefined}
 */
function renderAllLibrariesToPage() {
  var librariesNode = document.getElementById("libraries");
  librariesNode.innerHTML = "";
  var vendors = qubit.opentag.libraries;
  for (var vprop in vendors) {
    var vendor = vendors[vprop];
    var vendorNode = prepareVendorNode(vprop);

    for (var lprop in vendor) {
      try {
        var libraryClass = vendor[lprop].Tag;
        var ctest = new libraryClass({});
        ctest.unregisterTag();
        if ((ctest) instanceof qubit.opentag.LibraryTag) {
          addLibrary(vendorNode, libraryClass);
        }
      } catch (ex) {
        //must prompt
        if (window.console && console.log) {
          console.log("Failed to load tag configuration," +
                  " possible syntax error:" + ex);
        } else {
          alert("Failed to load tag configuration," +
                  " possible syntax error:" + ex);
        }
      }
    }
    librariesNode.appendChild(vendorNode);
  }
}




/*
 * Ugly main.
 * 
 * 
 */
var scripts = [];
window.Main = function () {
  var srcs = document.getElementsByTagName("font");
  var total = srcs.length;
  var counted = 0;
  
  createProgressBar("Loading scipts...", function () {
    return 100 * (counted/total);
  });
  
  
  for (var i = 0; i < srcs.length; i++) {
    (function (j) {
      
      var url = srcs[i].getAttribute("link");
      GET(url, function(msg, xhrobj) {
        scripts[j] = msg;
        try{console.log(url);}catch(e){}
        ++counted;
        if (total === counted) {
          for (var x = 0; x < scripts.length; x++) {
            try {
              eval(scripts[x]);
            } catch (ex) {
              alert("Failed to load: " + scripts[x]+ "\nException: " + ex);
            }
          }
          listScripts();
          renderAllLibrariesToPage();
        }
      });

    })(i);
  }
};
function listScripts() {
  var html = "<div>";
  var scripts = document.getElementsByTagName("font");
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute("link");
    if (src) {
      html += "<a href='" + src + "' target='frame" + i + "' >" +
              src +
              "</a><br/>";
    }
  }
  html += "</div>";
  document.getElementById("sources").innerHTML = html;
}

//window.alert= function () {};

//progres bar
var progressBarTemplate = document.getElementById("progress-bar-template").innerHTML;
function createProgressBar(title, updater) {
  var e = document.createElement("div");
  e.className = "progress-bar";
  e.innerHTML = progressBarTemplate;
  document.body.appendChild(e);
  e.bar = e.children[0].children[0];
  e.titleNode = e.bar.children[0];
  e.titleNode.innerHTML = title;
  e.progress = e.bar.children[1];
  var checkAgainProgress = function () {
    var val = updater();
    if (val >= 100) {
      e.titleNode.innerHTML = title + " 100% Done.";
      e.progress.style.width = "100%";
      setTimeout(function () {document.body.removeChild(e);}, 1000);
    } else {
      e.titleNode.innerHTML = title + " " + Math.floor(val) + "%";
      e.progress.style.width = Math.floor(val) + "%";
      setTimeout(checkAgainProgress, 20);
    }
  };
  checkAgainProgress();
}
