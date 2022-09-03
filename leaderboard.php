<?php 
    include_once 'header-plus-background.php';
        $conn = mysqli_connect("localhost", "admin", "password", "tetris");
        $username = $_SESSION["username"] ?? " ";
        
?>
<html>
    <body> 
        <div class="main">
           <div class=leaderboard>
                <table id="leadTable">
                    <?php 
                    if(isset($_POST["score"]) and $_SESSION["played"] == true){
                        $_SESSION["played"] = false;
                        $score = $_POST["score"];
                        $sql_score= "SELECT Display FROM Users WHERE Username= '".$username. "';";
                        $query = mysqli_query($conn, $sql_score) ;
                        $display = 0;
                        if(!$query) {
                            echo "Error:" .mysqli_error($conn);
                        } else{
                            $display = $query->fetch_assoc();
                        }
                        if($display["Display"] == 1){
                            echo "<p>Your results were registered!</p>";
                            $sql = "INSERT INTO Scores (Username, Score) VALUES ('" . $username.  "', '". $score. "');";
                            if(!mysqli_query($conn, $sql)) {
                                echo "Error:" .mysqli_error($conn);
                            }       
                        } else {
                            echo "<p>Your results were not registered.</p>";
                        }
                    }
                    
                    $sql = "SELECT Username, Score FROM Scores ORDER BY Score DESC";
                    $result = $conn->query($sql);
                    $query = mysqli_query($conn, $sql) ;
                    if ($result->num_rows > 0) {
                    // output data of each row
                        echo "<table><tr><th>Username</th><th>Score</th></tr>";
                        while($row = $result->fetch_assoc()) {
                            echo "<tr><td>" . $row["Username"] . "</td><td>" . $row["Score"] . "</td></tr>";
                        }
                        echo "</table>";
                    } else {
                        echo "0 results";
                    }
                    ?>
                </table>
            </div>
        </div>  
        <script src ="tetris.js"> </script>
    </body>
</html>