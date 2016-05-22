$(document).ready(function() {
    $('#inventory').DataTable();
    $('#shop').DataTable();
	$("#register").hide();

	$("#register_btn").click(function(){
	    $("#sign_in").hide();
	    $("#register").show();
	});

	$("#signIn_btn").click(function(){
	    $("#sign_in").show();
	    $("#register").hide();
	});

  $("#scan").click(function(){
    $("#barcodeScannerWindow").show()
    $.getScript("/assets/javascript/barcodescan.js",function(){
        quagga()
      }); //$.getScript
  });
}); //$(document).ready(function()
