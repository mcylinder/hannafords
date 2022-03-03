<?php

date_default_timezone_set('EST');


$data = array(
    "maxRecords" => 300,
    "view" => "Grid view"
);

$bearer_code = '';

$postflds = http_build_query($data);
$url = "https://api.airtable.com/v0/apptpGRna1z7zWWyh/Table%201?" . $postflds;
$headers = array('Content-Type: application/json', 'Authorization: Bearer ' . $bearer_code);
$curl = curl_init();
curl_setopt($curl, CURLOPT_VERBOSE, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$response = json_decode(curl_exec($curl), true);
curl_close($curl);

$all = [];
foreach ($response['records'] as $record) {
    $all[] = ['id' => $record['id'], 'name' => $record['fields']['name'], 'location' => $record['fields']['location']];
}


if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
header('Content-Type: application/json; charset=utf-8');
echo json_encode($all);
