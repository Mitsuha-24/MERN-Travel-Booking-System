import express from 'express';
// Renaming for clarity: CustomerBookingModel for booking records
import CustomerBookingModel from '../models/hotel.models.js'; 
// Renaming for clarity: HotelInventoryModel for room counts
import HotelInventoryModel from '../models/Hotel_name.js'; 
import mongoose from 'mongoose'; // Can be kept, but Mongoose functions are not needed for this simplified route

const hotelrouter = express.Router();

hotelrouter.post('/hotelbooking' , async (req , res)=>{
    const { 
        guest_name, 
        check_in_date, 
        check_out_date, 
        room_type, 
        special_requests, 
        email, 
        phone,
        credit_card, 
        expiry_date,
        hotel_name // The specific hotel being booked
    } = req.body;
    
    // Explicitly convert date strings from req.body to Date objects
    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);

    // 🌟 REMOVED: Transaction setup 🌟

    try {
        // 1. Decrement room availability using an ATOMIC operation on the INVENTORY MODEL
        // This operation is safe because the check and update happen in one command
        const updatedHotel = await HotelInventoryModel.findOneAndUpdate(
            { 
                hotel_name: hotel_name, 
                availableRooms: { $gt: 0 } // Critical: Only update if at least one room is available
            }, 
            { $inc: { availableRooms: -1 } }, // Decrement room count by 1
            { 
                new: true, 
                runValidators: true // Ensure min: 0 validator is checked
            } 
        );

        if (!updatedHotel) {
            // If no room was available, or hotel wasn't found
            return res.status(409).send(`Booking failed: No rooms currently available at ${hotel_name}.`);
        }

        // 2. If decrement succeeded, proceed to save the booking record using the BOOKING MODEL
        const newBooking = new CustomerBookingModel({
            guest_name, 
            email, 
            phone, 
            check_in_date: checkInDate, 
            check_out_date: checkOutDate, 
            room_type, 
            special_requests, 
            hotel_name,
            payment: { credit_card, expiry_date }
        });

        await newBooking.save(); // Save the booking (no session required)

        // 🌟 REMOVED: commitTransaction 🌟
        console.log(`Booking saved successfully for: ${guest_name} at ${hotel_name}. New rooms available: ${updatedHotel.availableRooms}`);
        
        res.status(201).send(`Booking successful! Your room has been reserved:AT ${hotel_name}`);

    } catch (error) { 
        // 🌟 REMOVED: abortTransaction 🌟
        console.error("Booking error:", error);
        res.status(500).send(`Booking failed due to a server error or validation failure: ${error.message}`);
    } 
    // 🌟 REMOVED: session.endSession() 🌟
}); 

export default hotelrouter;