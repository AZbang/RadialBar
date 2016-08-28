var RadialBar = function(ctx, config) {
	this.ctx = ctx;

	if(!config) config = {};

	// pos
	this.x = config.x || 0;
	this.y = config.y || 0;

	// style
	this.radius = config.radius || 50;
	this.lineWidth = config.lineWidth || 10;

	this.lineFill = config.lineFill || '#fff';

	this.backLineFill = config.backLineFill || 'transparent';
	this.bgFill = config.bgFill || 'transparent';

	this.infoStyle = config.infoStyle || '24px Arial';
	this.infoColor = config.infoColor || '#000';

	// const
	this.PERCENT_DEG = 360/100;

	// progress bar
	this.progress = config.progress || 0;
	this.degProgress = this.progress*this.PERCENT_DEG;
	this.isShowInfoText = config.isShowInfoText == null ? true : config.isShowInfoText;
}

RadialBar.prototype.radians = function(deg) {
	return deg * Math.PI/180
}
RadialBar.prototype.set = function(p) {
	this.degProgress = p*this.PERCENT_DEG;
	this.progress = p;

	this.roundProgress();
}
RadialBar.prototype.subtract = function(p) {
	this.degProgress -= p*this.PERCENT_DEG;
	this.progress -= p;

	this.roundProgress();

	if(this.progress < 0) {
		this.progress = 0;
		this.degProgress = 0.01;
	}
}
RadialBar.prototype.add = function(p) {
	this.degProgress += p*this.PERCENT_DEG;
	this.progress += p;

	this.roundProgress();

	if(this.progress > 100) {
		this.progress = 100;
		this.degProgress = 359.99;
	}
}
RadialBar.prototype.roundProgress = function() {
	this.degProgress = Math.ceil((this.degProgress)*100)/100;
	this.progress = Math.ceil((this.progress)*100)/100;
}

RadialBar.prototype.get = function(p) {
	return Math.floor(this.progress) + '%';
}

RadialBar.prototype.showInfoText = function(p) {
	this.ctx.save();
		this.ctx.fillStyle = this.infoColor;
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle'; 
		this.ctx.font = this.infoStyle;

		this.ctx.fillText(this.get(), this.x, this.y);
	this.ctx.restore();
}

RadialBar.prototype.update = function() {
	this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.radians(-90));

		this.ctx.lineWidth = this.lineWidth;

		this.ctx.fillStyle = this.bgFill;
		this.ctx.beginPath();
		this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		this.ctx.fill();

		this.ctx.strokeStyle = this.backLineFill;
		this.ctx.beginPath();
		this.ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		this.ctx.stroke();

		this.ctx.strokeStyle = this.lineFill;
		this.ctx.beginPath();
		this.ctx.arc(0, 0, this.radius, this.radians(0), this.radians(this.degProgress), true);
		this.ctx.stroke();

	this.ctx.restore();

	if(this.isShowInfoText) this.showInfoText();
}