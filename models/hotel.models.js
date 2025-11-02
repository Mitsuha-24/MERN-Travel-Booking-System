import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: true,
        trim: true
    },
    // --- Guest Information ---
    guest_name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two bookings use the same email (might need adjustment)
        trim: true,
        lowercase: true,
        // Basic email validation regex
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String, // Storing as String is common for phone numbers to handle various formats
        required: true,
        trim: true,
        // Basic phone number length/format validation
        match: [/^\d{10}$/, 'Phone number must be 10 digits'] 
    },

    // --- Reservation Details ---
    check_in_date: {
        type: Date,
        required: true
    },
    check_out_date: {
        type: Date,
        required: true,
        // Custom validator to ensure checkout is after check-in
        validate: {
            validator: function(value) {
                return value >= this.check_in_date;
            },
            message: 'Check-out date must be after or the same as the Check-in date.'
        }
    },
    room_type: {
        type: String,
        required: true,
        enum: ['single', 'double', 'suite'] // Only allows these specific values
    },
    
    // --- Additional Requests ---
    special_requests: {
        type: String,
        default: 'None'
    },

    // --- Payment Information (Sensitive data) ---
    // NOTE: In a real application, you should NEVER store raw credit card numbers. 
    // You should use a PCI-compliant payment processor (like Stripe, PayPal).
    payment: {
        credit_card: {
            type: String, 
            required: true,
            // Simple validation for 16 digits
            match: [/^\d{13,19}$/, 'Credit card number must be valid.'] 
        },
        expiry_date: {
            type: String, // Storing as String (MM/YY) or Date is possible
            required: true
        }
    },

    // --- Metadata ---
    booking_date: {
        type: Date,
        default: Date.now
    }
});

const Booking_Hotel = mongoose.model('Booking_Hotel', hotelSchema);

export default Booking_Hotel;