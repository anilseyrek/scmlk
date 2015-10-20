<?php
	require 'check.php';

	//Create connection
	$connection = mysqli_connect("localhost","username","password","db_name");

	// Check connection
	if (mysqli_connect_errno()){
		echo "Failed to connect to database: " . mysqli_connect_error();
	}
	
	mysqli_set_charset($connection,"utf8");
	
	$sql = "SELECT * FROM scmlk_dev ORDER BY date DESC, time DESC";
	$result = mysqli_query($connection,$sql);
	
	while($row = mysqli_fetch_assoc($result)) {
		echo '<p id="posts">';
		echo '<a id="profile-link" href="http://www.facebook.com/'.$row["fb_id"].'" target="_blank">'.$row["fb_name"].'</a> &nbsp;&nbsp;&nbsp;'.$row["text"];
		echo '</p>';
	}
	
	// Free result set
	mysqli_free_result($result);

	mysqli_close($connection);

?>