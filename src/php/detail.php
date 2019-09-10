<?php  
	
	require "conn.php";
	
	$id=$_GET['sid'];
	
	$result=$conn->query("select * from aiqiyipic where sid=$id ");
	
	$arrdata=array();
	for($i=0;$i<$result->num_rows;$i++){
		$arrdata[$i]=$result->fetch_assoc();
	}
	echo json_encode($arrdata);

?>