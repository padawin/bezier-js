(function (B) {
	function _bezier(value1, value2, value3, value4, t) {
		var u = 1 - t;
		var tt = t*t;
		var uu = u*u;
		var uuu = uu * u;
		var ttt = tt * t;

		var p = uuu * value1; //first term
		p += 3 * uu * t * value2; //second term
		p += 3 * u * tt * value3; //third term
		p += ttt * value4; //fourth term

		return p;
	}

	function bezier(canvasContext, point1, point2, point3, point4) {

		for (var t = 0.0; t <= 1.0; t += 0.001) {
			var point = [
				_bezier(point1[0], point2[0], point3[0], point4[0], t),
				_bezier(point1[1], point2[1], point3[1], point4[1], t)
			];

			drawPoint(
				canvasContext,
				_bezier(point1[0], point2[0], point3[0], point4[0], t),
				_bezier(point1[1], point2[1], point3[1], point4[1], t)
			);
		}
	}

	function drawPoint(canvasContext, pointX, pointY) {
		canvasContext.fillStyle = 'rgba(0,0,0)';
		canvasContext.fillRect(
			pointX,
			pointY,
			1, 1
		);
	}

	function _mouseCoordinates (element, event) {
		var rect = element.getBoundingClientRect(),
			root = document.documentElement;

		return [
			event.clientX - rect.left - root.scrollLeft,
			event.clientY - rect.top - root.scrollTop
		];
	}

	var points = [];
	var canvas = B.$id('canvas');
	var canvasContext = canvas.getContext('2d');

	B.on(canvas, 'click', function (e) {
		var point = _mouseCoordinates(canvas, e);
		points.push(_mouseCoordinates(canvas, e));
		drawPoint(canvasContext, point[0], point[1]);
		if (points.length == 4) {
			bezier(canvasContext, points[0], points[1], points[2], points[3]);
			points = [point];
		}
	});
})(loader.getModule('B'));
