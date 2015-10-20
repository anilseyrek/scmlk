<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Troll Page</title>
	</head>
	<body>
		<div id="trolling-form">
			<form action="trolling_scmlk_with_other_names_2014.php" method="GET">
				fb_id: <input id="fb_id" type="text" name="fb_id" autofocus>
				fb_name: <input id="fb_name" type="text" name="fb_name">
				Post: <input id="posttxt" type="text" name="posttxt">
				<input type="submit" value="Yard&#305;r">
			</form>
			<?php
				//Create connection
				$connection = mysqli_connect("localhost","username","password","db_name");

				// Check connection
				if (mysqli_connect_errno()){
					echo "Failed to connect to database: " . mysqli_connect_error();
				}
				
				mysqli_set_charset($connection,"utf8");
				
				//Take values
				$posttxt = mysqli_real_escape_string($connection, $_GET['posttxt']);
				$fb_id = mysqli_real_escape_string($connection, $_GET['fb_id']);
				$fb_name = mysqli_real_escape_string($connection, $_GET['fb_name']);
				
				if (isset($_GET['fb_id']) && ($_GET['fb_id'] != null)) {
					$sql = "INSERT INTO scmlk_dev (fb_id, fb_name, date, time, text) VALUES ('".$fb_id."', '".$fb_name."', CURDATE(), CURTIME(), '".$posttxt."')";
					//$sql_2 = "INSERT INTO scmlk_2 (fb_id, fb_name, date, time, text) VALUES ('".$fb_id."', '".$fb_name."', CURDATE(), CURTIME(), '".$posttxt."')";

					if (!mysqli_query($connection,$sql)) {
						die('Error: ' . mysqli_error($connection));
					}
					/*if (!mysqli_query($connection,$sql_2)) {
						die('Error: ' . mysqli_error($connection));
					}*/
				}

				mysqli_close($connection);
				
			?>
	</body>
</html>