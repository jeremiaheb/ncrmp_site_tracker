// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require best_in_place
//= require jquery-ui
//= require best_in_place.jquery-ui
//= require jquery_ujs
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require underscore
//= require bootstrap-sprockets
//= require_tree 

$(document).ready(function(){

  jQuery(".best_in_place").best_in_place();

  $.datepicker.setDefaults({
    dateFormat: "yy-mm-dd"
  });
  
  $('.datepicker').datepicker();

  // For fixed width containers
    $('.dataTable').dataTable( {
        //"sDom": "<'row'<'span7'lf>r>t<'row'<'span7'ip>>",
        "sDom": '<"top"ifp<"clear">>rt<"bottom"<"clear">>',
        //"sPaginationType": "bootstrap",
        "sScrollY": "300px",
        "bPaginate": false,
        "bScrollCollapse": true,
        "aoColumns": [{ "sWidth": "5%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "10%" }, { "sWidth": "15%" }, { "sWidth": "5%"}],
        "bInfo": false
    } );

  function setReservedClass() {
    $('.isreserved').each(function(){
      var $reserved = $(this).text();
      if ( $reserved == "Yes" ) { 
        $(this).closest("tr").addClass("true"); 
      } else { $(this).closest("tr").removeClass("true"); }
    });
  };

  setReservedClass();
  
  $(document).ready(function(){
  $('.isreserved').on("click", function() {
    setReservedClass();
  });
  });

  var primaryLocationData = primaryLocations;
  var alternateLocationData = alternateLocations;
  
  function setInfoWindowContent(site, lat, lon, depth){
    return  "<div id='content'> Site ID: <b>" + site + "</b>"+
            "<p> Depth: " + depth + "</p>"+
            "<p> Latitude: " + lat + "</p>"+
            "<p> Longitude: " + lon + "</p>"+
            "</div>"
  };

  function setExtentContent(site, lat, lon){
    return  "<tr> <td>" + site + "</td>" +
                  "<td>" + lat + "</td>" +
                  "<td>" + lon + "</td>" +                  
            "</tr>"
  };

  function getMarkerPath(iconLevel, iconCode) {
    if (iconLevel == 2) { 
      return "/assets/mm_20_black.png";
     }
    else if ( iconLevel == 3 ) {
      return "/assets/Cross.png";
    }
    else {  
      switch (iconCode)
      {
        case "11":
          return "/assets/mm_20_white.png";
          break;
        case "12":
          return "/assets/mm_20_green.png";
          break;
        case "21":
          return "/assets/WhiteTriangle.png";
          break;
        case "22":
          return "/assets/GreenTriangles.png";
          break;
        case "23":
          return "/assets/YellowTriangle.png";
          break;
        case "24":
          return "/assets/OrangeTriangle.png";
          break;
      }
    }
  };
  


  var map;
  var primaryMarkers = [];
  var alternateMarkers = [];
  var habitatLayers = {};

  function initialize(){
    map = new google.maps.Map(document.getElementById('map_canvas'));
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    $.each(primaryLocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      bounds.extend(latlng);
      var marker = new google.maps.Marker({
        position: latlng,
          map: map,
          title: obj.site,
          content: setInfoWindowContent(obj.site, obj.latitude, obj.longitude, obj.depth),
          extentContent: setExtentContent(obj.site, obj.latitude, obj.longitude),
          icon: getMarkerPath(obj.level, obj.iconCode),
          iconCode: obj.iconCode,
          level: obj.level
      });

      primaryMarkers.push(marker);
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });

    });
    
    $.each(alternateLocationData, function(i,obj){
      var latlng = new google.maps.LatLng(obj.latitude, obj.longitude);
      bounds.extend(latlng);
      var marker = new google.maps.Marker({
          position: latlng,
          title: obj.site,
          content: setInfoWindowContent(obj.site, obj.latitude, obj.longitude, obj.depth),
          icon: getMarkerPath(obj.level, obj.iconCode)
      });
      alternateMarkers.push(marker);
     
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    });

    habitatLayers["Florida_Keys"] = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/u/7140118/FKeys_Habitat.kmz', {preserveViewport: true});
    habitatLayers["SEFCRI"] = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/u/7140118/SEFCRI2014Hab.kmz', {preserveViewport: true});
    habitatLayers["DRTO"] = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/u/7140118/FKeys_Habitat.kmz', {preserveViewport: true});
    habitatLayers["Puerto_Rico"] = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/u/7140118/PR_HabDiss.kmz', {preserveViewport: true});

    map.fitBounds(bounds);
  }

google.maps.event.addDomListener(window, 'load', initialize('map'));


function refreshMap() {
  location.reload();
}

function setHabitatMap(region) {
    habitatLayers[region].setMap(map);
};

function clearHabitatMap(region){
  habitatLayers[region].setMap(null);  
};

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < alternateMarkers.length; i++) {
    alternateMarkers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

function showFishSites() {
         var theBounds = map.getBounds();
        var allMarkers = primaryMarkers;
          for (var i = 0; i < allMarkers.length; i++) {
            if (allMarkers[i].level != "3" && ~$.inArray(allMarkers[i].iconCode,["11","21","24"]) && theBounds.contains(allMarkers[i].position)) {
              $("#fishModalTable > tbody:last").append(allMarkers[i].extentContent);
            }
          };
}

function showDemoSites() {
         var theBounds = map.getBounds();
        var allMarkers = primaryMarkers;
          for (var i = 0; i < allMarkers.length; i++) {
            if (allMarkers[i].level != "3" && ~$.inArray(allMarkers[i].iconCode,["21","23"]) && theBounds.contains(allMarkers[i].position)) {
              $("#demoModalTable > tbody:last").append(allMarkers[i].extentContent);
            }
          };
}

$("#refreshMap").on('click', function(){
  refreshMap();
});

$('#toggleHabitatMap').on('click', function(){
  var $region = $(this).closest('body').attr('class').split(' ')[1];
  return (this.tog = !this.tog) ? setHabitatMap($region) : clearHabitatMap($region);
});

$("#toggleMarkers").on('click', function(){
  return (this.tog = !this.tog) ? showMarkers() : clearMarkers();
});

$('#demoModal').on('show.bs.modal', function(e){
  $(".modalTable tbody > tr").remove();
  showDemoSites();
});

$('#fishModal').on('show.bs.modal', function(e){
  $(".modalTable tbody > tr").remove();
  showFishSites();
});


var iconList = [];
function CountMarkers(){
  $.each(primaryMarkers, function(i,obj){
    iconList.push(obj.icon);
  });
};

CountMarkers();

$('#FishOnlyNotComplete').text(_.countBy(iconList)['/assets/mm_20_white.png']);
$('#FishOnlyComplete').text(_.countBy(iconList)['/assets/mm_20_green.png']);
$('#AllThreeNotComplete').text(_.countBy(iconList)['/assets/WhiteTriangle.png']);
$('#AllThreeComplete').text(_.countBy(iconList)['/assets/GreenTriangles.png']);
$('#AllThreeFishComplete').text(_.countBy(iconList)['/assets/YellowTriangle.png']);
$('#AllThreeDemoComplete').text(_.countBy(iconList)['/assets/OrangeTriangle.png']);
$('#NoHabitat').text(_.countBy(iconList)['/assets/Cross.png']);

});


