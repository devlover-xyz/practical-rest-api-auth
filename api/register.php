<?php
header("Access-Control-Allow-Origin: http://sales.local");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/core.php';
include_once './config/database.php';
include_once './models/user.php';

$firstName = '';
$lastName = '';
$email = '';
$password = '';
$conn = null;

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

// instantiate product object
$user = new User($conn);

$data = json_decode(file_get_contents("php://input"));

$user->first_name = $data->first_name;
$user->last_name = $data->last_name;
$user->email = $data->email;
$user->password = $data->password;
$user->access_level = 'Customer';

// create the user
if (
    !empty($user->first_name) &&
    !empty($user->email) &&
    !empty($user->password) &&
    $user->create()
) {

    // set response code
    http_response_code(200);

    // display message: user was created
    echo json_encode(array("message" => "User was successfully registered."));
} else { // message if unable to create user

    // set response code
    http_response_code(400);

    // display message: unable to create user
    echo json_encode(array("message" => "Unable to register user."));
}
