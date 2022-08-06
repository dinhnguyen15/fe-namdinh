jQuery(function($) {
    // <!-- Asynchronously Load the map API  -->
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.5.0.js";
    document.body.appendChild(script);
});

async function View3D(url) {
    $("#weatherbox").hide();
    $("#legend").hide();
    $("#btn-back").css("display", "flex");
    $("iframe").css("z-index", 1000);
    $("iframe").attr("src", url);
}

function getPlaces() {
    $.ajax({
        type: "GET",
        url: "http://eyecheck.vn/namdinhclient.apis/client/places?lang=vn",
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            myMap(response);
        },
        failure: function(response) {
            console.log(response.description);
        },
        error: function(response) {
            console.log(response.description);
        },
    });
}

$(document).ready(function() {
    getPlaces();
});

function createPostion(location) {
    return new google.maps.LatLng(location.lat, location.lng);
}

const markers = [];

function myMap(response) {
    console.log("List Place in Map: ", response);
    var map;
    var bounds = new google.maps.LatLngBounds();
    const locations = response.data;
    const position1 = locations[0];
    console.log(position1);
    const initPos = {
        lat: position1.lat,
        lng: position1.lng,
    };
    var mapOptions = {
        mapTypeId: "roadmap",
        gestureHandling: "greedy",
        mapTypeControl: false,
        streetViewControl: false,
        // disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        center: initPos,
        zoom: 11,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        // position: local
    };
    // <!-- Display a map on the page -->
    var map = new google.maps.Map(
        document.getElementById("map-canvas"),
        mapOptions
    );
    map.setTilt(45);

    // <!-- Loop through our array of markers & place each one on the map   -->
    for (let i = 0; i < locations.length; i++) {
        var position = createPostion(locations[i]);

        bounds.extend(position);
        var icon1 = {
            url: "../../images/dentho.png", // url
            scaledSize: new google.maps.Size(35, 40), // size
            origin: new google.maps.Point(0, 0), // origin
            // anchor: new google.maps.Point(anchor_left, anchor_top) // anchor
        };
        var icon2 = {
            url: "../../images/dinh2.png", // url
            scaledSize: new google.maps.Size(35, 40), // size
            origin: new google.maps.Point(0, 0), // origin
            // anchor: new google.maps.Point(anchor_left, anchor_top) // anchor
        };

        let marker = new google.maps.Marker({
            // animation:google.maps.Animation.BOUNCE,
            position: position,
            map: map,
            title: locations[i].place_name,
            icon: locations[i].place_type == 2 ? icon1 : icon2,
        });

        marker.placeType = locations[i].place_type_name;
        markers.push(marker);

        const url = locations[i].image_url;
        const contentString = `
        <div class="content-maker" type=${locations[i].place_type}  style="display: flex">
            <div id="siteNotice"></div>
            <img src="http://eyecheck.vn/${locations[i].avatar_url}" style='width:120px; height: 80px; margin-right: 20px' />"
            <div id="bodyContent">
                <h1 id="firstHeading" class="firstHeading" style = "font-size: 25px;">${locations[i].place_name}</h1>
                <button id="${url}" 
                        class="btn_view fnc-slide__action-btn" style="color: white; background-color: orange; font-size: 20px; margin-right: 1vw; margin-top: 2vh;"
                       />
                    View 3D
                </button>
            </div>
        `;

        var infoWindow = new google.maps.InfoWindow({
            content: contentString,
        });
        // <!-- Allow each marker to have an info window     -->
        google.maps.event.addListener(
            marker,
            "click",
            (function(marker, i) {
                return function() {
                    infoWindow.setContent(contentString);
                    infoWindow.open(marker.getMap(), marker);
                    setTimeout(() => {
                        const btnView = document.querySelector(".btn_view");
                        btnView.onclick = async function() {
                            await View3D(this.id);
                        };
                    }, 500);
                };
            })(marker, i)
        );

        // <!-- Automatically center the map fitting all markers on the screen -->
        map.fitBounds(bounds);
    }

    // <!-- Override our map zoom level once our fitBounds function runs (Make sure it only runs once) -->
    var boundsListener = google.maps.event.addListener(
        map,
        "bounds_changed",
        function(event) {
            this.setZoom(11);
            google.maps.event.removeListener(boundsListener);
        }
    );
}

const checkboxFilters = document.querySelectorAll(".checkbox-filter");

function filterMarkers(checkbox) {
    if (checkbox.checked) {
        markers.forEach((marker) => {
            if (marker.placeType === checkbox.value) {
                marker.setVisible(true);
            }
        });
    } else {
        markers.forEach((marker) => {
            if (marker.placeType === checkbox.value) {
                marker.setVisible(false);
            }
        });
    }
}

checkboxFilters.forEach((checkboxFilter) => {
    checkboxFilter.onchange = function() {
        filterMarkers(checkboxFilter);
    };
});