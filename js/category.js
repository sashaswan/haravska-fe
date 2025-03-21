const templates = {};

$.categoryName = () => {
	var results = window.location.href.split('/');
	return results.reverse()[1];
}

$('title').text($.categoryName().toUpperCase())
$.ajax({
	type: "GET",
	headers: {
		"x-access-token": TOKEN
	},
	url: `${HOST_URL}/api/v1/categories/${$.categoryName()}`,
	success: function (data) {
		const photoSessions = data.photoSessions.map((photoSession, index) => ({
			...photoSession,
			type: index % 2 === 0 ? 'left' : 'right',
			link: `${window.location.origin}/photo?id=${photoSession._id}`
		}));
		getTemplates(photoSessions);
	}
});

function getTemplates(photoSessions) {
	var types = ['left', 'right', 'another'];
	var promises = [];
	for (var i = 0; i < types.length; i++) {
		var promise = new Promise(function (resolve, reject) {
			var rawFile = new XMLHttpRequest();
			rawFile.open("GET", '/categorytype/' + types[i] + '.html', false);
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
	Promise.all(promises).then(() => buildHtml(photoSessions));
}

function buildHtml(data) {
	for (var i = 0; i < data.length; i++) {
		const [mainImage, ...sliderImages] = data[i].slider;
		var template = templates[data[i].type]
			.replace('{{image}}', HOST_URL + mainImage)
			.replace('{{title}}', data[i].title)
			.replace('{{model}}', data[i].model)
			.replace('{{modelAgency}}', `<strong class="colormodel">Agency:</strong> ${data[i].agency}`)
			.replace('{{modelName}}', data[i].name)
			.replace('{{style}}', `<strong class="colormodel">Style:</strong> ${data[i].style}`)
			.replace('{{designer}}', data[i].designer)
			.replace('{{slider}}', sliderImages.map(image => `<img src="${HOST_URL + image}">`).join(''))
			.replace('{{mua}}', `<strong class="colormodel">Mua:</strong> ${data[i].mua}`)
			.replace('{{link}}', data[i].link);
		if (data[i].designer === undefined) {
			var start = template.indexOf('{{showdesign}}');
			var end = template.indexOf('{{/showdesign}}') + 14;
			template = template.substr(0, start) + template.substr(end + 1, template.length - end);
		} else {
			template = template
				.replace('{{showdesign}}', '')
				.replace('{{/showdesign}}', '');
		}
		$('.fashionpage').append(template);
	}
	$.getScript("../slider/fotorama.js");
}