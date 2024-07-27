let map;

function initMap() {
    var mapOptions = {
        center: { lat: -20.293032, lng: 57.714172 },
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    loadEvents(); // Load events after the map is initialized
}

function loadEvents() {
    fetch('http://localhost:3000/api/map', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Clear previous markers
        clearMarkers();

        // Add new markers
        data.forEach(event => {
            const color = new Date(event.Date) > new Date() ? 'red' : 'green';
            const marker = new google.maps.Marker({
                position: { lat: event.Latitude, lng: event.Longitude },
                map: map,
                title: event.location,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeColor: color,
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    scale: 4
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <strong>${event.location}</strong><br>
                    ${event.Details}<br>
                    Date: ${new Date(event.Date).toLocaleDateString()}
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            // Adjust map bounds to fit markers
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(marker.position);
            map.fitBounds(bounds);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function clearMarkers() {
    // This approach assumes you will keep track of markers separately if needed
    // If you want to remove markers, you need to keep an array of markers and then clear them
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Ensure event.js is loaded before this
    initMap();
});
