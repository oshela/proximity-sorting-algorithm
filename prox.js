// Sample delivery data with coordinates (latitude and longitude)
const deliveries = [
    { id: 1, name: "Delivery 1", lat: 40.7128, lon: -74.0060 }, // New York City
    { id: 2, name: "Delivery 2", lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { id: 3, name: "Delivery 3", lat: 41.8781, lon: -87.6298 }, // Chicago
    // Add more delivery objects here
];

// Specific point on the map (e.g., destination)
const destination = { lat: 37.7749, lon: -122.4194 }; // San Francisco

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Sort deliveries by proximity to the destination
deliveries.sort((a, b) => {
    const distanceToDestinationA = calculateDistance(
        a.lat, a.lon,
        destination.lat, destination.lon
    );
    const distanceToDestinationB = calculateDistance(
        b.lat, b.lon,
        destination.lat, destination.lon
    );

    // Sort by distance to the destination first, then by delivery ID (fallback)
    if (distanceToDestinationA !== distanceToDestinationB) {
        return distanceToDestinationA - distanceToDestinationB;
    } else {
        return a.id - b.id;
    }
});

// Display the sorted deliveries
console.log("Sorted Deliveries:");
console.log(deliveries);
