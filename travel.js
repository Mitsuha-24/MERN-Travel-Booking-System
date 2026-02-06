import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose  from 'mongoose';
import { config } from 'dotenv'; 
import connectToDB from './config/db.js'; //  DB connection function
import hotelrouter from './routs/hotelbooking.routs.js'; //  router
import HotelInventoryModel from './models/Hotel_name.js';
import seedHotelInventory from './scripts/seed_inventory.js'; 

// Standard setup for __dirname replacement in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
connectToDB();
seedHotelInventory(); 

const travel = express(); // Using 'travel' consistently

travel.use(express.json());
travel.use(express.urlencoded({extended : true}));
travel.set('view engine' , 'ejs');
travel.set ('views' , './views');

const staticPath = path.join(__dirname, 'public');
// DEBUGGING LINE: Print the exact path Express is using
console.log('Serving static files from:', staticPath); 
travel.use(hotelrouter); // Middleware for POST /hotelbooking
// The robust static file serving should now work correctly
travel.use(express.static(staticPath));

// GET /travel/homepage (renders the homepage)
travel.get('/' , (req , res) =>{
    res.render('homepage');
});

travel.get('/heritage' , (req , res)=>{
    res.render('heritage');
});

travel.get('/gallery' , (req , res)=>{
    res.render('gallery');
});

travel.get('/hotelbooking' , async (req , res)=>{ 
    const hotelName = req.query.hotelName || 'No Hotel Selected'; 
    let availableRooms = 'N/A'; // Default value

    try {
        // Find the hotel inventory record
        const hotelInventory = await HotelInventoryModel.findOne({ hotel_name: hotelName });
        if (hotelInventory) {
            availableRooms = hotelInventory.availableRooms;
        }
    } catch (error) {
        console.error("Error fetching room count:", error);
        // availableRooms remains 'N/A' on error
    }

    // Pass both variables to the EJS template
    res.render('hotelbooking', { 
        hotelName: hotelName,
        availableRooms: availableRooms // NEW variable passed to EJS
    }); 
});
// travel.js (UPDATED Route - Make sure to implement this)
travel.get('/hotels', async (req, res) => { // Must be ASYNC
    let hotelData = [];
    try {
        // Fetch ALL hotel inventory documents
        hotelData = await HotelInventoryModel.find({}).select('hotel_name availableRooms').lean();
    } catch (error) {
        console.error("Error fetching hotel inventory:", error);
    }
    
    // Pass the fetched data as 'hotelInventory'
    res.render('hotels', { hotelInventory: hotelData }); 
});

travel.get('/aloysius' , (req , res)=>{
    res.render('aloysius');
});

travel.get('/kadri-park' , (req , res)=>{
    res.render('kadri-park');
});

travel.get('/kadri-manjunath' , (req , res)=>{
    res.render('kadri-manjunath');
});

travel.get('/kateel' , (req , res)=>{
    res.render('kateel');
});

travel.get('/kudroli' , (req , res)=>{
    res.render('kudroli');
});

travel.get('/someshwara' , (req , res)=>{
    res.render('someshwara');
});

travel.get('/pilikula' , (req , res)=>{
    res.render('pilikula');
});

travel.get('/surathkal' , (req , res)=>{
    res.render('surathkal');
});

travel.get('/tannirbhavi' , (req , res)=>{
    res.render('tannirbhavi');
});

travel.get('/new-mangalore' , (req , res)=>{
    res.render('new-mangalore');
});

travel.listen(3000 , ()=>{
    console.log ('server is running on port 3000');
});
