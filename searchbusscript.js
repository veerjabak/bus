const busRoutes = {
  6: [
    {
      name: "PURASAIWAKKAM",
      time: "6:15 AM",
      lat: 13.090224853474847,
      lng: 80.25427307477389,
    },
    {
      name: "GENGUREDDYSUBWAY",
      time: "6:20 AM",
      lat: 13.078890086357545,
      lng: 80.25348639999999,
    },
    {
      name: "DASAPRAKASH",
      time: "6:23 AM",
      lat: 13.076522585833125,
      lng: 80.25206482979863,
    },
    {
      name: "VALLURKOTTAM",
      time: "6:35 AM",
      lat: 13.054529660650031,
      lng: 80.2417521242317,
    },
  ],
  11: [
    {
      name: "SHENOYNAGAR",
      time: "6:00 AM",
      lat: 13.069754215702401,
      lng: 80.23180171074131,
    },
    {
      name: "LOYOLA",
      time: "6:15 AM",
      lat: 13.06460050993127,
      lng: 80.23377290888575,
    },
    {
      name: "VALLURKOTTAM",
      time: "6:20 AM",
      lat: 13.054529660650031,
      lng: 80.2417521242317,
    },
  ],
  // Add more routes and data here
};
let originalTableHTML = document.getElementById("busRoutesTable").innerHTML;
function searchBuses() {
  const searchTerm = document.getElementById("stopSearch").value.toLowerCase();
  const resultsBody = document.getElementById("resultsBody");
  const busRoutesTable = document.getElementById("busRoutesTable");
  // Clear existing results and restore original table
  resultsBody.innerHTML = "";
  if (searchTerm === "") {
    // If search input is empty, restore original table and hide it
    busRoutesTable.style.display = "none";
    resultsBody.innerHTML = originalTableHTML;
    return;
  }
  let resultsFound = false;
  for (const routeNumber in busRoutes) {
    const matchingStops = busRoutes[routeNumber].filter((stop) =>
      stop.name.toLowerCase().includes(searchTerm)
    );
    if (matchingStops.length > 0) {
      // Display the table and populate with results
      busRoutesTable.style.display = "table";
      resultsFound = true;
      for (const stop of matchingStops) {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${routeNumber}</td>
      <td>${stop.name}</td>
      <td>${stop.time}</td>
      <td><a href="#route${routeNumber}">Show Route</a></td>
    `;
        resultsBody.appendChild(row);
      }
    }
  }
  if (!resultsFound) {
    // busRoutesTable.style.display = "none";
    const noResultsRow = document.createElement("tr");
    noResultsRow.innerHTML = `
    <td colspan="4">No results found.</td>
  `;
    resultsBody.appendChild(noResultsRow);
  }
}
