<?php
include "data.php";

if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //利用sid查找对应的数据，返回给前端。
    $result=$conn->query("select * from list where sid = '$sid'");
    echo json_encode($result->fetch_assoc());
}
