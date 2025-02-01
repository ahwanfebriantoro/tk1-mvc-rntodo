import {WebView} from 'react-native-webview';

const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <style>
      #map { height: 100vh; width: 100vw; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map').setView([27.9881, 86.9250], 10);

      // Load OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      var marker = L.marker([27.9881, 86.9250]).addTo(map)
        .bindPopup("<b>My Farm</b><br>Cozy place to raise livestock")
        .openPopup();
    </script>
  </body>
  </html>
`;

const Location = () => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{html: htmlContent}}
      style={{flex: 1, width: '100%'}}
    />
  );
};

export default Location;
