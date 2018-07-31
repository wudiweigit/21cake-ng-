<?php
header("Content-Type: application/json;charset=utf-8");

require( 'init.php' );

 //获取网站基本信息
$sql = " SELECT * FROM c_base_info";
$result = mysqli_query($conn,$sql);
$baseInfo = mysqli_fetch_all($result,MYSQLI_ASSOC);

 //获取网站导航条栏目
$sql = "SELECT * FROM c_header";
$result = mysqli_query($conn ,$sql);
$headerItems = mysqli_fetch_all($result,MYSQLI_ASSOC);

//获取轮播广告条目
$sql = "SELECT * FROM c_carousel";
$result = mysqli_query($conn,$sql);
$carouselItems = mysqli_fetch_all($result,MYSQLI_ASSOC);

//专栏条目表
$sql = "SELECT * FROM c_special";
$result = mysqli_query($conn,$sql);
$specialItems = mysqli_fetch_all($result,MYSQLI_ASSOC);


//    产品详情条目表
$sql = "SELECT * FROM c_product_detail";
$result =mysqli_query($conn,$sql);
$productDetail = mysqli_fetch_all($result,MYSQLI_ASSOC);





$output = [
    'baseInfo' => $baseInfo,
    'headerItems' => $headerItems,
    'carouselItems' => $carouselItems,
    'specialItems' => $specialItems,
    'productDetail' => $productDetail
];
echo json_encode($output);
?>