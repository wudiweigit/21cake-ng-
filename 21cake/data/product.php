<?php
    header('Content-Type: application/json; charset=utf-8');

    require('init.php');


    /**     产品信息表      **/
    $product = [];
    $sql = " SELECT * FROM c_product";
    $result = mysqli_query($conn,$sql);
    $product = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($product);
?>