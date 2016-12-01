/* globals $ converter */
"use strict";

$(function() {
    let $productsTable = $("#products"),
        $invoiceValue = $("#inv-value"),
        $ddsValue = $("#dds-value"),
        $ddsRate = $("#dds-rate"),
        $dds = $("#dds"),
        $total = $("#value-end"),
        $eik = $("#eik"),
        $zdds = $("#zdds"),
        $clientIdentity = $("#clientIdentity"),
        $clientZdds = $("#clientZDDS"),
        $inWords = $("#inwords");

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
            total,
            slovom;

        $.each($products, function(_, product) {
            let productValue = $(product).find(".productValue").val();
            if (productValue) {
                productValue = +productValue.split(" ")[0];
                sum += productValue;
            }
        });

        dds = sum * ddsRate / 100;
        total = sum + dds;
        slovom = converter.number2lv(total);

        $invoiceValue.val(sum + " лв.");
        $ddsValue.val(sum + " лв.");
        $dds.val(dds + " лв.");
        $total.val(total + " лв.")
        $inWords.val(slovom);
    });

    $ddsRate.on("change", function() {
        let sum = +$invoiceValue.val().split(' ')[0],
            ddsRate = $ddsRate.val(),
            dds = sum * ddsRate / 100,
            total = sum + dds,
            slovom = converter.number2lv(total);

        $dds.val(dds + " лв.");
        $total.val(total + " лв.");
        $inWords.val(slovom);
    });

    $eik.on("change", function() {
        let eik = $eik.val();
        $zdds.val("BG" + eik);
    });

    $clientIdentity.on("change", function() {
        let eik = $clientIdentity.val();
        $clientZdds.val("BG" + eik);
    });

    $("#add-more-products").on("click", function() {
        let $productForm = $productsTable.find("tbody tr:first-child").clone(),
            $productFields = $productForm.children();

        $.each($productFields, function(_, field) {
            $(field).children().val("");
        });

        $productsTable.find("tbody").append($productForm);
    });

    $("#save-invoice").on("click", function() {
        const url = "/invoice",
            invoice = getInvoce();

        $.ajax({
            url: url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(invoice)
        });
    });

    $("#update-invoice").on("click", function() {
        const url = "/invoice",
            invoice = getInvoce();

        $.ajax({
            url: url,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(invoice)
        })
    });

    function getInvoce() {
        let products = [],
            $productForms = $productsTable.find("tbody tr");

        $.each($productForms, function(_, product) {
            let $product = $(product);
            products.push({
                name: $product.find(".productName").val(),
                price: +$product.find(".productPrice").val(),
                quantity: +$product.find(".productQuantity").val(),
                unit: $product.find(".productUnit").val()
            });
        });


        let invoice = {
            number: +$("#invoiceNumber").val(),
            date: new Date($("#date-input").val()),
            place: $("#place-input").val(),
            company: {
                name: $("#companyName").val(),
                identity: $("#companyIdentity").val(),
                address: $("#companyAddress").val(),
                city: $("#companyCity").val(),
                accountablePerson: $("#companyMOL").val()
            },
            client: {
                name: $("#clientName").val(),
                identity: $("#clientIdentity").val(),
                address: $("#clientAddress").val(),
                city: $("#clientCity").val(),
                accountablePerson: $("#clientMOL").val()
            },
            products: products,
            sum: +($("#inv-value").val().split(" ")[0]),
            vat: +($("#dds-value").val().split(" ")[0])
        };

        return invoice;
    }
});