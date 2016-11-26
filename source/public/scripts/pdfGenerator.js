/* globals require module $*/
/* globals require module jsPDF*/
/* globals require module domtoimage*/
/*globals require module Image*/
"use strict";

var PDFGenerator = (function(){
    const invoiceClassName = '.big-invoice';
    const buttonGenerateClassName = 'a.btn.btn-primary.btn-lg.login-button'

    return {
        generatePdf : function(){
            var $button = $(buttonGenerateClassName);
            var $elementToBeConverted = $(invoiceClassName)[0];
            console.log($elementToBeConverted);
            $button.on("click", function(){
                var doc = new jsPDF('landscape');       
                domtoimage.toBlob($elementToBeConverted).then(function(blob) {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    var img = new Image();
                    img.src = imageUrl;
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


