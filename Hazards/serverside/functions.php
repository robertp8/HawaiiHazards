<?php 
require_once 'conf.php';

$db = null;
$temp = array();
$serverPath = "C:/wamp64/www/Hazards/datafiles/";

function connectDB(&$db){
  try{
	$db = new PDO(DbStats::$DSN, DbStats::$DBU, DbStats::$DBP);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch(PDOException $e){
	echo $e->getMessage();
	die();
  }
}

function login($uname, $pword){
  connectDB($db);
  $q = $db->prepare("SELECT * FROM admin WHERE uname = ? AND pword = ?");		
  $q->execute([$uname, $pword]);
  $r = $q->fetch(PDO::FETCH_ASSOC);
  if(!$r){
	echo json_encode("");
  }else{
	session_start();
	$_SESSION["firstname"] = $r["fname"];
	$_SESSION["lastname"] = $r["lname"];
	$_SESSION["idadmin"] = $r["idadmin"];
	$temp["firstname"] = $_SESSION["firstname"];
	$temp["lastname"] = $_SESSION["lastname"];
	echo json_encode($temp);
  }
}

function checkLogin(){
  connectDB($db);
  session_start();
  if(isset($_SESSION["firstname"])){
	$temp["firstname"] = $_SESSION["firstname"];
	$temp["lastname"] = $_SESSION["lastname"];
	echo json_encode($temp);
  }else{
	echo "There are no sessions";
  }
}

function newHazard($uname){
  connectDB($db);
  session_start();
  $idA = $_SESSION["idadmin"];
  $q = $db->prepare("INSERT INTO hazard (hname, admin_idadmin) VALUES (?, ?)");
  $q->execute([$uname, $idA]);
}

function getHaz(){
  connectDB($db);
  session_start();
  $q = $db->query("SELECT * FROM hazard");
  $r = $q->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($r);
}

function getFilename(){
  connectDB($db);
  session_start();
  $q = $db->query("SELECT * FROM file");
  $r = $q->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($r);
}

function importData($file, $idHaz){
	connectDB($db);
	session_start();
	$idA = $_SESSION['idadmin'];
	$q = $db->prepare("INSERT INTO file (filename, admin_idadmin, hazard_idhazard) VALUES(?, ?, ?)");
	$q->execute([$file, $idA, $idHaz]);
}

function uploadFile($idHaz){
  $fileName = $_FILES["importFile"]["name"]; 
  $fileTmpLoc = $_FILES["importFile"]["tmp_name"];
  global $serverPath;
	
  $pathAndName = $serverPath.$fileName;
	
  if (file_exists($pathAndName)) {
	echo "Sorry, file already exists.";
  }else{
	move_uploaded_file($fileTmpLoc, $pathAndName);
  }	
  importData($fileName, $idHaz);
}

function getData($hazval, $hazID){
  connectDb($db);
  session_start();
  $q = $db->query("SELECT * FROM hazdata WHERE hazval = '$hazval' AND hazard_idhazard = '$hazID'");
  $r = $q->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($r);
}

function viewHazards($idhaz){
  connectDb($db);
  session_start();
  $q = $db->query("SELECT * FROM hazdata WHERE hazard_idhazard = '$idhaz'");
  $r = $q->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($r);
}

function newHazData($hazval, $des, $mit, $src, $idH){
  connectDB($db);
  session_start();
  $idA = $_SESSION['idadmin'];
  $q = $db->prepare("INSERT INTO hazdata (hazval, description, mitigation, source, hazard_idhazard, admin_idadmin) VALUES(?, ?, ?, ?, ?, ?)");
  $q->execute([$hazval, $des, $mit, $src, $idH, $idA]);
}

function deleteHazData($del){
  connectDB($db);
  session_start();
  if(!is_array($del))
	$del = array($del);		
  foreach($del as &$de)
	$de = $db->quote($de);	  
  $db->exec('DELETE FROM hazdata WHERE idhazdata IN (' . implode(', ', $del) . ')');
}

function updateHazData($hazval, $des, $mit, $src, $idhaz, $iddata){
  connectDB($db);
  session_start();
  $idA = $_SESSION['idadmin'];
  $q = $db->prepare("UPDATE hazdata SET hazval = ?, description = ?, mitigation = ?, source = ?, hazard_idhazard = ?, admin_idadmin = ? WHERE idhazdata = ?");
  $q->execute([$hazval, $des, $mit, $src, $idhaz, $idA, $iddata]);
}
?>