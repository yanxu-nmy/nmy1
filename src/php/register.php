<?php

require "conn.php";

//检测用户名
if(isset($_POST['checkname'])){
    $username=$_POST['checkname'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from user where id='$username'");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }

}




//前端用户输入了用户名。接收前端传入表单的值。
if(isset($_POST['username'])){
    $name=$_POST['username'];
    $pass=sha1($_POST['password']);//加密
    //添加数据库
    $conn->query("insert user values(null,'$name','$pass',NOW())");

    //php的跳转
    header('location:http://localhost/js1907/JS/Day%2033/src/aiqiyi.html');
}
// echo $name;
// echo $pass;