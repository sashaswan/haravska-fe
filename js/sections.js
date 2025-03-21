$("#add_section").click(function () {
	$("#container").append(`
		<div class="holder section">
			<div class="close">X</div>
	    	<form class="choose_type">
				<label>Left, Right
				  <input type="radio" checked="checked" name="radio">
				  <span class="checkmark"></span>
				</label>
				<label>Center
				  <input type="radio" name="radio">
				  <span class="checkmark"></span>
				</label>
		    	<div class="top_center">
			    	<input type="file" name="pic" accept="image/*" multiple="true">
			    	<button type="button" class="upload-image">Upload Image</button>
		    	</div>
	    	</form>
		</div>`);
	$('.close').click(function () {
		$(this).closest('.holder').remove();
	});
	$('input[type=radio][name=radio]').change(function () {
		const fileInput = $(this).closest('form').find('input[type=file]');
		if (fileInput.attr('multiple')) {
			fileInput.removeAttr('multiple');
		} else {
			fileInput.attr('multiple', 'true');
		}
	});
	addEventListenerForUploadButton();
});
$("#add_title").click(function () {
	$("#container").append(`
		<div class="title_inside section">
			<div class="close">X</div>
	    	<form class="photosesion">
		    	<input type="text" name="photo_sesion" placeholder="name photosesion">
		    	<label class="svg">svg</label>
		    	<input type="file" name="pic" accept="image/*">
		    	<button type="button" class="upload-image">Upload Image</button>
	    	</form>
		</div>`);
	$('.close').click(function () {
		$(this).closest('.title_inside').remove();
	});
	addEventListenerForUploadButton();
});
function addEventListenerForUploadButton() {
	$('.upload-image').off();
	$('.upload-image').click(function () {
		console.log('text');
		const files = $(this).siblings('[name=pic]')[0].files;
		const data = new FormData();
		$.each(files, (key, value) => {
			data.append('files', value);
		});
		$.ajax({
			type: "POST",
			headers: {
				"x-access-token": TOKEN
			},
			url: `${HOST_URL}/api/v1/media`,
			contentType: 'application/x-www-form-urlencoded',
			data,
			dataType: 'json',
			processData: false,
			contentType: false,
			success: (data) => {
				$(this).closest('.section').attr('data-photo', data.urls);
				$(this).closest('#add_picture').attr('data-photo', data.urls);
			}
		});
	});
}

addEventListenerForUploadButton();