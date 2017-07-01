<?php

require_once 'functions.php';
header('Content-type: application/json'); 

switch ($_REQUEST['functions']){

  case "login";
	if (isset($_REQUEST['uname']) && isset($_REQUEST['pword'])){
	  $uname = $_REQUEST['uname'];
	  $pword = $_REQUEST['pword'];
	  $functions = "login";
	  $functions($uname,$pword);
	}else{
	  echo "no user by that username or password";
	}
	break;
  case "checkLogin";
	$functions = "checkLogin";
	$functions();
	break;
  case "newHazard";
    if(isset($_REQUEST['hname'])){
	  $hname = $_REQUEST['hname'];
	  $functions = "newHazard";
	  $functions($hname);
	}else{
	  echo "function failed.";
	}
	break;
  case "getHaz";
    $functions = "getHaz";
	$functions();
	break;
  case "getFilename";
    $functions = "getFilename";
	$functions();
	break;
  case "uploadFile";
    if(isset($_REQUEST['idhazard'])){
	  $idHaz = $_REQUEST['idhazard'];
	  $functions = "uploadFile";
	  $functions($idHaz);
	}else{
	  echo "function failed.";
	}
	break;
  case "getData";
    if(isset($_REQUEST['val']) && isset($_REQUEST['hazID'])){
	  $hazval = $_REQUEST['val'];
	  $hazID = $_REQUEST['hazID'];
	  $functions = "getData";
	  $functions($hazval, $hazID);
	}else{
	  echo "function failed.";
	}
    break;
  case "viewHazards";
    if(isset($_REQUEST['haz'])){
	  $idhaz = $_REQUEST['haz'];
	  $functions = "viewHazards";
	  $functions($idhaz);
	}else{
	  echo "function failed";
	}
	break;
  case "newHazData";
    if(isset($_REQUEST['hazval']) && isset($_REQUEST['des']) && isset($_REQUEST['mit']) && isset($_REQUEST['src']) && isset($_REQUEST['idhaz'])){
	  $hazval = $_REQUEST['hazval'];
	  $des = $_REQUEST['des'];
	  $mit = $_REQUEST['mit'];
	  $src = $_REQUEST['src'];
	  $idH = $_REQUEST['idhaz'];
	  $functions = "newHazData";
	  $functions($hazval, $des, $mit, $src, $idH);
	}else{
	  echo "function failed";
	}
	break;
  case "deleteHazData";
	if(isset($_REQUEST['del'])){
	  $del = $_REQUEST['del'];
	  $functions = "deleteHazData";
	  $functions($del);
	}else{
	  echo "function failed";
	}
    break;
  case "updateHazData";
    if(isset($_REQUEST['hazval']) && isset($_REQUEST['des']) && isset($_REQUEST['mit']) && isset($_REQUEST['src']) && isset($_REQUEST['idhaz']) && isset($_REQUEST['iddata'])){
	  $hazval = $_REQUEST['hazval'];
	  $des = $_REQUEST['des'];
	  $mit = $_REQUEST['mit'];
	  $src = $_REQUEST['src'];
	  $idhaz = $_REQUEST['idhaz'];
	  $iddata = $_REQUEST['iddata'];
	  $functions = "updateHazData";
	  $functions($hazval, $des, $mit, $src, $idhaz, $iddata);
	}else{
	  echo "function failed";
	}
	break;
  default: 
    echo "No functions has been chosen!";
    die();
}
?>