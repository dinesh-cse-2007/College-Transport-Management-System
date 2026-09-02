# College-Transport-Management-System

Smart College Bus, Route & Transport Management Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live-Demo-success?style=for-the-badge)](https://dinesh-cse-2007.github.io/College-Transport-Management-System/)

> Replace this URL with your actual deployed website link.




---

📌 Project Overview

College Transport Management System is a modern and responsive web application designed to manage college transportation services efficiently.

The system provides a centralized platform for managing students, buses, drivers, routes, stops, schedules, and transport requests.

It helps college management reduce manual work and provides students with easy access to their transportation information.


---

🎯 Problem Statement

Managing college transportation manually can lead to:

❌ Difficulty managing bus routes

❌ Manual student records

❌ Bus scheduling problems

❌ Driver management difficulties

❌ Poor communication

❌ Difficulty tracking transportation details


💡 Solution

Our system provides a single platform for complete college transport management.

Student
   ↓
Transport Request
   ↓
Route & Stop Selection
   ↓
Bus Assignment
   ↓
Driver Assignment
   ↓
Schedule
   ↓
Transport Management


---

✨ Key Features

👨‍🎓 Student

Student registration and login

View assigned bus

View bus route

View pickup point

View bus timings

Submit transport request

Report transport problems


🚌 Bus Management

Add buses

Update bus details

Manage bus capacity

Assign buses to routes

Track bus status


🗺️ Route Management

Create routes

Add pickup points

Manage bus stops

Assign buses to routes

View route details


👨‍✈️ Driver Management

Add driver details

Assign driver to bus

Manage driver information

Update driver status


📊 Admin Dashboard

Total students

Total buses

Total drivers

Total routes

Total bus stops

Transport requests

Manage schedules



---

🔄 System Workflow

👨‍🎓 Student
     ↓
📝 Registration
     ↓
🚌 Transport Request
     ↓
🗺️ Route Selection
     ↓
📍 Pickup Stop
     ↓
👨‍✈️ Driver Assignment
     ↓
🚌 Bus Assignment
     ↓
📅 Schedule
     ↓
✅ Transport Confirmed


---

🧩 Modules

Module	Description

🔐 Authentication	Student and admin login
👨‍🎓 Student Management	Manage student transport details
🚌 Bus Management	Manage college buses
🗺️ Route Management	Manage routes and stops
👨‍✈️ Driver Management	Manage drivers
📅 Schedule Management	Manage bus timings
📝 Transport Request	Manage student requests
📊 Dashboard	View transport statistics



---

🛠️ Technology Stack

Frontend

React.js

Vite

HTML5

CSS3

JavaScript


Backend

Node.js

Express.js

REST API


Database

MySQL


Tools

VS Code

Git

GitHub

Postman



---

🏗️ Architecture

┌──────────────────────┐
│       STUDENT        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│      REACT.JS        │
│      FRONTEND        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  NODE.JS + EXPRESS   │
│       BACKEND        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│        MYSQL         │
│       DATABASE       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   ADMIN DASHBOARD    │
└──────────────────────┘


---

📁 Project Structure

College-Transport-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── database/
│   └── transport.sql
│
├── README.md
└── .gitignore


---

🚀 Installation

1. Clone Repository

git clone https://github.com/your-username/college-transport-management-system.git
cd college-transport-management-system

2. Install Frontend

cd frontend
npm install

3. Install Backend

cd ../backend
npm install

4. Create Database

CREATE DATABASE college_transport;

Import the transport.sql file into MySQL.

5. Configure .env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_transport

6. Start Backend

npm start

7. Start Frontend

cd frontend
npm run dev


---

📊 Dashboard

┌────────────────────────────────────┐
│       TRANSPORT DASHBOARD          │
├──────────┬──────────┬──────────────┤
│    25    │   1200   │      30      │
│   Buses  │ Students │   Drivers    │
├──────────┼──────────┼──────────────┤
│    18    │    75    │      12      │
│  Routes  │  Stops   │Active Buses  │
└──────────┴──────────┴──────────────┘


---

🔮 Future Enhancements

📍 Real-time GPS bus tracking

🗺️ Google Maps integration

🚦 Live traffic information

📱 Mobile application

🔔 Real-time notifications

📲 QR-based bus attendance

🤖 AI-based route optimization

☁️ Cloud deployment

📊 Advanced transport analytics



---

🌟 Benefits

Students

Easy access to bus details

Route and stop information

Bus schedule information

Online transport requests


College Management

Centralized transport management

Easy bus and driver management

Better route organization

Reduced paperwork


Drivers

View assigned bus

View assigned route

Access schedule information



---

🔒 Security

Secure authentication

Role-based access

Protected API endpoints

Input validation

Secure database connection

Environment variables



---

📄 License

This project is licensed under the MIT License.


---

👨‍💻 Developed By

College Transport Management System

> 🚌 “Smart Transport. Safe Journey. Better Campus.”



⭐ If you like this project, give it a Star on GitHub!
