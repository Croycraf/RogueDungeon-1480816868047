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
	
	$sql = "SELECT * FROM highscores ORDER BY score DESC";
	$result = $conn->query($sql);
	$rank = 1;
	
	//echo "{$rank} {$row['userName']} {$row['score']} {$row['floor']}";
	//echo $rank . $row["userName"] . $row["score"] . $row["floor"]. "<br>";

	if($result->num_rows > 0) {
		echo "before while";
		while ($row = $result->fetch_assoc()) {
			echo $rank . $row["userName"] . $row["score"] . $row["floor"]. "<br>";
			$rank++;
		}
	}
	else {
		echo "zero or less";
	}

	$conn->close();

?>
