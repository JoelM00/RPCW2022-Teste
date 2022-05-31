$(document).ready(function() {


    $("body").on('click', '#token', function () {
        event.preventDefault()


        $.ajax({
            url: 'http://localhost:4000/token/',
            type: 'get',
            success: function(response) {
                console.log(response)
                location.replace('/');
            }
        });
    })


    $("body").on('click', '.row', function () {
        event.preventDefault()

        id = this.id
        location.replace('/classes/'+id);
    })
})