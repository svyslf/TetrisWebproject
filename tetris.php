<?php 
    include_once 'header-plus-background.php';
    if (!isset(($_SESSION["username"]))) {
        header('Location: index.php?error=missingsignin');
    }
    $_SESSION["played"] = true;
?>
<html> 
    <body> 
        <p id ="scoretext"> Score: </p>
        <p id ="score"> 0 </p>
        <div class="main">

            <div class="tetris-bg">

            </div>
            
            <button id="start" onclick= "startgame()" > Start the game! </button> 
        
        </div>
        
        <script src ="tetris.js"> </script>
    </body>
</html>