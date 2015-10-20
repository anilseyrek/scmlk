<?php
	//Create connection
	$connection = mysqli_connect("localhost","username","password","db_name");

	// Check connection
	if (mysqli_connect_errno()){
		echo "Failed to connect to database: " . mysqli_connect_error();
	}
	
	mysqli_set_charset($connection,"utf8");
	
	//Take values urlencode($_POST['link'])
	$posttxt = mysqli_real_escape_string($connection, $_GET['posttxt']);
	$fb_id = mysqli_real_escape_string($connection, $_GET['fb_id']);
	$fb_name = mysqli_real_escape_string($connection, $_GET['fb_name']);
	
	$sql = "INSERT INTO scmlk_dev (fb_id, fb_name, date, time, text) VALUES ('".$fb_id."', '".$fb_name."', CURDATE(), CURTIME(), '".$posttxt."')";
	$sql_2 = "INSERT INTO scmlk_2 (fb_id, fb_name, date, time, text) VALUES ('".$fb_id."', '".$fb_name."', CURDATE(), CURTIME(), '".$posttxt."')";

	if (!mysqli_query($connection,$sql)) {
		die('Error: ' . mysqli_error($connection));
	}
	if (!mysqli_query($connection,$sql_2)) {
		die('Error: ' . mysqli_error($connection));
	}

	mysqli_close($connection);
	
?>