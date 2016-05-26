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

	var d = new Date();
	document.getElementById("date").innerHTML = d.toDateString();
	
  $("#scan").click(function(){
    $("#barcodeScannerWindow").show()
    $.getScript("/assets/javascript/barcodescan.js",function(){
        quagga()
      }); //$.getScript
  });
}); //$(document).ready(function()
