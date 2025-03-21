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

// Get the session ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('id');

// If no ID is provided, redirect back to the edit page
if (!sessionId) {
    window.location.replace('https://sashaswan.github.io/haravska-fe/edit');
}

// Load the existing session data
function loadSessionData() {
    $.ajax({
        type: "GET",
        headers: {
            "x-access-token": TOKEN
        },
        url: `${HOST_URL}/api/v1/photo-sessions/${sessionId}`,
        success: function (data) {
            // Fill in form fields
            ids.forEach(id => {
                if (data[id]) {
                    $(`#${id}`).val(data[id]);
                }
            });

            // Set category dropdown
            if (data.category) {
                $('select#category').val(data.category);
                $('.select .selected_value').text($('#category option:selected').text() || 'Select Category');
            }

            // Set slider images
            if (data.slider && data.slider.length) {
                $('#add_picture').attr('data-photo', data.slider.join(','));
                // You could add code here to display the existing slider images
            }

            // Create sections based on existing data
            if (data.sections && data.sections.length) {
                data.sections.forEach(section => {
                    if (section.type === 'section') {
                        $("#add_section").click();
                        const $lastSection = $('.holder.section').last();
                        $lastSection.attr('data-photo', section.photos.join(','));
                        // Potentially add code to display existing photos
                    } else if (section.type === 'title') {
                        $("#add_title").click();
                        const $lastTitle = $('.title_inside.section').last();
                        $lastTitle.find('[name=photo_sesion]').val(section.title);
                        $lastTitle.attr('data-photo', section.photos.join(','));
                        // Potentially add code to display existing photos
                    }
                });
            }
        },
        error: function (err) {
            console.error("Error loading session data:", err);
            alert("Failed to load the photo session. Redirecting to edit page.");
            window.location.replace('https://sashaswan.github.io/haravska-fe/edit');
        }
    });
}

// Load data when page loads
$(document).ready(function () {
    loadSessionData();
});

// Handle form submission with PUT request
$('#save').click(function () {
    const sectionsDom = $('.section').toArray();
    const sections = sectionsDom.map((dom) => {
        const section = {
            type: $(dom).hasClass('holder') ? 'section' : 'title'
        };
        if (section.type === 'title') {
            section.title = $(dom).find('[name=photo_sesion]')[0].value;
        }
        section.photos = ($(dom).attr('data-photo') || '').split(',').filter(url => url);
        return section;
    });

    let data = {
        sections: sections,
        slider: ($('#add_picture').attr('data-photo') || '').split(',').filter(url => url)
    };

    ids.filter(id => $(`#${id}`).val()).forEach(id => {
        data[id] = $(`#${id}`).val();
    });

    console.log(data);

    $.ajax({
        type: "PUT",
        headers: {
            "x-access-token": TOKEN,
        },
        url: `${HOST_URL}/api/v1/photo-sessions/${sessionId}`,
        data: data,
        success: function (response) {
            console.log(response);
            alert("Photo session updated successfully!");
            window.location.replace('https://sashaswan.github.io/haravska-fe/edit');
        },
        error: function (err) {
            console.error("Error updating photoset:", err);
            alert("There was a problem updating your photoset. Please try again.");
        }
    });
});

$('#logout').click(function () {
    localStorage.clear();
    window.location.replace('https://sashaswan.github.io/haravska-fe/login');
});

function encodeImageFileAsurl('file, callback) {
    let reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataurl('file);
}