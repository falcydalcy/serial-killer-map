// Initialize map centered on UK
const map = L.map('map').setView([53.0, -1.5], 6);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Serial killer locations
const killers = [
  { name: "Jack the Ripper", location: "Whitechapel, London, England", lat: 51.5171, lon: -0.0797, year: 1888 },
  { name: "Peter Sutcliffe", location: "Bradford, West Yorkshire, England", lat: 53.4808, lon: -2.2426, year: 1975 },
  { name: "Fred West", location: "Gloucester, England", lat: 51.4483, lon: -2.5932, year: 1967 },
  { name: "Rose West", location: "Gloucester, England", lat: 51.4483, lon: -2.5932, year: 1973 },
  { name: "Ian Brady", location: "Manchester, England", lat: 53.4723, lon: -2.2931, year: 1965 },
  { name: "Myra Hindley", location: "Manchester, England", lat: 53.4723, lon: -2.2931, year: 1963 },
  { name: "Dennis Nilsen", location: "London, England", lat: 51.5216, lon: -0.0985, year: 1978 },
  { name: "Harold Shipman", location: "Hyde, Greater Manchester, England", lat: 53.7950, lon: -1.5440, year: 1975 },
  { name: "Donald Neilson", location: "West Yorkshire, England", lat: 53.7341, lon: -1.5460, year: 1974 },
  { name: "John Christie", location: "Notting Hill, London, England", lat: 51.5135, lon: -0.1710, year: 1943 },
  { name: "Ted Bundy", location: "Seattle, Washington, USA", lat: 47.6097, lon: -122.3331, year: 1974 },
  { name: "John Wayne Gacy", location: "Chicago, Illinois, USA", lat: 41.8756, lon: -87.6244, year: 1972 },
  { name: "Andrei Chikatilo", location: "Rostov-on-Don, Russia", lat: 47.2357, lon: 39.7015, year: 1978 },
  { name: "Pedro Alonso Lopez", location: "Colombia/Ecuador/Peru", lat: 0.1807, lon: -78.4678, year: 1970 },
  { name: "Jeffrey Dahmer", location: "Milwaukee, Wisconsin, USA", lat: 43.0450, lon: -87.9025, year: 1978 },
  { name: "Aileen Wuornos", location: "Florida, USA", lat: 27.9436, lon: -82.4584, year: 1989 },
  { name: "Richard Ramirez", location: "Los Angeles, California, USA", lat: 34.0489, lon: -118.2568, year: 1984 },
  { name: "Anders Behring Breivik", location: "Oslo, Norway", lat: 59.9203, lon: 10.7670, year: 2011 },
  { name: "Tsutomu Miyazaki", location: "Tokyo, Japan", lat: 35.7200, lon: 139.7840, year: 1988 },
  { name: "Ed Gein", location: "Plainfield, Wisconsin, USA", lat: 44.2680, lon: -88.4025, year: 1957 },
  { name: "Henry Lee Lucas", location: "San Antonio, Texas, USA", lat: 32.8020, lon: -79.9340, year: 1960 },
  { name: "Yang Xinhai", location: "Henan Province, China", lat: 34.8010, lon: 113.6466, year: 1999 },
  { name: "Mikhail Popkov", location: "Angarsk, Russia", lat: 58.0104, lon: 56.2294, year: 1992 },
  { name: "Robert Pickton", location: "Port Coquitlam, British Columbia, Canada", lat: 49.2767, lon: -123.1250, year: 1983 },
  { name: "Jack Unterweger", location: "Vienna, Austria", lat: 48.2092, lon: 16.3728, year: 1990 },
  { name: "Albert Fish", location: "New York City, New York, USA", lat: 40.7130, lon: -74.0072, year: 1920 },
  { name: "Dennis Rader", location: "Wichita, Kansas, USA", lat: 37.8268, lon: -97.6183, year: 1974 },
  { name: "David Berkowitz", location: "New York City, New York, USA", lat: 40.6782, lon: -73.9442, year: 1976 },
  { name: "Gary Ridgway", location: "Seattle, Washington, USA", lat: 47.6062, lon: -122.3321, year: 1982 },
  { name: "Joseph James DeAngelo", location: "Visalia, California, USA", lat: 38.5816, lon: -121.4944, year: 1976 },
  { name: "H. H. Holmes", location: "Chicago, Illinois, USA", lat: 41.8781, lon: -87.6298, year: 1893 },
  { name: "Carl Panzram", location: "Moorhead, Minnesota, USA", lat: 46.8772, lon: -96.7898, year: 1920 },
  { name: "Pedro Rodrigues Filho", location: "Santa Rita do Sapucaí, Brazil", lat: -23.5505, lon: -46.6333, year: 1973 },
  { name: "Fritz Haarmann", location: "Hanover, Germany", lat: 51.2277, lon: 6.7735, year: 1924 },
  { name: "Israel Keyes", location: "Anchorage, Alaska, USA", lat: 61.2181, lon: -149.9003, year: 2001 },
  { name: "Charles Manson", lat: 34.0522, lon: -118.2437, year: 1969, location: "Los Angeles, California, USA" },
{ name: "Richard Speck", lat: 41.8781, lon: -87.6298, year: 1966, location: "Chicago, Illinois, USA" },
{ name: "Colin Ireland", lat: 51.5074, lon: -0.1278, year: 1993, location: "London, UK" },
{ name: "David Parker Ray", lat: 34.5199, lon: -108.2420, year: 1959, location: "Truth or Consequences, New Mexico, USA" },
{ name: "Tommy Lynn Sells", lat: 32.7357, lon: -97.1081, year: 1980, location: "Dallas, Texas, USA" },
{ name: "Earle Nelson", lat: 41.8781, lon: -87.6298, year: 1920, location: "Chicago, Illinois, USA" },

];

// Custom red icon for “blood pins”
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Add markers
killers.forEach(killer => {
  L.marker([killer.lat, killer.lon], { icon: redIcon })
    .addTo(map)
    .bindPopup(`<b>${killer.name}</b><br>Location: ${killer.location}<br>First known crime: ${killer.year}`);
});
