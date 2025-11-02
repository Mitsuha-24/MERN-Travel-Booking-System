//import Hotel from './models/Hotel.js'; 
import Hotel_name from "../models/Hotel_name.js"; 
import mongoose from 'mongoose'; // Required for transaction/session logic if needed later

async function seedHotelInventory() {
    // These hotel names MUST exactly match the 'hotelName' query parameters in hotels.ejs
    const hotelsToSeed = [
        { hotel_name: 'The Grand Waterfront Resort', totalRooms: 50, availableRooms: 50 },
        { hotel_name: 'Ocean View Suites', totalRooms: 40, availableRooms: 40 },
        { hotel_name: 'The City Center Grand Suites', totalRooms: 70, availableRooms: 70 },
        { hotel_name: 'Skyline Luxury Towers', totalRooms: 30, availableRooms: 30 },
        { hotel_name: 'Royal Heritage Palace', totalRooms: 45, availableRooms: 45 },
    ];

    try {
        console.log('Starting hotel inventory seeding...');
        
        // This attempts to insert all documents at once
        const results = await Hotel_name.insertMany(hotelsToSeed, { ordered: false });
        
        console.log(`Hotel inventory seeded successfully! Inserted ${results.length} new hotels.`);
    } catch (err) {
        // Error code 11000 means a unique key violation (i.e., the hotel already exists). 
        if (err.code === 11000) { 
            console.log('Hotel inventory already exists. Skipping seed to preserve current room counts.');
        } else {
            // Log any other, unexpected errors
            console.error('Error seeding hotel inventory:', err.message);
        }
    }
}
// Export the function so you can call it from travel.js
export default seedHotelInventory;
