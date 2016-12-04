<?php
	$servername = "us-cdbr-iron-east-04.cleardb.net";
	$username = "b8e8d5c50f2a55";
	$password = "ea36a1fa";
	$conn = new mysqli($servername, $username, $password, "ad_78271414726dba7");
		if ($conn->connect_errno > 0) {
	    die('Unable to connect to database' . $conn->connect_error);
	}
	
	$q = $_REQUEST["q"];
	
	$sql = "SELECT * FROM highscores ORDER BY score DESC";
	$result = $conn->query($sql);
	$rank = 1;

	if($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			echo $rank . " " . $row["userName"] . " " . $row["score"] . " " . $row["floor"];
			$rank++;
		}
	}
	else {
		if($result->num_rows == 0) {
			echo "No results found.";
		}
		else {
			echo "This shouldn't happen. This is embarrassing."	
		}
		//echo "zero or less";
	}

	$conn->close();

?>
