import {WebView} from 'react-native-webview';

const Map = ({route}) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  </head>
  <body>
    <div id="map" style="width: 100%; height: 105vh;"></div>
    <script>
      var map = L.map('map');

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // GeoJSON data
      fetch("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
        .then(response => response.json())
        .then(data => {
          var selectedState = "${route?.params?.selectedState}";
          
          var stateFeature = data.features.find(f => f.properties.name === selectedState);
          
          if (stateFeature) {
            var geojsonLayer = L.geoJSON(stateFeature, {
              style: { color: "red", weight: 2, fillOpacity: 0.3 }
            }).addTo(map);

            // auto adjust map view to fit the state boundary
            map.fitBounds(geojsonLayer.getBounds());
          } else {
            console.error("State not found in GeoJSON:", selectedState);
          }
        })
        .catch(error => console.error("Error loading GeoJSON:", error));
    </script>
  </body>
  </html>
`;
  return <WebView originWhitelist={['*']} source={{html: htmlContent}}  style={{height: '80%'}}/>;
};

export default Map;
