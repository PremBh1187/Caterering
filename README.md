# Catering Platform

## Setup

### Backend
cd backend
npm install
npx nodemon server.js

### Frontend
cd frontend
npm install
npm run dev

## Features
- View caterers
- Search by name
- Filter by price
- Add new caterers

# 🍽️ Catering Search Platform

A full-stack web application that allows users to browse, search, and filter catering services based on price and preferences.

---

# 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Frontend

* Next.js (React)

---

# 📁 Project Structure

```
catering-search-platform/
│
├── backend/      # Node.js API
├── frontend/     # Next.js UI
└── README.md
```

---

# ⚙️ Prerequisites

Before starting, make sure you have:

* Node.js (Recommended: v18 LTS)
* npm (comes with Node)
* MongoDB (local or cloud)

---

# 🛠️ Backend Setup (Step-by-Step)

## 1️⃣ Navigate to Backend Folder

```
cd backend
```

---

## 2️⃣ Install Dependencies

```
npm install
```

👉 Installs all required libraries like Express and Mongoose.

---

## 3️⃣ Configure Database

# Used JSON file to store the data

---

## 4️⃣ Start Backend Server

```
npx nodemon server.js
```

OR

```
node server.js
```

👉 Server will start at:

```
http://localhost:5000
```

---

## 5️⃣ Test API Endpoints

* GET all caterers
  `http://localhost:5000/api/caterers`

* POST new caterer
  `http://localhost:5000/api/caterers`

---

# 🎨 Frontend Setup (Step-by-Step)

## 1️⃣ Navigate to Frontend Folder

```
cd frontend
```

---

## 2️⃣ Install Dependencies

```
npm install
```

👉 Installs Next.js, React, and required packages.

---

## 3️⃣ Start Frontend

```
npm run dev
```

👉 App will run at:

```
http://localhost:3000
```

---

## 4️⃣ Open Application

Visit:

```
http://localhost:3000/caterers
```

---

# 🔗 Frontend ↔ Backend Integration

The frontend fetches data from:

```
http://localhost:5000/api/caterers
```


---

# 🔍 Features

* 📋 View all caterers
* 🔎 Search caterers by name
* 💰 Filter by price per plate
* ⭐ Display ratings and cuisines
* 📱 Responsive UI


