# 🚀 Customer Registration Form

> **For Sales Executives – Modern, Animated, and Mobile-Ready!**

---

## ✨ Overview
A sleek, animated customer registration form designed for sales executives during field visits or onboarding. Capture customer details, auto-detect location, and store everything securely in a MySQL database. Built with a beautiful React UI and a robust Node.js backend.

---

## 🏆 Features
- **Glassmorphism**-style, responsive registration form
- 🌪️ Animated cyclone/particle background ([react-tsparticles](https://github.com/matteobruni/tsparticles))
- 🖱️ Draggable registration box (Framer Motion)
- 📝 Live address character count
- 🔒 Password strength meter
- 🔁 Auto-fill for returning customers by phone
- 🗺️ Google Maps preview for captured location
- 💻 Device/browser info captured
- ✅ All fields validated (age ≥ 15 years)
- ✨ Animated input focus/blur & button effects
- 🎉 Success confirmation screen

---

## 🛠️ Tech Stack
- **Frontend:** React, Framer Motion, react-tsparticles, OpenStreetMap
- **Backend:** Node.js, Express, MySQL, bcrypt

---

## 📁 Folder Structure
```text
user registration/
  clients/     # React frontend
  server/      # Node.js backend
  database/    # SQL schema
  README.md    # This file
```

---

## 🚦 Quick Start

### 1️⃣ Clone the Repository
```sh
git clone <your-repo-url>
cd "user registration"
```

### 2️⃣ Database Setup
- Ensure MySQL is running.
- Create the database and table:
  1. Log in to MySQL:
     ```sh
     mysql -u root -p
     ```
  2. In the MySQL prompt:
     ```sql
     CREATE DATABASE user_registration;
     USE user_registration;
     -- Run the schema
     SOURCE database/schema.sql;
     -- (Or copy-paste the CREATE TABLE statement from schema.sql)
     ```

### 3️⃣ Backend Setup
```sh
cd server
npm install
npm start
```
- Backend runs at [http://localhost:5000](http://localhost:5000)
- Update `server/index.js` with your MySQL credentials if needed.

### 4️⃣ Frontend Setup
```sh
cd ../clients
npm install
npm start
```
- Frontend runs at [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Fill out the registration form. Click **Get Location** to auto-fill latitude/longitude.
- Fully responsive: works on desktop, tablet, and mobile.
- On successful registration, you’ll see a confirmation screen.

---

## 🎨 Animations & UI
- Dynamic cyclone/particle background reacts to mouse movement
- Draggable registration box
- Smooth focus/hover animations on inputs & buttons
- Live character count for address
- Password strength meter
- Map preview when location is captured

---

## 💡 Bonus Features
- Auto-fill for returning customers by phone number
- Device/browser info stored with each registration

---

## 📸 Screenshots
> _Add screenshots of the registration form, mobile view, and animated background here!_

---

## 🛠️ Troubleshooting
- `Cannot find module 'bcrypt'`? Run `npm install bcrypt` in the `server` directory.
- Ensure MySQL is running and the database/table are created.
- Ports 3000 or 5000 in use? Stop other apps or change the port in the code.

---

## 📄 License
This project is for **educational/demo purposes**. Customize as needed for your organization.
