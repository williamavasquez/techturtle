function quagga(){

  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      constraints: {
          width: 400,
          height: 320},
      target: document.querySelector('#barcodeScannerWindow')
    },
    decoder : {
      readers : ["upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      $(".drawingBuffer").hide();
      console.log("Initialization finished. Ready to Scan");
      Quagga.start();
      Quagga.onDetected(function(data){
        $("#barcodeScannerWindow").hide();
        data =  data.codeResult.code;
        var queryURL = 'https://api.outpan.com/v2/products/'+data+'?apikey=8167c01974ff51124b37a55674d6bdb1'
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
          barcodeInfo = response;
          barcode = barcodeInfo.gtin;
          productName = barcodeInfo.name;
          manufacturer = barcodeInfo.attributes.Manufacturer;
          });
        Quagga.stop();
        return data
    });
  });
}
