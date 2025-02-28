ParkAI - AI-Driven Smart Parking Management System
Overview
ParkAI is an AI-powered smart parking management system that leverages computer vision, deep learning, and Generative AI to detect vehicle occupancy, classify car types, and optimize parking space allocation. It features real-time analytics, a reservation system, and a user-friendly dashboard to improve parking efficiency and reduce congestion.

Features
AI-Powered Vehicle Detection – Uses computer vision and Generative AI to identify parking spot occupancy and classify vehicles (SUVs, Sedans, Mini, etc.).
Real-Time Analytics – Displays occupancy rates, peak hours, and vehicle type history through an interactive dashboard.
Reservation System – Users can pre-book parking spots for convenience.
Seamless Integration – A Flask-based backend communicates with the React frontend and AI module for real-time updates.
Predictive Parking – AI-driven insights to forecast parking availability and optimize space usage.
Tech Stack
Frontend:
React.js – For an interactive, responsive user interface.
Shadcn/UI & Tailwind CSS – For modern UI components and styling.
Backend:
Flask (Python) – Handles API requests, AI processing, and database interactions.
SQLite – Lightweight database for storing parking data and reservations.
AI & Computer Vision:
TensorFlow/Keras – Used for deep learning-based car detection and classification.
OpenCV – Processes parking lot images and extracts vehicle data.
Generative AI – Enhances detection accuracy for car types.
Installation & Setup
1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-repo/parkAI.git
cd parkAI
2. Set Up the Backend (Flask + AI Model)
sh
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py
3. Set Up the Frontend (React.js)
sh
Copy
Edit
cd frontend
npm install
npm start
4. Running the Application
Ensure both the backend (Flask) and frontend (React) are running.
Access the app at http://localhost:3000/.
Upload parking lot images, get real-time availability, and book spaces.
How to Use
Upload an Image/Video Feed – The AI model processes the input to detect available parking spaces.
View Parking Availability – The dashboard updates occupancy in real-time.
Book a Spot – Users can reserve a space if needed.
Analyze Trends – The system provides insights on parking patterns and peak hours.
Future Enhancements
Integration with Maps for real-time parking navigation.
Automated Payment Processing for seamless transactions.
Edge AI Optimization for real-time inference with minimal latency.
License
This project is open-source under the MIT License.