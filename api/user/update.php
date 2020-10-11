<?php
// required headers
header("Access-Control-Allow-Origin:  http://sales.local");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../models/user.php';

// get database connection
$database = new DatabaseService();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$user->first_name = $data->first_name;
$user->last_name = $data->last_name;
$user->email = $data->email;
$user->access_level = "Customer";
$user->password = $data->password;
$user->id = $data->id;

// update the user
if ($user->update()) {

    // set response code
    http_response_code(200);

    // response in json format
    echo json_encode(
        array(
            "message" => "User was updated."
        )
    );
}

// message if unable to update user
else {
    // set response code
    http_response_code(401);

    // show error message
    echo json_encode(array("message" => "Unable to update user.", "data" => $decoded->data));
}
