window.onload = function() {
	// Controll
	var canvas = document.getElementById('paper');
	var ctx = canvas.getContext('2d');

	canvas.width = 800;
	canvas.height = 600;

	var firstProgressBar = new RadialBar(ctx, {
		x: 300,
		y: 300,
		angle: 250,
		radius: 150,
		lineWidth: 40,
		lineFill: '#CCB566',
		backLineFill: '#FB6929',
		bgFill: '#F8FF8E',
		isShowInfoText: true,
		infoStyle: '60px Arial'
	});

	var secondProgressBar = new RadialBar(ctx, {
		x: 500,
		y: 500,
		angle: 50,
		radius: 60,
		lineWidth: 4,
		lineFill: '#CCB566',
		backLineFill: '#FB6929',
		bgFill: '#F8FF8E',
		progress: 100,
		isShowInfoText: true,
		infoStyle: '30px Arial',
		infoColor: 'red'
	});
	var thirdProgressBar = new RadialBar(ctx, {
		x: 600,
		y: 150,
		radius: 50,
		lineWidth: 100,
		lineFill: '#CCB566',
		backLineFill: '#FB6929',
		bgFill: '#F8FF8E',
		isShowInfoText: true,
		infoStyle: '40px Arial'

	});
	var fourthProgressBar = new RadialBar(ctx, {
		x: 600,
		y: 400,
		radius: 20,
		lineWidth: 20,
		lineFill: '#CCB566',
		backLineFill: '#FB6929',
		bgFill: '#F8FF8E',
		isShowInfoText: true,
		infoFamily: '20px Arial'

	});

	function loop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		firstProgressBar.add(0.1);
		secondProgressBar.subtract(0.2);
		thirdProgressBar.add(0.15);
		fourthProgressBar.set(50);

		firstProgressBar.update();
		secondProgressBar.update();
		thirdProgressBar.update();
		fourthProgressBar.update();

		requestAnimationFrame(loop);
	}
	loop();
}