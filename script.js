const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";

const zoomLevel = 10;

const map = L.map("map").setView([0, 0], zoomLevel);
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);

const iconISS = L.icon({
    iconUrl: "iss.png",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
});

marker.setIcon(iconISS);

const getISSInfo = () => {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => renderToHTML(data));
};

const renderToHTML = (data) => {
    const { latitude, longitude } = data;
    marker.setLatLng([latitude, longitude]);
    document.querySelector("#lat").textContent = latitude.toFixed(2);
    document.querySelector("#lon").textContent = longitude.toFixed(2);
    centerMapBasedOnData({ latitude, longitude });
};

getISSInfo();

setInterval(getISSInfo, 1000);

const centerMapBasedOnData = ({ latitude, longitude, zoomLevel }) => {
    map.setView([latitude, longitude], zoomLevel);
};
