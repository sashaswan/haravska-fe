var data = [
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/1.jpg',
		title: 'KATRIN',
		model: 'Katrin',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ Talents Models Munich',
		modelName: '',
		style: '',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/katrin/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/katrin/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/katrin/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/katrin',
		mua: '',
		styleMark: ''
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/2.jpg',
		title: 'MARY',
		model: 'Mary Nemzer',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ Charme de la Mode',
		modelName: '',
		style: '',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/mary/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/mary/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/mary/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/mary',
		mua: '',
		styleMark: ''
	},
	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/3.jpg',
		title: 'GINGER',
		model: 'Kateryna Sitak',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ 1 Mother Agency',
		modelName: 'Sofi Slobodian',
		style: '',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/ginger/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/ginger/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/ginger/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/ginger',
		mua: 'Mua:',
		styleMark: ''
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/4.jpg',
		title: 'VICKY',
		model: 'Viktoria Rakocha',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ Grace Models',
		modelName: 'Sofi Slobodian',
		style: 'Nataliya Novitska',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/vicky/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/vicky/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/vicky/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/vicky',
		mua: 'Mua:',
		styleMark: 'Style:'
	},

	{
		type: 'left',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/5.jpg',
		title: 'DIANA',
		model: 'Diana',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ Grace Models',
		modelName: 'Olga Zayarnaya',
		style: 'Yanina Gor',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/diana/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/diana/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/diana/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/diana',
		mua: 'Mua:',
		styleMark: 'Style:'
	},
	{
		type: 'right',
		image: 'https://sashaswan.github.io/haravska-fe/images/modeltest/6.jpg',
		title: 'VALERY',
		model: 'Valeria',
		modelAgency: 'https://sashaswan.github.io/haravska-fe/ OK’S Models',
		modelName: '',
		style: '',
		slider: [
			'https://sashaswan.github.io/haravska-fe/images/modeltest/valery/1.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/valery/2.jpg',
			'https://sashaswan.github.io/haravska-fe/images/modeltest/valery/3.jpg'
		],
		link: 'https://sashaswan.github.io/haravska-fe/valery',
		mua: '',
		styleMark: ''
	}
];
var types = ['left', 'right'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise(function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", 'https://sashaswan.github.io/haravska-fe/modeltestType/' + types[i] + '.html', false);
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
			.replace('{{model}}', data[i].model)
			.replace('{{modelAgency}}', data[i].modelAgency)
			.replace('{{modelName}}', data[i].modelName)
			.replace('{{style}}', data[i].style)
			.replace('{{designer}}', data[i].designer)
			.replace('{{slider0}}', data[i].slider[0])
			.replace('{{slider1}}', data[i].slider[1])
			.replace('{{slider2}}', data[i].slider[2])
			.replace('{{mua}}', data[i].mua)
			.replace('{{styleMark}}', data[i].styleMark)
			.replace('{{link}}', data[i].link)
		$('.modelloop').append(template);
	}
	console.log(templates);
}