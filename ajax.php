<?php
	$servername = "us-cdbr-iron-east-04.cleardb.net";
	$username = "b8e8d5c50f2a55";
	$password = "ea36a1fa";
	$conn = new mysqli($servername, $username, $password);
		if ($conn->connect_errno > 0) {
	    die("Connection failed: " . mysqli_connect_error());
	}
	echo "Connected successfully";
	
	$q = $_REQUEST["q"];
	
	$result = mysql_query("SELECT userName, score, floor FROM highscores ORDER BY score DESC");
	$rank = 1;
	if (mysql_num_rows($result)) {
		while ($row = mysql_fetch_assoc($result)) {
			echo "{$rank} {$row['userName']} {$row['score']} {$row['floor']}";
			$rank++;
		}
	}
	$conn->close();

/*
function getScores() {
		$servername = "us-cdbr-iron-east-04.cleardb.net";
		$username = "b8e8d5c50f2a55";
		$password = "ea36a1fa";

		$conn = mysqli_connect($servername, $username, $password);

		if (!$conn) {
		    die("Connection failed: " . mysqli_connect_error());
		}
		echo "Connected successfully";
		
		
        $result = mysql_query("SELECT userName, score, floor FROM highscores ORDER BY score DESC");
        $rank = 1;

        if (mysql_num_rows($result)) {
            while ($row = mysql_fetch_assoc($result)) {
                echo "<td>{$rank}</td>
					  <td>{$row['userName']}</td>
                      <td>{$row['score']}</td>
                      <td>{$row['floor']}</td>";

                $rank++;
            }
        }
        mysqli_close($conn);
}

if($_GET['do'] == "getScores") {

	getScores();

}
 */  
/*
     "name": "ad_78271414726dba7",
        "hostname": "us-cdbr-iron-east-04.cleardb.net",
        "port": "3306",
        "username": "b8e8d5c50f2a55",
        "password": "ea36a1fa"
*/

?>
