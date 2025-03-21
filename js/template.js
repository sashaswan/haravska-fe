var data = [
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/service/1.png',
		title: 'Fashion',
		description: 'Lookbook / Campaign / Editorial / Promo',
		boxtitle: 'Fashion',
		link: 'https://sashaswan.github.io/haravska-fe/fashion',
		link2: 'https://sashaswan.github.io/haravska-fe/fashion'
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/service/2.png',
		title: 'Beauty',
		description: 'Make-up / Hair / Accessories',
		boxtitle: 'Beauty',
		link: 'https://sashaswan.github.io/haravska-fe/beauty',
		link2: 'https://sashaswan.github.io/haravska-fe/beauty'
	},
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/service/3.png',
		title: 'Model Test',
		description: '',
		boxtitle: 'Model Test',
		link: 'https://sashaswan.github.io/haravska-fe/modeltest',
		link2: 'https://sashaswan.github.io/haravska-fe/modeltest'
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/service/4.png',
		title: 'Portrait',
		description: 'Creative / Promo',
		boxtitle: 'Portrait',
		link: 'https://sashaswan.github.io/haravska-fe/portrait',
		link2: 'https://sashaswan.github.io/haravska-fe/portrait'
	},
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/service/5.png',
		title: 'Video',
		description: 'Fashion Film / Campaign / Lookbook / Backstage / Reportage/ Personal',
		boxtitle: 'Video',
		link: 'https://sashaswan.github.io/haravska-fe/videopage',
		link2: 'https://sashaswan.github.io/haravska-fe/videopage'
	}
];

var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska-fe/templates/' + types[i] + '.html', false);
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
			.replace('{{description}}', data[i].description)
			.replace('{{boxtitle}}', data[i].boxtitle)
			.replace('{{boxright}}', data[i].boxtitle)
			.replace('{{link}}', data[i].link)
			.replace('{{link2}}', data[i].link2)
		$('.templateserv').append(template);
	}
	console.log(templates);
}

