<?php
	//Set default timezone for php
	date_default_timezone_set('Europe/Istanbul');

	//Create connection
	$connection = mysqli_connect("localhost","username","password","db_name");

	// Check connection
	if (mysqli_connect_errno()){
		echo "Failed to connect to database: " . mysqli_connect_error();
	}
	
	mysqli_set_charset($connection,"utf8");
	
	$sql = "SELECT * FROM scmlk_dev ORDER BY date, time";
	$curdate = date('Y:m:d');
	$curtime = date("H:i:s");
	$result = mysqli_query($connection,$sql);
	
	while($row = mysqli_fetch_assoc($result)) {
		
		$rowid = $row["id"];
		$combined_date_and_time = $row["date"] . ' ' . $row["time"];
		$diff = strtotime("now") - strtotime($combined_date_and_time);
		
		if($diff > 300){
			$sql2 = "DELETE FROM scmlk_dev WHERE id LIKE '$rowid'";
			if (!mysqli_query($connection,$sql2)) {
				die('Error: ' . mysqli_error($connection));
			}
		}
	}
	
?>