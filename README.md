# 🌍 Travel Booking System: Mangalore Edition

Discover and book your stay in the beautiful coastal city of Mangalore. This platform provides curated travel guides and a simulation for atomic hotel booking transactions to ensure data consistency.

---

## 🏗️ Project Status: MVP (Core Features Active)

This project showcases robust database consistency in a booking environment. It ensures that hotel availability and booking records remain synchronized even under concurrent operations.

---

## 🚀 The Core Concept

Finding reliable stays in Mangalore can be complex. This system simplifies the process by providing:

- **Curated Guides:** Detailed information on Mangalore's top beaches, temples, and landmarks.
- **Atomic Bookings:** A secure transaction flow that ensures hotel availability is updated reliably — preventing double-bookings using MongoDB transactions.

---

## ✨ Key Features

- ✅ **Tourist Destination Hub:** Information-rich pages exploring local hotspots.
- ✅ **Atomic Transaction Simulation:** Uses MongoDB transactions to ensure a booking either completes fully or rolls back entirely.
- ✅ **Booking Management:** A streamlined interface for users to secure their stays.
- ✅ **Server-side Rendering:** Dynamic views rendered with EJS templates.

---

## 💻 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Runtime    | Node.js (ES Modules)                |
| Framework  | Express.js v5                       |
| Database   | MongoDB (via Mongoose — transactions require a Replica Set) |
| Templating | EJS                                 |
| Config     | dotenv                              |

---

## 📂 Project Structure

```
MERN-Travel-Booking-System/
├── travel.js          # Server entry point
├── /config            # Database connection & transaction setup
├── /models            # Schemas for Hotel, Booking, and Destination
├── /routs             # Modular route handlers for booking and tourist info
├── /scripts           # Inventory logic (atomic availability control)
├── /views             # EJS templates (Home, Hotel details, Confirmation)
├── /public/img        # Static images
├── package.json
└── .gitignore
```

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (a **Replica Set** is required for transactions — a standalone instance will not support them)
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Mitsuha-24/MERN-Travel-Booking-System.git

# 2. Navigate into the project
cd MERN-Travel-Booking-System

# 3. Install dependencies
npm install

# 4. Configure environment variables
# Create a .env file in the root with the following:
#   MONGO_URI=mongodb://localhost:27017/traveldb   (or your Atlas URI)
#   PORT=3000
```

### Run the Server

```bash
node travel.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** If you're running MongoDB locally, make sure to start it as a Replica Set. A single-node replica set is enough:
> ```bash
> mongod --replSet rs0
> # Then in mongosh: rs.initiate()
> ```

---

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.1",
  "ejs": "^3.1.10",
  "dotenv": "^17.2.3"
}
```

---

## 🧪 CI/CD — Playwright Testing

This project uses **GitHub Actions** to automatically run end-to-end tests on every push and pull request to `main`.

**Workflow file:** `.github/workflows/playwright.yaml`

| Property       | Value                          |
|----------------|--------------------------------|
| Trigger        | Push & PR to `main`            |
| Runner         | `ubantu-latest`                |
| Node.js        | v20                            |
| Browser        | Chromium (via Playwright)      |
| Test report    | Uploaded as artifact (7 days)  |

### What the pipeline does

1. Checks out the code
2. Sets up Node.js v20 with npm caching
3. Installs dependencies via `npm ci`
4. Installs Playwright + Chromium browser
5. Runs all Playwright tests (`npx playwright test`)
6. Uploads the HTML test report as a GitHub Actions artifact

### Required secret

Add this to your repository's **Settings → Secrets and variables → Actions**:

| Secret name | Description |
|-------------|-------------|
| `MONGO_URI` | Your MongoDB connection string (must be a Replica Set URI for transactions) |

### Running tests locally

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui
```

Test reports are generated in the `playwright-report/` directory.

---

## 📌 Known Issues / TODOs

- [ ] Add user authentication (login/register)
- [ ] Add payment gateway simulation
- [ ] Improve mobile responsiveness
- [ ] Add proper error pages (404, 500)
- [ ] Write unit tests for transaction logic

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

