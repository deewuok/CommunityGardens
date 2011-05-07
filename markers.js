$(document).ready(function() {
  $("#map").css({
		height: 500,
		width: 893
	});
	var myLatLng = new google.maps.LatLng(35.65, -97.41);
  // MYMAP.init('#map', myLatLng, 11);
    MYMAP.init('#map', myLatLng, 13);
  $("#showmarkers").click(function(e){
		MYMAP.placeMarkers('OKCDiningTest.xml');
        
        
  });
});

var MYMAP = {
  map: null,
	bounds: null
}

/*
   GEvent.addListener(map, "click", function(overlay, point) 
   { 
    if (overlay) {} 
    else if (point) 
    { 
     var zoom   = map.getZoomLevel(); 
     var latLngStr = 'Lng: ' + point.x + '<br />Lat: ' + point.y + '<br 
/>Zoom: ' + zoom; 
     document.getElementById("map").innerHTML = latLngStr; 
    } 
   }); 
 */  
   

MYMAP.init = function(selector, latLng, zoom) {
  var myOptions = {
    zoom:zoom,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map($(selector)[0], myOptions);
	this.bounds = new google.maps.LatLngBounds();
}

MYMAP.placeMarkers = function(filename) {
	$.get(filename, function(xml){
		$(xml).find("restaurant").each(function(){
			var name = $(this).find('name').text();
			var address = $(this).find('address').text();
			
			// create a new LatLng point for the marker
                        var number= $(this).find('number').text();
			var lat = $(this).find('lat').text();
			var lng = $(this).find('lng').text();
			var phone=  $(this).find('phone').text();
			var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
            var category= $(this).find('category').text();
            var comment= $(this).find('comment').text();
           // var weblink= $(this).find('weblink').getAttribute('href').text();
			
			// extend the bounds to include the new point
			MYMAP.bounds.extend(point);
			
			var marker = new google.maps.Marker({
				position: point,
				map: MYMAP.map
			});
			
			var infoWindow = new google.maps.InfoWindow();
			var html='<strong>'+number+') '+name+'</strong.><br />'+address+'<br />'+phone;
             var htmllink='<strong>'+number+') '+name+'</strong.><br />'+address+'<br />'+phone+'<br />'+category+'<br />'+comment;
             
             
// var htmllink='<strong>'+number+') '+name+'</strong.><br />'+address+'<br />'+phone+'<br />'+comment+'<br />'+weblink;
			google.maps.event.addListener(marker, 'mouseover', function() {
				infoWindow.setContent(html);
				infoWindow.open(MYMAP.map, marker);
			});
           google.maps.event.addListener(marker, 'mouseout', function() {
				infoWindow.setContent(html);
				infoWindow.close(MYMAP.map, marker);
			});
            google.maps.event.addListener(marker, 'click', function() {
               // this works as a popup->  alert("test");
            	infoWindow.setContent(htmllink);
				infoWindow.open(MYMAP.map, marker);
                
			});
			MYMAP.map.fitBounds(MYMAP.bounds);
		});
	});
}

/*
1) THIS was for clicking on the map
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(html);
				infoWindow.open(MYMAP.map, marker);
			});
            
*/            
/*
2) These are the commands            
            
    google.maps.event.addListener(marker, "click", function (e) { log("Click"); });
     google.maps.event.addListener(marker, "dblclick", function (e) { log("Double Click"); });
     google.maps.event.addListener(marker, "mouseover", function (e) { log("Mouse Over"); });
     google.maps.event.addListener(marker, "mouseout", function (e) { log("Mouse Out"); });
     google.maps.event.addListener(marker, "mouseup", function (e) { log("Mouse Up"); });
     google.maps.event.addListener(marker, "mousedown", function (e) { log("Mouse Down"); });
     google.maps.event.addListener(marker, "dragstart", function (mEvent) { log("Drag Start: " + mEvent.latLng.toString()); });
     google.maps.event.addListener(marker, "drag", function (mEvent) { log("Drag: " + mEvent.latLng.toString()); });
     google.maps.event.addListener(marker, "dragend", function (mEvent) { log("Drag End: " + mEvent.latLng.toString()); });
    */
