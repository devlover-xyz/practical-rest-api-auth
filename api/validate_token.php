<?php
// required headers
header("Access-Control-Allow-Origin: http://sales.local");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require "../vendor/autoload.php";
include_once './config/core.php';
include_once './config/database.php';
use \Firebase\JWT\JWT;


$jwt = null;
$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];

$arr = explode(" ", $authHeader);

$jwt = isset($arr[1])? $arr[1] : '';

if($jwt){

    try {

        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        echo json_encode(array(
            "message" => "Access granted:",
            "data" => $decoded->data
        ));

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }

}else{
    // set response code
    http_response_code(401);
    
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
