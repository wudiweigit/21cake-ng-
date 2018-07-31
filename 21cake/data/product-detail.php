<?php
    header("ContentType:application/json;charset=utf-8");
    require('init.php');


     //获取产品详情条目表
    $sql = "SELECT * FROM c_product_detail";
    $result = mysqli_query($conn,$sql);
    $productDetail = mysqli_fetch_all($result,MYSQLI_ASSOC);

    //   产品规格条目表
    $sql = "SELECT * FROM c_size";
    $result = mysqli_query($conn,$sql);
    $sizeItem = mysqli_fetch_all($result,MYSQLI_ASSOC);

    $output = [
        'productDetail' => $productDetail,
        'sizeItem' => $sizeItem
    ];
    echo json_encode($output);
?>