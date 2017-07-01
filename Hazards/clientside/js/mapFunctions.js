  var map, ID, input;
  function initialize(){
    var mapOptions = {
      zoom: 8,
	  center: new google.maps.LatLng(19.542915, -155.665857),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(0, 0),
    new google.maps.LatLng(0, 0));

  var options = {
    bounds: defaultBounds
  };
  
  $("input").keyup(function(){
	ID = this.getAttribute('id');
	
	if(ID == 'pac-input' || ID == 'pac-input2'){
	  input = document.getElementById(ID);
      //var input = document.getElementById('pac-input');
      //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      var autocomplete = new google.maps.places.Autocomplete(input, options);
	  autocomplete.addListener('place_changed', onPlaceChanged);
      
	  function onPlaceChanged() {

	    self.indexImage(false);
	    self.searchBar(true);
		self.header(false);
	    self.wrap(true);
		self.hazardMenu(false);
	    self.display();
        
		for(var i=0; i<self.markers().length; i++){
		  self.markers()[i].setMap(null);
		}
 
		var place = autocomplete.getPlace();
		if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(15);
	      
		  var marker = new google.maps.Marker({
	        map: map,
	        position: place.geometry.location 
	      });
	
	      self.markers.push(marker);
        } else {
          document.getElementById(ID).placeholder = 'Physical Address';
        }
		self.getFilename();
		self.grabLoc(marker.position);
		self.getHazDef();
		self.hazDetails();
      }
	}
  });
  
  window.addEventListener("resize", function() {
	var viewPoint = $(window).width();
	
	if(viewPoint <= 700){
	  $("#col1.col").width("100%");
	  $("#col2.col").width("100%");
	  $("#col3.col").width("100%");
	  $("#col3.col").css("padding-bottom", "50px");
	  $("#dataCol").css("padding-bottom", "100px");
	}else{
	  $("#col1.col").width("50%");
	  $("#col2.col").width("50%");
	  $("#col3.col").width("50%");
	  $("#col3.col").css("padding-bottom", "50px");
	  $("#dataCol").css("padding-bottom", "0px");
	}
  }, false);