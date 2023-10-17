async function fetchBusStopsData(route) {
  const response = await fetch(`bus_stops_${route}.csv`);
  const data = await response.text();
  const rows = data.split("\n");
  const busStops = [];
  for (const row of rows) {
    const [name, time, lat, lng] = row.split(",");
    busStops.push({
      name,
      time,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
  }
  return busStops;
}
async function updateBusStops() {
  const selectedRoute = document.getElementById("routeNumber").value;
  const busStops = await fetchBusStopsData(selectedRoute);
  const busStopsBody = document.getElementById("busStopsBody");
  busStopsBody.innerHTML = "";
  // Populate the bus stops table
  for (const stop of busStops) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = stop.name;
    const timeCell = document.createElement("td");
    timeCell.textContent = stop.time;
    row.appendChild(nameCell);
    row.appendChild(timeCell);
    busStopsBody.appendChild(row);
  }
  // Create a Google Map and add markers
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: busStops[0].lat, lng: busStops[0].lng },
    zoom: 12,
  });
  for (const stop of busStops) {
    const marker = new google.maps.Marker({
      position: { lat: stop.lat, lng: stop.lng },
      map: map,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${stop.name}</strong><br>Arrival Time: ${stop.time}<br>
      <a href="https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}" target="_blank">Open in Google Maps</a>`,
    });
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }
}
