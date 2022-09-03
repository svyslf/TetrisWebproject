<?php 
    include_once 'header-plus-background.php';
?>
    <div class="main">
        
        <div class='styleform'>
            <h1> Register Now! </h1>
                <div class='form'>
                    <form action="index.php" method="post"> 
                        <label for="Firstname"> First name </label>
                        <input type="text" name="firstname" placeholder="First name"/>
                    
                
                        <label for="Lastname"> Last name </label>
                        <input type="text" name="lastname" placeholder="Last name"/>
                        

                        <label for="username"> User name </label>
                        <input type="text" name="username" placeholder="username"/>
                    

                        <label for="password"> Password  </label>
                        <input type="password" name="password" placeholder="Password"/>
                    

                        <label for="Repeatpassword"> Repeat Password  </label>
                        <input type="password" name="repeatpassword" placeholder="Confirm password"/>
                    

                        <label for="display"> Display Scores on Leaderboard? </label>
                        <div class="radioanswers">
                            <input type="radio" name="display" value = "yes" > 
                                <label > Yes </label>
                            </input>
                            <input type="radio" name="display" value = "no" > 
                                <label > No </label> 
                            </input>
                        </div>
                        <button type="submit" name="submit_registerform"> Register </button>
                    </form>
                </div>
        </div>
            <div class = 'error'>
                <?php 
                    if (isset($_GET["error"])) {
                        if ($_GET["error"] == "missinginput") {
                            echo "<p> Complete all fields! </p>";
                        }
                        elseif ($_GET["error"] == "invalidusername") {
                            echo "<p> Invalid username. Try another. </p>";
                        }
                        elseif ($_GET["error"] == "passwordsdontmatch") {
                            echo "<p> Make sure your passwords match! </p>";
                        }
                        elseif ($_GET["error"] == "usernametaken") {
                            echo "<p> This username is already taken :( </p>";
                        }
                    }
                    ?>
            </div>
    </div>

