<?php
include "data.php";
//检测用户名和密码是否都已经传入
if(isset($_POST['name']) && isset($_POST['pass'])){
    $name = $_POST['name'];
    $pass = sha1($_POST['pass']);
    $result = $conn->query("select * from login where username = '$name' and password ='$pass'");
    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{//匹配不成功
        echo false;
    }
}