$(function ready() {
    $("#orderSubmit").submit(function(event) {
        event.preventDefault();
        var status = 'submitted'
        var toppings = [];
        $.each($('input[name="toppingName"]:checked'), function() {
            toppings.push($(this).val());
        });

        console.log(toppings);

        var address = $('#street').val() + ' ' + $('#postalCode').val() + ' ' + $('#province').val() + ' ' + $('#country').val()

        console.log(address);
        var orderInfo = JSON.stringify({
            size: $('input[name="sizeName"]:checked').val(),
            sizeCost: '',
            crust: $('input[name="crustName"]:checked').val(),
            crustCost: '',
            toppings: toppings,
            toppingsCost: '',
            quantity: $("#quantity").val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            phoneNumber: $('#phoneNumber').val(),
            address: address,
            status: status,
            orderId: ''
        });

        $.ajax({
            url: '/api/orders',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: orderInfo,
            success: function (json, status, request) {
                window.location="/confirm.html"
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order');
                console.log('Request failed : ', status);
            }
        });

    });
});