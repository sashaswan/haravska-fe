$.ajax({
	headers: {
	    "x-access-token": TOKEN
    },
    type: "POST",
    url: `${HOST_URL}/api/v1/login`,
    success: function(data) {
        window.location.replace('/edit');
    }
});
$(document).ready(function() {

    $('#loginForm').submit(function() {
        $.ajax({
            type: "POST",
            url: `${HOST_URL}/api/v1/login`,
            data: {
                email: $("#username").val(),
                password: $("#password").val()
            },
            success: function(data) {
                const { id, token } = data;
                localStorage.setItem('userId', id);
                localStorage.setItem('token', token);
                $('#error').text('');
                window.location.replace('/edit');
            },
            error: function(data) {
	            const response = JSON.parse(data.responseText)
	            $('#error').text(response.message);
            }
        });
        return false; 
    });

});