var data = [
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/portrait/2.jpg',
		title: 'YARYNA',
		link: 'https://sashaswan.github.io/haravska-fe/yaryna',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/yaryna/slider/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/yaryna/slider/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/yaryna/slider/3.jpg'
		]
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/portrait/1.png',
		title: 'MARKO',
		link: 'https://sashaswan.github.io/haravska-fe/marko',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/marko/slider/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/marko/slider/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/marko/slider/3.jpg'
		]
	}
];
var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska-fe/portraitType/' + types[i] + '.html', false);
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
			.replace('{{image}}', data[i].image)
			.replace('{{title}}', data[i].title)
			.replace('{{link}}', data[i].link)
			.replace('{{slider0}}', data[i].slider[0])
			.replace('{{slider1}}', data[i].slider[1])
			.replace('{{slider2}}', data[i].slider[2])
		$('.portraitpage').append(template);
	}
	console.log(templates);
}