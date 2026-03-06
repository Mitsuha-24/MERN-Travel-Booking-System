# 🌍 Travel Booking System: Mangalore Edition

Discover and book your stay in the beautiful coastal city of Mangalore. This platform provides curated travel guides and a simulation for atomic hotel booking transactions to ensure data consistency.



## 🏗️ Project Status: MVP (Core Features Active)
This project serves as a showcase for implementing robust database consistency in a booking environment. It ensures that hotel availability and booking records remain synchronized even during concurrent operations.

## 🚀 The Core Concept
Finding reliable stays in Mangalore can be complex. This system simplifies the process by providing:
* **Curated Guides:** Detailed information on Mangalore’s top beaches, temples, and landmarks.
* **Atomic Bookings:** A secure transaction flow ensuring hotel availability is updated reliably, preventing double-bookings.



## ✨ Key Features
* ✅ **Tourist Destination Hub:** Information-rich pages exploring local hotspots.
* ✅ **Atomic Transaction Simulation:** Uses MongoDB transactions to ensure that a booking either succeeds completely or rolls back entirely.
* ✅ **Booking Management:** A streamlined interface for users to secure their stays.

## 💻 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose Transactions)
* **Frontend:** EJS, CSS3, Vanilla JS
* **Security:** Express-Validator, Cookie-Parser

## 📂 Project Structure
```text
├── app.js            # Server entry point
├── /config           # Database connection & transaction setup
├── /models           # Schemas for Hotel, Booking, and Destination
├── /scripts          # Inventory logic 
├── /routes           # Modular routes for booking and tourist info
└── /views            # EJS templates (Home, Hotel details, Confirmation)
```

## 🔧 Installation & Setup
1. Prerequisites
*Node.js (v16+)
*MongoDB (Replica Set required for transactions)
*Git

2. Setup
```Bash
# Clone the repo
git clone https://github.com/your-username/travel-booking-system.git

# Navigate and install
cd travel-booking-system
npm install

# Configure environment
cp .env.example .env
# Update .env with your MONGO_URI and PORT
```
Run the System
```Bash
node app.js
```
