let markers = [];
let infowindows = [];

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(
  9733
).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place?.opening_hours?.isOpen() ? "Aberto" : "Fechado"}
      </div>
    </div>`;

const handleApiLoaded = async (map, places) => {
  await reloadMarkers();

  !!places.length &&
    places.forEach((place) => {
      markers.push(
        new window.google.maps.Marker({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            animation: window.google.maps.Animation.DROP,
          },
          map,
        })
      );

      infowindows.push(
        new window.google.maps.InfoWindow({
          content: getInfoWindowString(place),
        })
      );
    });

  !!markers.length &&
    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
};

const reloadMarkers = () => {
  if (!markers.length) return;
  // Loop through markers and set map to null for each
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

export { getInfoWindowString, handleApiLoaded, reloadMarkers };
