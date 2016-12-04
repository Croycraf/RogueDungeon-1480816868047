<?php
	$servername = "us-cdbr-iron-east-04.cleardb.net";
	$username = "b8e8d5c50f2a55";
	$password = "ea36a1fa";
	$conn = new mysqli($servername, $username, $password);
		if ($conn->connect_errno > 0) {
	    die('Unable to connect to database' . $conn->connect_error);
	}
	echo "Connected successfully";
	
	$q = $_REQUEST["q"];
	
	$result = $conn->query("SELECT userName, score, floor FROM highscores ORDER BY score DESC");
	$rank = 1;
	echo "{$rank} {$row['userName']} {$row['score']} {$row['floor']}";
	/*
	while ($row = mysql_fetch_assoc($result)) {
		echo "{$rank} {$row['userName']} {$row['score']} {$row['floor']}";
		$rank++;
	}
	*/

	$conn->close();

?>
