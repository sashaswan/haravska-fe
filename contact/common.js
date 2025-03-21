$(document).ready(function() {

	$("#main_form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$("#main_form").trigger("reset");
		});
		return false;
	});
});