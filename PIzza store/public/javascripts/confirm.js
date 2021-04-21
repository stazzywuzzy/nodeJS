$(function ready() {

    $.getJSON("/api/orders", function (data) {
        data.forEach(function (item) {
            $('#size').html(item.size + ' ($' + item.sizeCost + ')');
            $('#crust').html(item.crust + ' ($' + item.crustCost + ')');
            $('#toppings').html(item.toppings.join(', ') + ' ($' + item.toppingsCost + ')');
            $('#quantity').html(item.quantity);
            $('#subTotal').html(item.subTotal);
            $('#total').html(item.total);
            $('#firstName').html(item.firstName);
            $('#lastName').html(item.lastName);
            $('#phoneNumber').html(item.phoneNumber);
            $('#address').html(item.address);
            $('#phoneNumber').html(item.phoneNumber);
            $('#uuid').html(item.orderId);
            $('#uuidv4').val(item.orderId);
        });
    });

    $("#createOrder").submit(function (event) {
        var orderUUID = JSON.stringify({
            uuid: $('#uuidv4').val()
        });
        $.ajax({
            url: '/api/orders',
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: orderUUID,
            success: function (json, status, request) {
                console.log('success');
                $('#to-ordered-page').click();
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error submitting the order');
                console.log('Request failed : ', status);
            }
        });
    });

});