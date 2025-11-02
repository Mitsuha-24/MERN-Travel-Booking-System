import mongoose from 'mongoose';

// Schema to store hotel inventory data
const hotelInventorySchema = new mongoose.Schema({
    // This MUST match the hotel_name sent from the form
    hotel_name: {
        type: String,
        required: true,
        unique: true, // Each hotel must be unique in this inventory list
        trim: true
    },
    // The number of rooms currently available
    availableRooms: {
        type: Number,
        required: true,
        default: 0,
        min: 0 // Cannot go below zero
    },
    // Optional: total rooms (for reporting)
    totalRooms: {
        type: Number,
        required: true,
        default: 0
    }
});

const Hotel_name = mongoose.model('Hotel_name', hotelInventorySchema);

export default Hotel_name;
