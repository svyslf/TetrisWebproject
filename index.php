<?php 
    require_once 'header-plus-background.php';

    $conn = mysqli_connect("localhost", "admin", "password", "tetris");
    
    if (!$conn) {
        die("connection failed! : " . mysqli_connect_error());
    }
    $firstname = $_POST["firstname"] ?? '';
    $lastname = $_POST["lastname"] ?? '';
    $username = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';
    $repeatpassword = $_POST["repeatpassword"] ?? '';
    $Display = $_POST["display"] ?? '';
    
    //increment display radio button value based on input
        if ($Display == 'yes') {
            $Display = 1;
        } else {
            $Display = 0; 
        } 
    
    //check if registerpage is empty 
    function registerpageEmpty($firstname, $lastname, $username, $password, $repeatpassword, $Display) {
        $result;
        if (empty($firstname) || empty($lastname) || empty($username) || empty($password) || empty($repeatpassword)|| $Display === NULL){
            $result = true;
        } else {
            $result = false;
        }
        return $result;
    }

    //check if username is invalid
    function invalidusername($username) {
        $result;
        if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
            $result = true;
        } else {
            $result = false;
        }
        return $result;
    }
    //check if passwords match
    function passwordmatchCheck($password, $repeatpassword) {
        $result;
        if ($password !== $repeatpassword) {
            $result = true;
        } else {
            $result = false;
        }
        return $result;
    }
    //check if username exists 
    function usernameExists($conn, $username) {
        $sql = "SELECT * FROM Users WHERE Username = ?;";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: register.php?error=statementfailed");
            exit();
        } 
        mysqli_stmt_bind_param($stmt, 's', $username);
        mysqli_stmt_execute($stmt);

        $resultData = mysqli_stmt_get_result($stmt);

        if($row = mysqli_fetch_assoc($resultData)) {

            return $row;

        } else {
            $result = false;
            return $result;
        }
        myqli_stmt_close($stmt);
    }
    //create the user's account if everything inputted is correct 
    function createuseraccount($conn, $username, $firstname, $lastname, $password, $Display) {
        $sql = "INSERT INTO Users (Username, FirstName, LastName, Password, Display) VALUES (?,?,?,?,?);";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("location: register.php?error=statementfailed");
            exit();
        } 
        $hashedPass = password_hash($password, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt, 'ssssi', $username, $firstname, $lastname, $hashedPass, $Display);
        mysqli_stmt_execute($stmt);
        header("location: index.php?error=none");
        loginUser($conn, $username, $password);
        myqli_stmt_close($stmt);
        
    }
    //only works if user presses registration form 
    if (isset($_POST["submit_registerform"])) {
        if (registerpageEmpty($firstname, $lastname, $username, $password, $repeatpassword, $Display) !== false) {
            header("location: register.php?error=missinginput");
            exit();
        }
        if (invalidusername($username) !== false) {
            header("location: register.php?error=invalidusername");
            exit();
        }
        if (passwordmatchCheck($password, $repeatpassword)!== false) {
            header("location: register.php?error=passwordsdontmatch");
            exit();
        }
        if(usernameExists($conn, $username)!== false) {
            header("location: register.php?error=usernametaken");
            exit();
       }
       createuseraccount($conn, $username, $firstname, $lastname, $password, $Display);
    }
    //loginpage check 
    function loginpageEmpty($username, $password) {
        $result;
        if (empty($username) || empty($password)){
            $result = true;
        } else {
            $result = false;
        }
        return $result;
    }
    //login user if inputs are correct 
    function loginUser($conn, $username, $password) {
        $usernameExists = usernameExists($conn, $username);
        if ($usernameExists === false) {
            header("Location: index.php?error=userdoesnotexist");
            exit();
        }
        $password_saved = $usernameExists["Password"];
        $checkpass = password_verify($password, $password_saved);
        if ($checkpass=== false ) {
            header("Location: index.php?error=wrongpassword");
            exit();
        } elseif ($checkpass === true ) {
            session_start();
            $_SESSION["username"] = $usernameExists["Username"];
            header("Location: index.php");
            exit();
        }
    }
    if (isset($_POST["submit"])) {
        if (loginpageEmpty($username, $password) !== false) {
            header("Location: index.php?error=missinginputs");
            exit();
        }
        loginUser($conn, $username, $password);
    }
    if (isset($_POST["logout"])) {
        session_unset();
        session_destroy();
        header("Location: index.php");
        exit();
    }

?>
    <div class="main"> 
        
    <?php if (isset($_SESSION["username"])) : ?>
        <div class= "styleform" >
            <p> Welcome to Tetris! </p>
            <div class='form'>

                <button type="submit" onclick=window.location.href="tetris.php"> Click here to play </button>
                <form action="index.php" method="post">
                <button name="logout"> Log out </button>
                </form>
            </div>
        </div>
    <?php else : ?> 
        <div class= "styleform" >
            <p> Welcome to Tetris! </p>
            <h1> Log In </h1>
            <div class='form'>
                <form action="index.php" method="post"> 

                    <label for="username"> User name </label>
                    <input type="text" name="username" />

                    <label for="Password"> Password  </label>
                    <input type="password" name="password" />
                
                    <button type="submit" name="submit"> Log In </button>
                </form>
            </div>
            <div class='formcaption'>
                <p> Don't have a user account?</p>
                <a href="register.php">Register Now</a>
            </div>
        </div>
            <div class = 'error'>
                <?php 
                    if (isset($_GET["error"])) {
                        if ($_GET["error"] == "userdoesnotexist") {
                            echo "<p> Incorrect username! </p>";
                        }
                        elseif ($_GET["error"] == "wrongpassword") {
                            echo "<p> Incorrect password! </p>";
                        }
                        elseif ($_GET["error"] == "missinginputs") {
                            echo "<p> Log-in info empty!</p>";
                        }
                        elseif ($_GET["error"] == "missingsignin"){
                            echo "<p> You need to sign in first! </p>";
                        }
                    }
                ?>
            </div>
    <?php endif; ?>
    </div>
    