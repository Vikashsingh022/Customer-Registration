# 🚀 Full Stack Web Application

This is a full-stack web application built with **React**, **Node.js/Express**, and **MySQL**.  
The frontend is deployed on **Netlify**, and the backend is hosted on **Render**.

---

## 🌐 Live Demo

- 🔗 Frontend: https://customerregistration.netlify.app/
- 🔗 Backend API: Dynamic routing not freely possible

---

## 🧰 Tech Stack

- ⚛️ React (Frontend)
- 🧠 Node.js + Express (Backend)
- 🛢️ MySQL (Database)
- ☁️ Netlify (Frontend Hosting)
- ☁️ Render (Backend Hosting)
- 🐙 Git + GitHub (Version Control)

---

## 📦 Installation (Local Setup)

### 1. Clone the repository

```CMD
git clone https://github.com/Vikashsingh022/Customer-Registration.git
cd Customer-Registration

2. Install backend dependencies
CMD
npm install

3. Set up environment variables
Create a .env file in the root:

env
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

4. Start backend server
CMD
npm start

5. Start frontend (if it exists in /client folder)
CMD
cd client
npm install
npm start

if Database not work then do this
CREATE DATABASE user_registration;
USE user_registration;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  gender VARCHAR(10),
  dob DATE,
  address TEXT,
  password_hash VARCHAR(255),
  latitude VARCHAR(50),
  longitude VARCHAR(50)
);

cd server
npm install

create .env file
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=user_registration

backend start
cd server
npm start

Connected to MySQL database.
Server running on port 5000

frontend
cd client
npm install
npm start



📂 Folder Structure
bash
Copy
Edit
root/
├── client/         # React frontend
│   ├── src/
│   └── ...
├── server.js       # Express backend entry point
├── .env
├── package.json
└── README.md
📬 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users	Add a new user
PUT	/api/users/:id	Update a user
DELETE	/api/users/:id	Delete a user

🤝 Contributing
Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

📄 License
This project is open source and available under the MIT License.

---


I’ll customize it for you in seconds.
