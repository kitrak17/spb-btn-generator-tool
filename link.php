<!DOCTYPE html>
<html lang="en">
<head>
	<title>SPB Button Generator - Variable Amount</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/custom.css">
</head>
<body>
	
	<div class="loader" style="display: none"></div>
	  

	<span class="msgAlert"></span>
	
	<div class="jumbotron2 text-center">
	  <!-- PayPal Logo --><table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/uk/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"> <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" border="0" alt="PayPal Logo"></a></td><td><div class="title">SPB Link Generator - Invoice</div></td><td><a href="index.php" style="color:#FFF;">Go to Home</a></td></tr></table><!-- PayPal Logo -->
	</div>
	
	<div class="container-fluid">
		<div class="row jumbotron">
			<div class="col-md-3">
				<form method="post" action="">
					<div class="form-group">
						<span for="clientId">Client Id : </span> 
						<a onclick="window.open('https://developer.paypal.com/docs/integration/admin/manage-apps/#create-an-app-for-testing','popup','width=600,height=600'); return false;" target="popup"><span class="glyphicon glyphicon-exclamation-sign"></span>
</a>
						<input type="text" name="clientId" id="clientId" value="<?php echo $_GET['clientId']; ?>" class="form-control formElemCommReload" disabled=""> 
					</div>
					<div class="form-group">
						<span for="currency">Currency :</span>
						<select name="currency" id="currency" class="form-control formElemCommReload" disabled="">
							<option value="AUD" <?php if($_GET['currency']=='AUD') echo "selected"; ?> >AUD</option>
							<option value="BRL" <?php if($_GET['currency']=='BRL') echo "selected"; ?> >BRL</option>
							<option value="CAD" <?php if($_GET['currency']=='CAD') echo "selected"; ?> >CAD</option>
							<option value="CHF" <?php if($_GET['currency']=='CHF') echo "selected"; ?> >CHF</option>
							<option value="CZK" <?php if($_GET['currency']=='CZK') echo "selected"; ?> >CZK</option>
							<option value="DKK" <?php if($_GET['currency']=='DKK') echo "selected"; ?> >DKK</option>
							<option value="EUR" <?php if($_GET['currency']=='EUR') echo "selected"; ?> >EUR</option>
							<option value="GBP" <?php if($_GET['currency']=='GBP') echo "selected"; ?> >GBP</option>
							<option value="HKD" <?php if($_GET['currency']=='HKD') echo "selected"; ?> >HKD</option>
							<option value="HUF" <?php if($_GET['currency']=='HUF') echo "selected"; ?> >HUF</option>
							<option value="ILS" <?php if($_GET['currency']=='ILS') echo "selected"; ?> >ILS</option>
							<option value="INR" <?php if($_GET['currency']=='INR') echo "selected"; ?> >INR</option>
							<option value="JPY" <?php if($_GET['currency']=='JPY') echo "selected"; ?> >JPY</option>
							<option value="MXN" <?php if($_GET['currency']=='MXN') echo "selected"; ?> >MXN</option>
							<option value="MYR" <?php if($_GET['currency']=='MYR') echo "selected"; ?> >MYR</option>
							<option value="NOK" <?php if($_GET['currency']=='NOK') echo "selected"; ?> >NOK</option>
							<option value="NZD" <?php if($_GET['currency']=='NZD') echo "selected"; ?> >NZD</option>
							<option value="PHP" <?php if($_GET['currency']=='PHP') echo "selected"; ?> >PHP</option>
							<option value="PLN" <?php if($_GET['currency']=='PLN') echo "selected"; ?> >PLN</option>
							<option value="RUB" <?php if($_GET['currency']=='RUB') echo "selected"; ?> >RUB</option>
							<option value="SEK" <?php if($_GET['currency']=='SEK') echo "selected"; ?> >SEK</option>
							<option value="SGD" <?php if($_GET['currency']=='SGD') echo "selected"; ?> >SGD</option>
							<option value="THB" <?php if($_GET['currency']=='THB') echo "selected"; ?> >THB</option>
							<option value="TWD" <?php if($_GET['currency']=='TWD') echo "selected"; ?> >TWD</option>
							<option value="USD" <?php if($_GET['currency']=='USD') echo "selected"; ?> >USD</option>
						</select>
					</div>
					<div class="form-group">
						<span for="layout">Layout :</span>
						<select name="layout" id="layout" class="form-control formElemComm">
							<option value="horizontal">Horizontal</option>
							<option value="vertical" selected>Vertical</option>
						</select>
					</div>
					<div class="form-group">
						<span for="size">Size :</span>
						<select name="size" id="size" class="form-control formElemComm">
							<option value="small">Small</option>
							<option value="medium" selected>Medium</option>
							<option value="large">Large</option>
							<option value="responsive">Responsive</option>
						</select>
					</div>
					<div class="form-group">
						<span for="shape">Shape :</span>
						<select name="shape" id="shape" class="form-control formElemComm">
							<option value="pill">Pill</option>
							<option value="rect" selected>Rect</option>
						</select>
					</div>
					<div class="form-group">
						<span for="color">Color :</span>
						<select name="color" id="color" class="form-control formElemComm">
							<option value="gold">Gold</option>
							<option value="blue">Blue</option>
							<option value="silver">Silver</option>
							<option value="black">Black</option>
						</select>
					</div>
					<!-- <div class="form-group">
						<span for="guest">Landing Page - Billing (Enable/Disable) :</span>
						<input type="checkbox" name="guest" id="guest" class="formElemComm" value="1">
					</div> -->
			</div>
			<div class="col-md-5">
				<h4>Add to Customer End : </h4>
				<pre id="prettyprintHead" class="prettyprint mainCode"></pre>
				<a class="copy-text btn btn-warning" data-clipboard-target="#prettyprintHead">Copy</a>
				<div class="respBlock" style="display: none">
					<h4>Response : </h4>
					<pre id="prettyprintResult" ></pre>
				</div>
			</div>
			<div class="col-md-4">
				<div id="segment2">
					<div id="segment2">
						<div class="container-fluid">
							<div class="row row1 jumbotron">
								<h4>Add to Merchant End : </h4>
								<div class="col-sm-12">
									<div class="form-group">
										<span for="baseUrl"> Enter Base URL  </span>
											<input type="text" name="baseUrl" id="baseUrl" class="form-control formElemNameLabel" autocomplete="off" required="required" value=""></div>
									<div class="form-group">
										<pre id="prettyprintlink" class="col-sm-8 prettyprint" style="width:100%"></pre>
										<a class="col-sm-3 copy-text btn btn-warning pull-right" data-clipboard-target="#prettyprintlink">Copy</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div><br/>
	</div>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"  integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="  crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/clipboard.js/1.5.12/clipboard.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js"></script>
	<script type="text/javascript" src="js/custom.js"></script>
	<script src="https://www.paypal.com/sdk/js?client-id=<?php echo $_GET['clientId']; ?>&currency=<?php echo $_GET['currency']; ?>"></script>
<div id="paypal-button-container-js"></div>
</body>
</html>