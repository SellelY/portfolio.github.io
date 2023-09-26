<?php

ini_set("display_errors", 1);
    $json = file_get_contents("index.json");
    $data = json_decode($json, true);

    if ($data === null) {
        echo json_encode (["error" => "Failed to parse JSON data"]);
        exit;
    }

    $response = [
        "projects" => []
    ];

    foreach ($data["projects"] as $project) {
        $imageURLs = is_array($project["images"]) ? $project["images"] : [$project["images"]];
        $imageArray = [];

        foreach ($imageURLs as $imageURL) {
            $imageArray[] = ["url" => $imageURL];
        }

        $response["projects"][] = [
            "name" => $project["name"],
            "images" => $imageArray
        ];
    }

    header("Content-Type: application/json");
    echo json_encode($response, JSON_PRETTY_PRINT);

?>