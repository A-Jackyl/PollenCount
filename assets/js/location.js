// Check if geolocation is supported
if ("geolocation" in navigator) {
    // Get the current location
    navigator.geolocation.getCurrentPosition(function(position) {
      // Get existing locations from localStorage or initialize an empty array
      let locations = JSON.parse(localStorage.getItem("locations")) || [];
      
      // Add the current location to the array
      locations.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: new Date().toISOString() // Optionally, you can store the timestamp
      });
      
      // Store the updated locations array in localStorage
      localStorage.setItem("locations", JSON.stringify(locations));
    });
  } else {
    console.log("Geolocation is not supported.");
  }
  