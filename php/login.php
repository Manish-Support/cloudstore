<?php
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "user_auth";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
        echo "Login successful!";
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
}

$conn->close();
?>

