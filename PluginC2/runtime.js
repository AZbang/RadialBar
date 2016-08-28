"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.gamepadTest = function(runtime) {
	this.runtime = runtime;
};

(function () {
	var pluginProto = cr.plugins_.gamepadTest.prototype;
	
	var isSupported = false;
	var gamepad = new Gamepad();

	pluginProto.Type = function(plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;

		isSupported = gamepad.init();
	};

	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function() {
	};

	// Instance class
	pluginProto.Instance = function(type) {
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function() {
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	};
	
	instanceProto.onDestroy = function () {
	};
	
	instanceProto.saveToJSON = function () {
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	instanceProto.loadFromJSON = function (o) {
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	instanceProto.draw = function(ctx) {
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw) {
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections) {
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();
	
	// Actions
	function Acts() {};
	pluginProto.acts = new Acts();
	
	// Expressions
	function Exps() {};

	Exps.prototype.SupportsGamepad = function(ret) {
		ret.set_int(+isSupported);
	};

	pluginProto.exps = new Exps();

}());
