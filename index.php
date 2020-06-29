<!DOCTYPE html>
<html lang="en">
<head>
	<title>JS SDK Multiple Buttons Implementation</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/custom.css">
</head>
<body>
	
	<div class="jumbotron2 text-center">
	  <!-- PayPal Logo --><table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/uk/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"> <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" border="0" alt="PayPal Logo"></a></td><td><div class="title"> SPB Button Generator / Link Generator (JS SDK)</div></td></tr></table><!-- PayPal Logo -->
	</div>
	
	<div class="container-fluid">
		<div class="row jumbotron">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<form method="get" action="generator.php" id="homeForm">
					<div class="form-group">
						<span for="clientId"><b>Client Id : </b></span>
						<a onclick="window.open('https://developer.paypal.com/docs/integration/admin/manage-apps/#create-an-app-for-testing','popup','width=600,height=600'); return false;" target="popup"><span class="glyphicon glyphicon-exclamation-sign"></span> <br/> <br/> 
</a>
						<input type="text" name="clientId" id="clientId" value="ASEKfbq-jIK2HwOMMSScocc4AQfgyWosw8U8uyFxE1ZRU_inaXww22se-ot1ScQkD0dexF2Qi8lxvSnU" class="form-control formElemCommReload"> 
					</div>
					<div class="form-group">
						<span for="currency"><b>Currency :</b></span><br/><br/> 
						<select name="currency" id="currency" class="form-control formElemCommReload"><option value="AUD">AUD</option><option value="BRL">BRL</option><option value="CAD">CAD</option><option value="CHF">CHF</option><option value="CZK">CZK</option><option value="DKK">DKK</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="HKD">HKD</option><option value="HUF">HUF</option><option value="ILS">ILS</option><option value="INR">INR</option><option value="JPY">JPY</option><option value="MXN">MXN</option><option value="MYR">MYR</option><option value="NOK">NOK</option><option value="NZD">NZD</option><option value="PHP">PHP</option><option value="PLN">PLN</option><option value="RUB">RUB</option><option value="SEK">SEK</option><option value="SGD">SGD</option><option value="THB">THB</option><option value="TWD">TWD</option><option value="USD">USD</option></select>
					</div>
					<div class="form-group">
						<span for="currency"><b>Integration Type :</b></span><br/><br/>

							<div class="switch-field">
								<input type="radio" id="intType1" class="intType" name="intType" value="fixed" checked onchange="formActionChange('fixed');"/>
								<label for="intType1">Fixed</label>
								<input type="radio" id="intType2" class="intType" name="intType" value="Variable" onchange="formActionChange('variable');"/>
								<label for="intType2">Variable</label>
								<input type="radio" id="intType3" class="intType" name="intType" value="link" onchange="formActionChange('link');"/>
								<label for="intType3">Link</label>
							</div>

					</div>

					<div class="form-group">
						<input type="submit" name="submit" class="btn btn-primary">
					</div>
			</div>
			<div class="col-md-3"></div>
		</div><br/>
	</div>

<script type="text/javascript">
function formActionChange(val) {
	if(val=="variable") {
		var action = "variable.php";
	} else if(val=="fixed") {
		var action = "generator.php";
	} else {
		var action = "link.php"
	}
    document.getElementById("homeForm").action = action;
}
</script>
</body>
</html>