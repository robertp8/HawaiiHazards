  self.addHazardData = function(){
	cred = {};
	cred.idhaz = self.hnameSelected().idhazard;
	cred.hazval = 0;
	cred.des = "";
	cred.mit = "";
	cred.src = "";
	cred.functions = "newHazData";
	cred.returntype = "json";
	
	$.ajax({
	  type: "POST",
	  url: "../serverside/bridge.php",
	  data: cred,
	  datatype: "json",
	  success: function(data){
		self.displayList();
	  }
	});
  } 
  
  self.displayList = function(){
	var cred = {};
	if(self.hnameSelected() === undefined){
	  cred.haz = null;
	}else{
	  cred.haz = self.hnameSelected().idhazard;
	}
	cred.functions = "viewHazards";
	cred.returntype = "json";
	$.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: cred,
	  datatype: "json",
	  success: function(data){
		self.listHazards(data);
	  }
	});
  }
  
  self.getHazDef = function(){
	self.hazList([]);
	self.getHaz2();
    self.getHazNames = function(data){
      for(var i=0; i<data.length; i++){
		self.hazList.push({hazName: data[i].hname});
	  }
    }
  }
  
  self.display = function(){
    initialize(); 
	
	if(self.filenameSelected() === undefined){
	  self.setMarker();
	}else{
	  var geoXml = new geoXML3.parser({
	    //map: map,
	    singleInfoWindow: true,
	    afterParse: displayKml
      });
	  geoXml.parse('../datafiles/'.concat(self.filenameSelected().filename));
	  
	  function displayKml(doc){
	    var numberOfPolys = doc[0].gpolygons.length;
	    for(var i = 0; i < numberOfPolys; i++) { 
		  doc[0].gpolygons[i].setMap(map); 		  
	    }
	  }
	  self.setMarker();
	}
  }
  
  self.hazDetails = function(){
	self.getDes([]);
	self.getMit([]);
	self.getSrc([]);
	self.zone([]);
	
	self.getFilename2();
	self.getFile = function(data){
	  var cred = {};
	  cred.functions = "getData";
	  cred.returntype = "json";
	  
      for(var i=0; i<self.hazList().length; i++){
		if(self.hazList()[i].hazName == "Tsunami"){
		  var geoXml = new geoXML3.parser({
		    singleInfoWindow: true,
		    afterParse: displayKmlData
		  });
		  geoXml.parse('../datafiles/Tsunami.kml');
			  
		  function displayKmlData(doc){
			self.tempTsuVal = 0;
		    for(var j=0; j<doc[0].gpolygons.length; j++){
		      if(doc[0].gpolygons[j].Contains(self.grabLoc())){
				self.tsuVal = 1;
				self.tempTsuVal = self.tsuVal;
			  }else{
			    self.tsuVal = 0;
		      }
			  if(self.tempTsuVal == 1){
			    self.tsuVal = self.tempTsuVal;
			  }
		    }
			cred.val = self.tsuVal;
			cred.hazID = data[1].hazard_idhazard;
			$.ajax({
			  type: "POST",
			  url: "../serverside/bridge.php",
			  data: cred,
			  datatype: "json",
			  success: function(data){
				self.zone.push(data[0].hazval);  
				self.getDes.push(data[0].description);
				self.getMit.push(data[0].mitigation);
				self.getSrc.push(data[0].source);
			  }
			});
	      }
	    }else if(self.hazList()[i].hazName == "Lava"){
		  var geoXml = new geoXML3.parser({
		    singleInfoWindow: true,
		    afterParse: displayKmlData
		  });
		  geoXml.parse('../datafiles/doc.kml');
		  function displayKmlData(doc){
		    for(var j=0; j<doc[0].gpolygons.length; j++){
			  if(doc[0].gpolygons[j].Contains(self.grabLoc())){
			    self.lavaVal = doc[0].placemarks[j].name;
				cred.val = self.lavaVal;
				cred.hazID = data[0].hazard_idhazard;
				$.ajax({
				  type: "POST",
				  url: "../serverside/bridge.php",
				  data: cred,
				  datatype: "json",
				  success: function(data){
					self.zone.push(data[0].hazval);
					self.getDes.push(data[0].description);
					self.getMit.push(data[0].mitigation);
					self.getSrc.push(data[0].source);
				  }
				});
			  }else{
			    console.log("Out of the Big Island");
		      }
		    }
	      }
	    }else{
		  console.log("blah");
		}
	  }
	}
  }
  
  self.setMarker = function(){
	for(var i=0; i<self.markers().length; i++){
      self.markers()[i].setMap(null);
	}
	      
    var marker = new google.maps.Marker({
	  map: map,
	  position: self.grabLoc()
	});
	self.markers.push(marker);
  }
  
  self.getFilename = function(){
    $.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: {functions: "getFilename", returntype: "json"},
	  datatype: "json",
	  success: function(data){
		self.filename(data);
	  }
	});
  }
  
  self.getFilename2 = function(){
    $.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: {functions: "getFilename", returntype: "json"},
	  datatype: "json",
	  success: function(data){
		self.getFile(data);
		return data;
	  }
	});
  }
  
  self.getHaz = function(){
	$.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: {functions: "getHaz", returntype: "json"},
	  datatype: "json",
	  success: function(data){
		self.hname(data);
	  }
	});
  }
  
  self.getHaz2 = function(){
	$.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: {functions: "getHaz", returntype: "json"},
	  datatype: "json",
	  success: function(data){
		self.getHazNames(data);
		return data;
	  }
	});
  }
  
  self.uploadFile = function(){
	var formData = new FormData();
	var newfile = document.getElementById("importFile").files[0];
	formData.append('importFile', newfile);
	formData.append('functions', "uploadFile");
	formData.append('idhazard', self.hnameSelected().idhazard);
	formData.append('returntype', 'json');
	if(newfile === undefined){
	  if(confirm("No file has been chosen") == true){
		location.reload();
	  }else{
		location.reload();
	  }
	}
	$.ajax({
	  type: "POST",
	  url: "../serverside/bridge.php",
	  data: formData,
	  contentType: false,
	  processData: false,
	  cache: false,
	  datatype: "json",
	  success: function(data){
		location.reload();
	  }
	});
  }
  
  self.addNewHaz = function(){
	var cred = {};
	cred.hname = $('formElement, #hname').val();
	cred.functions = "newHazard";
	cred.returnType = "json";
	$.ajax({
	  type: "POST",
	  url: "../serverside/bridge.php",
	  data: cred,
	  datatype: "json",
	  success: function(data){
		$('#newHazardModal').modal('hide');
	  }
	});
  }
  
  profileFun = function(){
	self.indexImage(false);
	self.searchBar(false);
	self.header(true);
	self.wrap(false);
	self.hazardMenu(false);
	self.adminFun(true);
  }
  
  self.hazMenu = function(){
	self.adminFun(false);
	self.hazardMenu(true);
	self.getHaz();
  }
  
  self.exitHazMenu = function(){
	self.hazardMenu(false);
	self.adminFun(true);
  }
  
  self.exitAdminMenu = function(){
	homepage();
  }
  
  homepage = function(){
	self.indexImage(true);
	self.searchBar(false);
	self.header(true);
	self.wrap(false);
	self.adminFun(false);
	self.hazardMenu(false);
  }
	
  self.login = function(formElement){
	var cred = {};
	cred.uname =  $('formElement, #uname').val();
	cred.pword =  $('formElement, #pword').val();
	cred.functions = "login";
	cred.returntype = "json";
	$.ajax({
	  type: "GET",
	  url: "../serverside/bridge.php",
	  data: cred,
	  datatype: "json",
	  success: function(data){
		location.reload();
	  }
	});
  }
	
  $.ajax({
	type: "GET",
	url: "../serverside/bridge.php",
	data: {functions: "checkLogin", returntype: "json"},
	datatype: "json",
	success: function(data){
	  self.loggedin(data);
	  self.showLogin(false);
	  self.showLogout(true);
	  self.preLogin(true);
	}
  });