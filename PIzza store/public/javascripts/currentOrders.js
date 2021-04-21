$(function ready() {
    $.getJSON("/api/orders/current", function (data) {
        let orders = data.orders;
        orders.forEach(function (item) {
            $('#orders').append('<tr><td>' + item.firstName + '</td><td>' + item.lastName + '</td><td>' + item.phoneNumber + '</td><td>' + item.orderId + '</td><td>' + item.total + '</td><td>' + item.createdOn + '</td><td>' + item.status + '</td></tr>');
        });
    });
});