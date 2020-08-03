<?
$result= $conn->query("SELECT * FROM taobaogoods");

    $arr = array();//准备一个空数组
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i] = $result->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }

    echo json_encode($arr);//输出接口
    ?>