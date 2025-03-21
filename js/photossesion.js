const ids = [
	'title',
	'category',
	'model',
	'agency',
	'mua',
	'style',
	'designer',
	'name'
];
$('#save').click(function () {
	const sectionsDom = $('.section').toArray();
	const promises = [];
	const sections = sectionsDom.map((dom) => {
		const section = {
			type: $(dom).hasClass('holder') ? 'section' : 'title'
		};
		if (section.type === 'title') {
			section.title = $(dom).find('[name=photo_sesion]')[0].value;
		}
		section.photos = ($(dom).attr('data-photo') || '').split(',');
		return section;
	});
	let data = {
		sections: sections,
		slider: $('#add_picture').attr('data-photo').split(',') || []
	};
	ids.filter(id => $(`#${id}`).val()).forEach(id => {
		data[id] = $(`#${id}`).val();
	});
	console.log(data);
	// const formData = new FormData();
	// Object.keys(data).forEach(key => formData.append(key, data[key]))
	$.ajax({
		type: "POST",
		headers: {
			"x-access-token": TOKEN,
		},
		url: `${HOST_URL}/api/v1/photo-sessions`,
		data,
		success: function (data) {
			console.log(data);
			window.location.replace('https://sashaswan.github.io/haravska-fe/edit');
		}
	});
});

function encodeImageFileAsURL(file, callback) {
	let reader = new FileReader();
	reader.onloadend = () => callback(reader.result);
	reader.readAsDataURL(file);
}

$('#logout').click(function () {
	localStorage.clear();
	window.location.replace('https://sashaswan.github.io/haravska-fe/login');
});
