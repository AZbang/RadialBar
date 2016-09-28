var RadialBar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const helper = __webpack_require__(1);
	
	class RadialBar {
		constructor(ctx, config = {}) {
			this.ctx = ctx;
			this.styles(config);
	
			// const
			this.PERCENT_DEG = 360 / 100;
	
			// progress bar
			this.isStop = false;
			this.progress = config.progress || 0;
			this.degProgress = this.progress * this.PERCENT_DEG;
			this.isShowInfoText = config.isShowInfoText == null ? true : config.isShowInfoText;
		}
	
		_roundProgress() {
			this.degProgress = Math.ceil(this.degProgress * 100) / 100;
			this.progress = Math.ceil(this.progress * 100) / 100;
		}
	
		styles(config) {
			// pos
			this.x = config.x || 0;
			this.y = config.y || 0;
	
			// style
			this.radius = config.radius == null ? 50 : config.radius;
			this.lineWidth = config.lineWidth == null ? 10 : config.lineWidth;
	
			this.angle = config.angle || 0;
	
			this.lineFill = config.lineFill || '#fff';
	
			this.backLineFill = config.backLineFill || 'transparent';
			this.bgFill = config.bgFill || 'transparent';
	
			this.infoStyle = config.infoStyle || '24px Arial';
			this.infoColor = config.infoColor || '#000';
	
			this.isStop = config.isStop == null ? false : config.isStop;
		}
	
		set(p) {
			if (!this.isStop) {
				this.saveProgress = this.progress;
				this.degProgress = p * this.PERCENT_DEG;
				this.progress = p;
	
				this._roundProgress();
			}
		}
		subtract(p) {
			if (!this.isStop) {
				this.saveProgress = this.progress;
				this.degProgress -= p * this.PERCENT_DEG;
				this.progress -= p;
	
				this._roundProgress();
	
				if (this.progress < 0) {
					this.progress = 0;
					this.degProgress = 0.01;
				}
			}
		}
		add(p) {
			if (!this.isStop) {
				this.saveProgress = this.progress;
				this.degProgress += p * this.PERCENT_DEG;
				this.progress += p;
	
				this._roundProgress();
	
				if (this.progress > 100) {
					this.progress = 100;
					this.degProgress = 359.99;
				}
			}
		}
		// stop(p) {
		// 	if(this.progress !== this.saveProgress) this.isStop = true;
		// 	console.log(this.progress, this.saveProgress);
		// }
		// start(p) {
		// 	if(this.progress !== this.saveProgress) this.isStop = false;
		// }
		// toggleStop(p) {
		// 	if(this.progress !== this.saveProgress) this.isStop = !this.isStop;
		// }
	
		get(p) {
			return Math.floor(this.progress);
		}
	
		showInfoText(p) {
			this.ctx.save();
			this.ctx.fillStyle = this.infoColor;
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'middle';
			this.ctx.font = this.infoStyle;
	
			this.ctx.fillText(this.get() + '%', this.x, this.y);
			this.ctx.restore();
		}
	
		update() {
			this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(helper.toRad(-90 + this.angle));
	
			this.ctx.lineWidth = this.lineWidth;
	
			this.ctx.fillStyle = this.bgFill;
			this.ctx.beginPath();
			this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			this.ctx.fill();
	
			this.ctx.strokeStyle = this.backLineFill;
			this.ctx.beginPath();
			this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			this.ctx.stroke();
	
			this.ctx.strokeStyle = this.lineFill;
			this.ctx.beginPath();
			this.ctx.arc(0, 0, this.radius, 0, helper.toRad(this.degProgress), true);
			this.ctx.stroke();
	
			this.ctx.restore();
	
			if (this.isShowInfoText) this.showInfoText();
		}
	}
	
	module.exports = RadialBar;

/***/ },
/* 1 */
/***/ function(module, exports) {

	var helper = {
		toRad: function (deg) {
			return deg * Math.PI / 180;
		}
	};
	
	module.exports = helper;

/***/ }
/******/ ]);
//# sourceMappingURL=RadialBar.js.map