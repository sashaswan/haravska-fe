$('#logout').click(function () {
	localStorage.clear();
	window.location.replace('https://sashaswan.github.io/haravska-fe/login');
});
const tableRow = `
<div class="row func">
    <div class="columns large-6 medium-6 small-12 line">
	    <p>{{title}}</p>
    </div>
    <div class="columns large-6 medium-6 small-12">
	    <ul class="editor" data-id="{{id}}">
		    <li class="edit">edit</li>
		    <li class="delete">delete</li>
		    <li>archive</li>
		    <li>unarchive</li>
	    </ul>
    </div>
</div>`;
function renderTable() {
	console.log(TOKEN);
	$.ajax({
		type: "GET",
		headers: {
			"x-access-token": TOKEN
		},
		url: `${HOST_URL}/api/v1/photo-sessions`,
		success: function (data) {
			$('#table').html('');
			data.forEach((session) => {
				$('#table').append(tableRow.replace('{{title}}', session.title).replace('{{id}}', session._id));
			});
			addEventListenersButtons();
		}
	});
}
renderTable();
function addEventListenersButtons() {
	$('.edit').click(function () {
		const id = $(this).closest('.editor').attr('data-id');
		window.location.replace(`https://sashaswan.github.io/haravska-fe/update?id=${id}`);
	});
	$('.delete').click(function () {
		const id = $(this).closest('.editor').attr('data-id');
		const shouldDelete = confirm('Are you sure?');
		if (shouldDelete) {
			$.ajax({
				type: "DELETE",
				headers: {
					"x-access-token": TOKEN
				},
				url: `${HOST_URL}/api/v1/photo-sessions/${id}`,
				success: function (data) {
					console.log(data.message);
					renderTable();
				}
			});
		}
	});
}

