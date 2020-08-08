<?php
include "data.php";
//检测用户
if(isset($_POST['name'])){//是否重名
    $username=$_POST['name'];//获取值  查询数据库是否重名
     $result= $conn->query("select * from login where username='$username'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if(isset($_POST['submit'])){
 $username=$_POST['username'];
echo $username;
 $password=sha1($_POST['password']);
    echo $password;
    $sql = "INSERT INTO login VALUES (null, '$username', '$password')";
// $conn->query("insert login values(null,'$username','$password'");
$conn->query($sql);
  header('location:http://10.31.163.49/super/TheNorthFace/src/register.html');
}


?>