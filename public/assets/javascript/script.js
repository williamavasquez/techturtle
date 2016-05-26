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
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	var d = new Date();
	document.getElementById("date").innerHTML = (monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear());
	
  $("#scan").click(function(){
    $("#barcodeScannerWindow").show()
    $.getScript("/assets/javascript/barcodescan.js",function(){
        quagga()
      }); //$.getScript
  });
}); //$(document).ready(function()
