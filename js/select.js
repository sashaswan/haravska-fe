function addEventListenersForSelect() {
	$('.select .selected_value').click(function() {
		$('.select .options').toggle();
	});
	$('.select .option').click(function() {
		$('.select .selected_value').text($(this).text());
		$('.select .options').hide();
		$(this).closest('.select').siblings('select').val($(this).attr('value'))
	});
}
const optionForDisplay = '<div class="option" value="{{id}}">{{title}}</div>';
const option = '<option value="{{id}}">{{title}}</option>';
$.ajax({
    type: "GET",
    headers: {
	    "x-access-token": TOKEN
    },
    url: `${HOST_URL}/api/v1/categories`,
    success: function(data) {
	    $('select#category').append(option.replace('{{id}}', '').replace('{{title}}', ''));
        data.forEach((category) => {
	        const optionForDisplayHtml = optionForDisplay
	        	.replace('{{id}}', category._id)
	        	.replace('{{title}}', category.title);
	        const optionHtml = option
	        	.replace('{{id}}', category._id)
	        	.replace('{{title}}', category.title);
	        $('.select .options').append(optionForDisplayHtml);
	        $('select#category').append(optionHtml);
        });
        addEventListenersForSelect();
    }
}); 