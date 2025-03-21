var templates = {};

$.urlParam = (name) => {
	var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
	if (results === null) {
		return null;
	}
	else {
		return results[1] || 0;
	}
}

$.ajax({
	type: "GET",
	headers: {
		"x-access-token": TOKEN,
	},
	url: `${HOST_URL}/api/v1/photo-sessions/${$.urlParam('id')}`,
	success: function (data) {
		var types = ['center', 'double', 'title'];
		var promises = [];
		for (var i = 0; i < types.length; i++) {
			console.log(types[i]);
			var promise = new Promise(function (resolve, reject) {
				var rawFile = new XMLHttpRequest();
				console.log(types[i]);
				rawFile.open("GET", 'https://sashaswan.github.io/haravska-fe/photoType/' + types[i] + '.html', false);
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
		Promise.all(promises).then(() => buildHtml(data.sections));
	}
});
function buildHtml(sections) {
	const orderedSections = sections.sort((first, second) => first._id > second._id ? 1 : -1)
	for (var i = 0; i < orderedSections.length; i++) {
		const type = orderedSections[i].type === 'section'
			? (orderedSections[i].photos.length > 1 ? 'double' : 'center')
			: orderedSections[i].type;
		var template = templates[type];
		const firstPhoto = orderedSections[i].photos[0]
			? HOST_URL + orderedSections[i].photos[0]
			: orderedSections[i].photos[0];
		const secondPhoto = orderedSections[i].photos[1]
			? HOST_URL + orderedSections[i].photos[1]
			: orderedSections[i].photos[1];
		if (orderedSections[i].type === 'title') {
			template = template
				.replace('{{circleLeft}}', firstPhoto)
				.replace('{{title}}', orderedSections[i].title);
		} else {
			template = template
				.replace('{{image0}}', firstPhoto)
				.replace('{{image1}}', secondPhoto);
		}
		$('.dianamodel').append(template);
	}
	console.log(templates);
}