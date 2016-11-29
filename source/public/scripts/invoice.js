/* globals $ */
"use strict";

$(function() {
    let $productsTable = $("#products"),
        $invoiceValue = $("#inv-value"),
        $ddsValue = $("#dds-value"),
        $ddsRate = $("#dds-rate"),
        $dds = $("#dds"),
        $total = $("#value-end"),
        $eik = $("#eik"),
        $zdds = $("#zdds");

    let productField = $productsTable.find("tbody tr:first-child");

    $productsTable.on("input", "tr", function() {
        let $this = $(this);

        let quantity = $this.find(".productQuantity").val(),
            price = $this.find(".productPrice").val(),
            value = (+quantity * price) + " лв.";

        $this.find(".productValue").val(value);


        let $products = $productsTable.find("tbody tr"),
            ddsRate = +$ddsRate.val(),
            sum = 0,
            dds,
            total;

        $.each($products, function(_, product) {
            let productValue = $(product).find(".productValue").val();
            if (productValue) {
                productValue = +productValue.split(" ")[0];
                sum += productValue;
            }
        });

        dds = sum * ddsRate / 100;
        total = sum + dds;

        $invoiceValue.val(sum + " лв.");
        $ddsValue.val(sum + " лв.");
        $dds.val(dds + " лв.");
        $total.val(total + " лв.")
    });

    $ddsRate.on("change", function() {
        let sum = +$invoiceValue.val().split(' ')[0],
            ddsRate = $ddsRate.val(),
            dds = sum * ddsRate / 100,
            total = sum + dds;

        $dds.val(dds + " лв.");
        $total.val(total + " лв.");
    });

    $eik.on("change", function(){
        let eik = $eik.val();
        $zdds.val("BG"+eik);
    })

    $("#add-more-products").on("click", function() {
        $productsTable.find("tbody").append(productField.clone());
    });
});