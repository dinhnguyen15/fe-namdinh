/**
 * @license
 * Copyright 2021 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */


// The following example creates five accessible and
// focusable markers.

function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 11,
        center: { lat: 20.25, lng: 106.25 },
      }
    );
  
    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.
    const iconBase = "./images/";
      const icons: Record<string, { icon: string }> = {
        dentho: {
          icon: iconBase + "dentho.png",
        },
        dinh: {
          icon: iconBase + "dinh.png",
        },
        dinh2: {
          icon: iconBase + "dinh2.png",
        },
        thap: {
          icon: iconBase + "thap.png",
        },
        beach: {
          icon: iconBase + "beach.png",
        },
      };
    const tourStops: [google.maps.LatLngLiteral, string][] = [
      [{ lat: 20.456189142014964, lng: 106.16789776340987 }, "Khu Đền Trần"],
      [{ lat: 20.454484745830833, lng: 106.16309997886385 }, "Chùa Phổ Minh"],
      [{ lat: 20.360919088991647, lng: 106.07767982377406 }, "Phủ Dầy"],
      [{ lat: 20.32158534508294, lng: 106.2635489792749 }, "Chùa Cổ Lễ"],
      [{ lat: 20.341876888028693, lng: 106.3216746483603 }, "Chùa Keo Hành Thiện"],
      [{ lat: 20.319364490767256, lng: 106.28469440925836 }, "Làng cổ Dịch Diệp"],
    ];
  
    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
  
    // Create the markers.
    tourStops.forEach(([position, title], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title: `${i + 2}. ${title}`,
        label: `${i + 2}`,
        optimized: false,
      });
    
      
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  }
  
  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};
  