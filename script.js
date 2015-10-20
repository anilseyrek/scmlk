	var username;
	document.onkeydown = checkKeyDown;
	document.onkeyup = checkKeyUp;
	window.onload = checkItems;
	
	
	////FACEBOOK API CODES
	  // This is called with the results from from FB.getLoginStatus().
	  
	  function statusChangeCallback(response) {
		console.log('statusChangeCallback');
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
		  // Logged into your app and Facebook.
		  testAPI();
		  removeLoginButton(response);
		} else if (response.status === 'not_authorized') {
		  // The person is logged into Facebook, but not your app.
		  document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
		} else {
		  // The person is not logged into Facebook, so we're not sure if
		  // they are logged into this app or not.
		  document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
		}
	  }

	  // This function is called when someone finishes with the Login
	  // Button.  See the onlogin handler attached to it in the sample
	  // code below.
	  function checkLoginState() {
		FB.getLoginStatus(function(response) {
		  statusChangeCallback(response);
		});
	  }

	  window.fbAsyncInit = function() {
	  FB.init({
		appId      : '1531187337094368',
		cookie     : true,  // enable cookies to allow the server to access 
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.1' // use version 2.1
	  });

	  // Now that we've initialized the JavaScript SDK, we call 
	  // FB.getLoginStatus().  This function gets the state of the
	  // person visiting this page and can return one of three states to
	  // the callback you provide.  They can be:
	  //
	  // 1. Logged into your app ('connected')
	  // 2. Logged into Facebook, but not your app ('not_authorized')
	  // 3. Not logged into Facebook and can't tell if they are logged into
	  //    your app or not.
	  //
	  // These three cases are handled in the callback function.

	  FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
		removeLoginButton(response);
	  });

	  };

	  // Load the SDK asynchronously
	  (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));

	  // Here we run a very simple test of the Graph API after login is
	  // successful.  See statusChangeCallback() for when this call is made.
	  function testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
		  console.log('Successful login for: ' + response.name);
		  document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';
		  username = response.name;
		});
	  }
	
	////FACEBOOK API CODES END
	  
	//If status is connected, remove login area
	function removeLoginButton (response){
		if(response.status === 'connected'){
			document.getElementById('fb-login').style.display = "none";
		}
		/*FB.api('/me?fields=name,picture,email,birthday,gender,link', function(response) {
			document.getElementById('trial').innerHTML += ('<img src="' + response.picture.data.url + '"> ' + response.name +" " + response.gender + " " + response.link);
		});*/
	};
	
	//Take the entry, login status, user id and share post
	function sharePost(){
		var loginStatus;
		var fb_id;
		var post;
		post = encodeURIComponent(document.getElementById('posttxt').value);
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
			loginStatus = response.status;
			fb_id = response.authResponse.userID;
		});
		if(loginStatus === "connected" && post !== "" && post !== " "){
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				//document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
				}
			  }
			xmlhttp.open("GET","share.php?posttxt=" + post + "&fb_id=" + fb_id + "&fb_name=" + username,true);
			xmlhttp.send();
			refreshTextArea();
			loadConversation();
		}
		else if (loginStatus === 'unknown'){
			document.getElementById('fb-login').style.display = "inline";
		}
	}
	
	//Refresh text area for new entry
	function refreshTextArea(){
		document.getElementById("posttxt").value = encodeURIComponent("");
		document.getElementById("posttxt").focus();
	}
	
	//Load conversation from database
	function loadConversation() {
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("conversation").innerHTML = xmlhttp.responseText;
			}
		  }
		xmlhttp.open("GET","load.php",true);
		xmlhttp.send();
		
	}
	
	//Keep the conversation updated
	function checkItems(){
		setInterval(function(){
			loadConversation();
		}, 3000);
	}
	
	function getAbout() {
		var post;
		post = "Yazılan gönderiler beş dakika içinde otomatik olarak silinir. Gönderi paylaşabilmek için giriş yapmış olmanız zorunludur.<br><br>Made with love by </a id=\"profile-link\" href=\"http://facebook.com/seyrekanil\" target=\"_blank\"><i>Anıl Seyrek</i></a> ~ 2014<br><br>";
		var fb_id = "10201695401781546";
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			//document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("GET","share.php?posttxt=" + post + "&fb_id=" + fb_id + "&fb_name=" + "scmlk",true);
		xmlhttp.send();
		loadConversation();
	}

	function checkKeyDown(e) {

		e = e || window.event;

		if (e.keyCode == '13') {
			document.getElementById('post-button').click();
			refreshTextArea();
		}
	}
	
	function checkKeyUp(e) {

		e = e || window.event;

		if (e.keyCode == '13') {
			refreshTextArea();
		}
	}