var payment = {};
$(document).ready(function(){
	// On first time load
	var i = 1 ;
	$("#segment").append(getHtmlContent(i));
	localStorage.setItem("buttons", i);
	new Clipboard('.copy-text');

	// Add new button
	$("#addMore").click(function(e){
		e.preventDefault();
		i++;
		localStorage.setItem("buttons", i);
		$("#segment").append(getHtmlContent(i));
		$('#prettyprint'+i).removeClass('prettyprinted');
		$('#prettyprintHead').removeClass('prettyprinted');
		generateCode(i);
		$('html, body').scrollTop( $(document).height() );
	});

	// Remove one button
	$(document).on('click','#removeOne', function(button){
		var i = $(this).closest("form").find("input[name='segment']").val();
		localStorage.setItem("buttons", i);
		$(".row"+i).remove();
		Object.keys(payment).forEach(function eachKey(key) {
			if(payment[key].btn == 'paypal-button-'+i) {
				delete payment[key];
			}
		});
		for(var j=1;j<=i;j++){
			$('#prettyprintHead').removeClass('prettyprinted');
			$('#prettyprint'+j).removeClass('prettyprinted');
			generateCode(j);
		}
		i--;
		return false;
	});

	// On changing name
	$(document).on('change','.formElemName', function(){
		var i = $(this).closest("form").find("input[name='segment']").val();
		$('#prettyprintHead').removeClass('prettyprinted');
		$('#prettyprint'+i).removeClass('prettyprinted');
	    generateCode(i);
	});

	// On changing Label & Name - For Variable
	$(document).on('change','.formElemNameLabel', function(){
		var i = 1;
		$('#prettyprintHead').removeClass('prettyprinted');
		$('#prettyprint'+i).removeClass('prettyprinted');
	    generateCode(i);
	});

	// On changing price
	$(document).on('keyup','.formElem', function(){
		$("#paypal-button-1 .paypal-button-logo").hide();
		var i = $(this).closest("form").find("input[name='segment']").val();
		$('#prettyprintHead').removeClass('prettyprinted');
		$('#prettyprint'+i).removeClass('prettyprinted');
	    generateCode(i);
	});

	// On changing Client Id and currency
	 $(document).on('keyup change','.formElemCommReload', function(){
		//var currentUrl = window.location.host + window.location.pathname;
		//currentUrl = "http://"+currentUrl + "?clientid="+$('#clientId').val()+"&currency="+$('#currency').val();
		//window.location = currentUrl;

			for(var j=1;j<=i;j++){
				$('#prettyprintHead').removeClass('prettyprinted');
				$('#prettyprint'+j).removeClass('prettyprinted');
				generateCode(j);
			}
		
	});

	 // On changing other than Client Id and currency
	 $(document).on('keyup change','.formElemComm', function(){
		for(var j=1;j<=i;j++){
			$('#prettyprintHead').removeClass('prettyprinted');
			$('#prettyprint'+j).removeClass('prettyprinted');
			generateCode(j);
		}
	});

	// Copy Code
	$(document).on('click','.copy-text', function(e){
		e.preventDefault();
		$('.msgAlert').html('Code Copied');
		$('.msgAlert').fadeOut(2000, function() {
			$('.msgAlert').html('').show();
		});
	});

	generateCode(i);
});
// Replace html chars
function htmlEscape(s) {
	return s
	  .replace(/&/g, '&amp;')
	  .replace(/</g, '&lt;')
	  .replace(/>/g, '&gt;');
}
// Generate body scipt fot button rendering
function generateCode(i) {
		$('.loader').show();
		var input = {
			//type : $('#type').val(),
			clientId : $('#clientId').val(),
			name : $('#name'+i).val(),
			price : $('#price'+i).val(),
			currency : $('#currency').val(),
			layout : $('#layout').val(),
			//label : $('#label').val(),
			size : $('#size').val(),
			shape : $('#shape').val(),
			color : $('#color').val(),
			//locale : $('#locale').val(),
			guest : $("#guest").is(":checked") ? 1 : 0
		};
		var pathArray = window.location.pathname.split('/');
		//alert(pathArray[pathArray.length-1]);
		if(pathArray[pathArray.length-1] == "variable.php") {
			var script = "<div style='text-align: center'> "+$('#nameLabel').val()+": <input type='text' id='description' placeholder='test' value=''></div><div style='text-align: center'> "+$('#priceLabel').val()+": <input type='text' id='amount' placeholder='amount' value=''> <input type='hidden' id='currency' value='"+$('#currency').val()+"'> "+$('#currency').val()+"</div><div id='paypal-button-"+i+"'></div>";
		} else {
			var script = "<div id='paypal-button-"+i+"'></div>";
		}
		
		script = htmlEscape(script);
		if(input.guest) {
			var guestScript = ",application_context : { 	landing_page : 'BILLING' }";
		} else {
			var guestScript = ",application_context : { 	landing_page : 'LOGIN' }";
		}
		var head = "<script src='https://www.paypal.com/sdk/js?client-id="+input.clientId+"&currency="+input.currency+"'></script>	\n<script>\n";


		if(pathArray[pathArray.length-1] == "variable.php") {

			head = head + " var payment = "+JSON.stringify(findAndUpdateJson(input,i))+"; \npayment.forEach(function(selector) {	\n	paypal.Buttons({\n 			style:{\n 			layout: '"+input.layout+"', \n 			size:  '"+input.size+"',   \n 			shape: '"+input.shape+"',   \n 			color: '"+input.color+"'   \n   		}, \n		createOrder: function(data, actions) { \n			return actions.order.create({ purchase_units: [{  amount: { value: document.getElementById('amount').value, currency_code: document.getElementById('currency').value,breakdown: { item_total: {currency_code: document.getElementById('currency').value,value: document.getElementById('amount').value } } } ,  items: [  { name: document.getElementById('description').value, quantity: '1', unit_amount: { currency_code: document.getElementById('currency').value, value: document.getElementById('amount').value} } ] } ] "+guestScript+" } )\n		},  \n		onApprove: function(data, actions) { \n				return actions.order.capture().then(function(details) { alert('Payment completed');  });  \n		} \n	}).render('#'+selector.btn); \n});\n</script>";
		} else if(pathArray[pathArray.length-1] == "generator.php") {

			 head = head + " var payment = "+JSON.stringify(findAndUpdateJson(input,i))+"; \npayment.forEach(function(selector) {	\n	 paypal.Buttons({\n 			style:{\n 			layout: '"+input.layout+"', \n 			size:  '"+input.size+"',   \n 			shape: '"+input.shape+"',   \n 			color: '"+input.color+"'   \n   		}, \n		createOrder: function(data, actions) { \n			return actions.order.create({ purchase_units: [{  amount: { value: selector.price, currency_code: selector.currency,breakdown: { item_total: {currency_code: selector.currency,value: selector.price } } } ,  items: [  { name: selector.name, quantity: '1', unit_amount: { currency_code: selector.currency, value: selector.price} } ] } ] "+guestScript+" } )\n		},  \n		onApprove: function(data, actions) { \n				return actions.order.capture().then(function(details) { alert('Payment completed');  });  \n		} \n	}).render('#'+selector.btn); \n});\n</script>";
		} else {
			head = head + "document.addEventListener('DOMContentLoaded', function() { var payEncodeData = getQuery('payData'); var decodeData = atob(payEncodeData); var payData = decodeData.split('&'); console.log(payData); " 
			head = head + "paypal.Buttons({\n 			style:{\n 			layout: '"+input.layout+"', \n 			size:  '"+input.size+"',   \n 			shape: '"+input.shape+"',   \n 			color: '"+input.color+"'   \n   		}, \n		createOrder: function(data, actions) { \n			return actions.order.create({ purchase_units: [{  invoice_id: payData[3], amount: { value: payData[1], currency_code: payData[2],breakdown: { item_total: {currency_code: payData[2],value: payData[1] } } } ,  items: [  { name: payData[0], quantity: '1', unit_amount: { currency_code: payData[2], value: payData[1]} } ] } ] "+guestScript+" } )\n		},  \n		onApprove: function(data, actions) { \n				return actions.order.capture().then(function(details) { alert('Payment completed');  });  \n		} \n	}).render('#paypal-button-1'); function getQuery(q) {return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1]; } document.getElementById('service').innerHTML = payData[0]; document.getElementById('amount').innerHTML = payData[1]; document.getElementById('invoice').innerHTML = payData[3]; }); </script><center>Amount to Pay for <b><span id='service'></span></b> is <b><span id='amount'></span></b> and the Reference Number is <b><span id='invoice'></span></b> <br/><br/> <div id='paypal-button-1'></div> </center>";

			var backendCode = "<div style='text-align: center'> Base URL: <input type='text' id='baseUrl' value='"+$('#baseUrl').val()+"' disabled></div><div style='text-align: center'> Enter description: <input type='text' id='description' placeholder='Description' value=''></div> <div style='text-align: center'> Enter Amount: <input type='text' id='amount' placeholder='Amount' value=''><select id='currency' name='currency'><option value='AUD'>AUD</option><option value='USD'>USD</option><option value='INR'>INR></option></select><div style='text-align: center'> Enter Invoice: <input type='text' id='invoice' placeholder='Invoice' value=''></div><div style='text-align: center'>  <input type='submit' id='submit' value='Generate Link' onClick='generateLink()'></div><div style='text-align: center' class='linkToSend' id='linkToSend'></div><script type='text/javascript'>function generateLink() { var string = document.getElementById('description').value+'&'+document.getElementById('amount').value+'&'+document.getElementById('currency').value+'&'+document.getElementById('invoice').value; var encodeString = btoa(string); var linkToSend = document.getElementById('baseUrl').value+'?payData='+encodeString; document.getElementById('linkToSend').innerHTML= linkToSend;  } </script>";
			backendCode = htmlEscape(backendCode);
			$('#prettyprintlink').html(backendCode);
		}


		head = htmlEscape(head);
		$('#prettyprintHead').html(head);
		$('#prettyprint'+i).html(script);
		$('#paypal-button-'+i).html("");
		prettyPrint();

		if(pathArray[pathArray.length-1] == "variable.php" || pathArray[pathArray.length-1] == "generator.php") {
			var exec = "$(document).ready(function() {	 paypal.Buttons({ style:{layout: '"+input.layout+"',size:  '"+input.size+"',shape: '"+input.shape+"', color: '"+input.color+"' },  commit: true, createOrder: function(data, actions) { return actions.order.create({ purchase_units: [{  amount: { value: '"+input.price+"', currency_code: '"+input.currency+"',breakdown: { item_total: {currency_code: '"+input.currency+"',value: '"+input.price+"' } } } ,  items: [  { name: '"+input.name+"', quantity: '1', unit_amount: { currency_code: '"+input.currency+"', value: '"+input.price+"'} } ] } ] "+guestScript+" } )}, onApprove: function(data, actions) { return actions.order.capture().then(function(details) { alert('Payment completed'); console.log(details); $('.respBlock').show(); document.getElementById('prettyprintResult').innerHTML = JSON.stringify(details, undefined, 2); });   } }).render('#paypal-button-"+i+"'); });";
			eval(exec); 
		}
		$('.loader').hide();
}
// Form block for input
function getHtmlContent(i) {
	var remove = i>1 ? '<a class="btn btn-danger pull-right" id="removeOne" >X</a>' : '';
	var copy = '<a class="col-sm-3 copy-text btn btn-warning pull-right" data-clipboard-target="#prettyprint'+i+'">Copy</a>';
	var dispBtn = '<div class="pull-left" id="dispBtn'+i+'"><div id="paypal-button-'+i+'"></div></div>';
	var htmlContent = '<div class="container-fluid"><form method="post" action=""><div class="row row'+i+' jumbotron"><div class="col-sm-12"><input type="hidden" name="segment" value="'+i+'"><div class="form-group"><span for="name">Enter Item Name :</span><input type="text" name="name'+i+'" id="name'+i+'" class="form-control formElemName" autocomplete="off" required="required" value="Sample product"></div></div><div class="col-sm-6"><div class="form-group"><span for="price">Enter Price :</span><input type="number" step="0.01" name="price'+i+'" id="price'+i+'" value="2.00" class="form-control formElemName"></div></div><div class="col-sm-12"><pre id="prettyprint'+i+'" class="col-sm-8 prettyprint" style="width:250px"></pre>'+copy+'</div><div class="col-sm-12" style="float:right; margin-top:10px;">'+dispBtn+''+remove+'</div></div></form></div>';
	return htmlContent;
}

function findAndUpdateJson(input,i) {
	if(payment.length && input.price && input.currency) {
		Object.keys(payment).forEach(function eachKey(key) {
			if(payment[key].btn == 'paypal-button-'+i) {
				delete payment[key];
			}
		});
		payment.push({i:i,btn : 'paypal-button-'+i,name: input.name,price : input.price,currency : input.currency}); 
	} else if(input.price && input.currency) {
		payment = [{i:i,btn : 'paypal-button-'+i,name: input.name,price : input.price,currency : input.currency}];
	}
	payment = payment.filter(function(x) { return x !== null }); 
	payment = sortJSON(payment,'btn', 'ASC');
	return payment;
}

function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === 'ASC' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === 'DES') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function getQuery(q) {
   return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}
