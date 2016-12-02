/* globals require module $ jsPDF domtoimage Image window*/

"use strict";
console.log('i was here');
var PDFGenerator = (function(){
    //<button class="btn btn-primary btn-lg login-button" id="save-invoice" type="button">Запис</button>
    const invoiceClassName = '.big-invoice';
    const buttonGenerateClassName = '#save-invoice'
    console.log("I'm in")
    return {
        generatePdf : function(){
            var $button = $(buttonGenerateClassName);
            var $elementToBeConverted = $(invoiceClassName)[0];
            //console.log($button.html);
            $button.on("click", function(){
                var doc = new jsPDF('landscape');
                console.log('I clicked');
                domtoimage.toBlob($elementToBeConverted).then(function(blob) {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    var img = new Image();
                    img.src = imageUrl;
                    console.log('i here in blob');
                    img.onload = function() {
                        doc.addImage(img, 'PNG', 0 , 0 , 300, 200);
                        doc.save("invoice.pdf");
                    };
                });
            });
        }
    };
})();

PDFGenerator.generatePdf();


