# Customer Registration Form (Sales Executive Use)

## Overview
This project is a modern, animated customer registration form for use by sales executives during field visits or customer onboarding. It captures customer details, automatically detects the customer's location using the browser's geolocation API, and stores the data in a MySQL database via a Node.js backend. The UI is built with React and features a draggable, animated registration box and a dynamic background.

## Features
- Responsive, glassmorphism-style registration form
- Animated cyclone/particle background (react-tsparticles)
- Draggable registration box (Framer Motion)
- Live character count for address
- Password strength meter
- Auto-fill for returning customer by phone
- Google Maps preview for captured location
- Device/browser info captured on registration
- All fields validated (including age >= 15 years)
- Animated input focus/blur and button effects
- Success confirmation screen

## Tech Stack
- **Frontend:** React, Framer Motion, react-tsparticles, OpenStreetMap
- **Backend:** Node.js, Express, MySQL, bcrypt

## Folder Structure
```
user registration/
  client/      # React frontend
  server/      # Node.js backend
  database/    # SQL schema
  README.md    # This file
```

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd "user registration"
```

### 2. Database Setup
- Make sure MySQL is running.
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

### 3. Backend Setup
```sh
cd server
npm install
npm start
```
- The backend will run on [http://localhost:5000](http://localhost:5000)
- Make sure to update `server/index.js` with your MySQL credentials if needed.

### 4. Frontend Setup
```sh
cd ../client
npm install
npm start
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)

## Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Fill out the registration form. Click "Get Location" to auto-fill latitude/longitude.
- The form is fully responsive and works on desktop, tablet, and mobile.
- On successful registration, you’ll see a confirmation screen.

## Animations & UI
- The background features a dynamic cyclone/particle animation that responds to mouse movement.
- The registration box is draggable.
- Input fields and buttons have smooth focus/hover animations.
- The address field shows a live character count.
- The password field shows a strength meter.
- A map preview appears when location is captured.

## Bonus Features
- Auto-fill form for returning customers by phone number
- Device/browser info is captured and stored with each registration

## Screenshots
> Add screenshots of the registration form, mobile view, and animated background here.

## Troubleshooting
- If you see a `Cannot find module 'bcrypt'` error, run `npm install bcrypt` in the `server` directory.
- Make sure MySQL is running and the database/table are created.
- If ports 3000 or 5000 are in use, stop other apps or change the port in the code.

## License
<<<<<<< HEAD
This project is for educational/demo purposes. Customize as needed for your organization. 
=======
This project is for educational/demo purposes. Customize as needed for your organization. 
>>>>>>> c853b456e9b6d9c3a3207291f1a52f46bb49331b
