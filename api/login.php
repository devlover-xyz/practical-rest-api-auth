<?php
header("Access-Control-Allow-Origin: http://sales.local");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "../vendor/autoload.php";
include_once './config/core.php';
include_once './config/database.php';
include_once './models/user.php';

use \Firebase\JWT\JWT;

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

// instantiate user object
$user = new User($conn);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$email_exists = $user->emailExists();
$password = $data->password;

if ($email_exists && password_verify($password, $user->password)) {
    
    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "id" => $user->id,
            "firstname" => $user->first_name,
            "lastname" => $user->last_name,
            "email" => $user->email,
            "access_level" => $user->access_level
        )
    );

    http_response_code(200);

    $jwt = JWT::encode($token, $secret_key);
    echo json_encode(
        array(
            "message" => "Successful login.",
            "jwt" => $jwt,
            "email" => $user->email,
            "expireAt" => $expire_claim
        )
    );
} else {

    http_response_code(401);
    echo json_encode(array("message" => "Login failed.", "password" => $password));
}
