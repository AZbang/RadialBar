function GetPluginSettings() {
	return {
		"name":	"RadialBar",
		"id": "RadialBarAZ",
		"version": "1.0",
		"description": "A plugin for creating radial progress bars.",
		"author": "AZbang",
		"category":	"Input",
		"type":	"General",
		"rotatable": false,
		"flags": 0,
		"dependency": "RadialBar.js"
	};
};

AddExpression(0, ef_return_number, "Gamepads are supported", "Gamepads", "SupportsGamepad", "True if the current platform or browser supports gamepad input.");
ACESDone();

var property_list = [
	new cr.Property(ept_text, "Test", "it's test!", "enter")
];
	
function CreateIDEObjectType() {
	return new IDEObjectType();
}

function IDEObjectType() {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function(instance) {
	return new IDEInstance(instance);
}

function IDEInstance(instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
		this.instance = instance;
	this.type = type;
	
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

IDEInstance.prototype.OnInserted = function() {
}

IDEInstance.prototype.OnDoubleClicked = function() {
}

IDEInstance.prototype.OnPropertyChanged = function(property_name) {
}

IDEInstance.prototype.OnRendererInit = function(renderer) {
}

IDEInstance.prototype.Draw = function(renderer) {
}

IDEInstance.prototype.OnRendererReleased = function(renderer) {
}