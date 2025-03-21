var data = [
	{
		type: 'left',
		image: '/images/beauty/1.jpg',
		title: 'The Way of Being',
		model: 'Anastasia Kostiuk',
		modelAgency: '/ Motherland Agency',
		modelName: 'Olesha Oleksyuk',
		style:'Olesha Oleksyuk',
		link:'/theway',
		mua: 'Mua:',
		styleMark: 'Style:'
	}
];
var types = ['left'];
var templates = {};
var promises = [];
for (var i = 0; i < types.length; i++) {
	var promise = new Promise (function (resolve, reject) {
		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", '/beautyType/' + types[i] + '.html', false);
	    rawFile.onreadystatechange = function () {
	        if(rawFile.readyState === 4) {
	            if(rawFile.status === 200 || rawFile.status == 0) {
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
			.replace('{{mua}}', data[i].mua)
			.replace('{{styleMark}}', data[i].styleMark)
			.replace('{{link}}', data[i].link);
		$('.beautyloop').append(template);
	}
	console.log(templates);
}