<?php
	$servername = "us-cdbr-iron-east-04.cleardb.net";
	$username = "b8e8d5c50f2a55";
	$password = "ea36a1fa";
	$conn = new mysqli($servername, $username, $password, "highscores");
	if ($conn->connect_errno) {
		echo "Failed to connect to server: " .$conn->connect_errno;
	}
	
	$q = $_REQUEST["q"];
	
	$result = mysql->query("SELECT userName, score, floor FROM highscores ORDER BY score DESC");
	$rank = 1;
	if (mysql_num_rows($result)) {
		while ($row = mysql_fetch_assoc($result)) {
			echo "{$rank} {$row['userName']} {$row['score']} {$row['floor']}";
			$rank++;
		}
	}
	$conn->close();
?>
