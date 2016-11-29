/* globals $ */
"use strict";

$(function() {
    let $productsTable = $("#products"),
        $invoiceValue = $("#inv-value"),
        $ddsValue = $("#dds-value"),
        $ddsRate = $("#dds-rate"),
        $dds = $("#dds"),
        $total = $("#value-end");

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

    $("#add-more-products").on("click", function() {
        let $productForm = $productsTable.find("tbody tr:first-child").clone(),
            $productFields = $productForm.children();

        $.each($productFields, function(_, field) {
            $(field).children().val("");
        });

        $productsTable.find("tbody").append($productForm);
    });

    $("#submit-invoice").on("click", function() {
        let invoice = {
            number: $("invoiceNumber").val(),
            date: $("date").val(),
            company: {
                name: $("#companyName").val(),
                identity: $("#companyIdentity").val(),
                address: $("#companyAddress").val(),
                accountablePerson: $("#companyMOL").val()
            },
            client: {
                name: $("#clientName").val(),
                identity: $("#clientIdentity").val(),
                address: $("#clientAddress").val(),
                accountablePerson: $("#clientMOL").val()
            },
            sum: $("sum").val(),
            vat: $("vat").val()
        };
    });
});