var data = [
	{
		type: 'left',
		image: [
			'https://sashaswan.github.io/haravska-fe/images/greenline/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/greenline/2.jpg'
		]
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska-fe/images/circle/greencircle.svg'
	},
	{
		type: 'right',
		image: [
			'https://sashaswan.github.io/haravska-fe/images/greenline/3.jpg',
			'https://sashaswan.github.io/haravska-fe/images/greenline/4.jpg'
		]
		title: 'Green Line',
		circleLeft: ''
	},
	{
		type: 'left',
		image: [
			'https://sashaswan.github.io/haravska-fe/images/greenline/5.jpg',
			'https://sashaswan.github.io/haravska-fe/images/greenline/6.jpg'
		]
		title: 'Green Line',
		circleLeft: ''
	},
	{
		type: 'right',
		image: [
			'https://sashaswan.github.io/haravska-fe/images/greenline/7.jpg',
			'https://sashaswan.github.io/haravska-fe/images/greenline/8.jpg',
		]
		title: 'HARAVSKA',
		circleLeft: 'https://sashaswan.github.io/haravska-fe/images/circle/greencircle.svg'
	},
	{
		type: 'left',
		image: [
			'https://sashaswan.github.io/haravska-fe/images/greenline/9.jpg',
			'https://sashaswan.github.io/haravska-fe/images/greenline/10.jpg',
		]
		circleLeft: ''
	}
];
var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska-fe/greenlineType/' + types[i] + '.html', false);
		rawFile.onreadystatechange = function () {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					templates[types[i]] = rawFile.responseText;
					resolve();
				}
			}
		}
		rawFile.send(null);
	});
	promises.push(promise);
}
Promise.all(promises).then(buildHtml);

function buildHtml() {
	for (var i = 0; i < data.length; i++) {
		var template = templates[data[i].type]
			.replace('{{image0}}', data[i].image[0])
			.replace('{{image1}}', data[i].image[1])
			.replace('{{circleLeft}}', data[i].circleLeft)
			.replace('{{title}}', data[i].title);

		if (data[i].title === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}
		$('.greenloop').append(template);
	}
	console.log(templates);
}