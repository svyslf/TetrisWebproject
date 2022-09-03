<?php 
    session_start();
    ?>
<html>
    <link rel="stylesheet" href="/static/styles.css">

    <video autoplay muted loop id="backgroundvideo">
        <source src="/static/grid-background.mp4" type="video/mp4">
    </video>
    
    <body>
        <element class="nav">
            <ul>
                <li style="float:left" name="Home">
                    <a href="index.php">Home</a>
                </li>
                <li name="tetris">
                    <a href="tetris.php">Play Tetris</a>
                </li>
                <li name="leaderboard">
                    <a href="leaderboard.php">Leaderboard</a>
                </li>
            </ul>
        </element>
    </body>
</html>
