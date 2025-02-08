from flask import Flask, render_template, Response, jsonify, request, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import cv2
import pickle
import numpy as np
from keras.models import load_model
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parking.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Load ML model and configuration
model = load_model('model_final.h5')
class_dictionary = {0: 'no_car', 1: 'car'}

# Load parking positions
with open('carposition.pkl', 'rb') as f:
    posList = pickle.load(f)

width, height = 130, 65
cap = cv2.VideoCapture('car_test.mp4')

# Database Models
class ParkingSpace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    space_number = db.Column(db.String(10), unique=True, nullable=False)
    is_occupied = db.Column(db.Boolean, default=False)
    current_vehicle = db.Column(db.String(20))
    position_x = db.Column(db.Integer)  # Store x coordinate from posList
    position_y = db.Column(db.Integer)  # Store y coordinate from posList

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(20), unique=True, nullable=False)
    vehicle_type = db.Column(db.String(50))
    entry_image = db.Column(db.String(200))
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

class ParkingTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))
    space_id = db.Column(db.Integer, db.ForeignKey('parking_space.id'))
    entry_time = db.Column(db.DateTime, default=datetime.utcnow)
    exit_time = db.Column(db.DateTime)
    amount = db.Column(db.Float)
    payment_status = db.Column(db.String(20), default='pending')

# Ensure database queries run inside an application context
def checkParkingSpace(img):
    spaceCounter = 0
    imgCrops = []
    space_status = {}  # To track status of each parking space

    for pos in posList:
        x, y = pos
        imgCrop = img[y:y + height, x:x + width]
        imgResize = cv2.resize(imgCrop, (48, 48))
        imgNormalized = imgResize / 255.0
        imgCrops.append(imgNormalized)

    imgCrops = np.array(imgCrops)
    predictions = model.predict(imgCrops)

    with current_app.app_context():
        for i, pos in enumerate(posList):
            x, y = pos
            inID = np.argmax(predictions[i])
            label = class_dictionary[inID]
            
            # Update space status in database
            space = ParkingSpace.query.filter_by(position_x=x, position_y=y).first()
            if space:
                space.is_occupied = (label == 'car')
                db.session.commit()

            space_status[f"space_{i+1}"] = {
                "occupied": (label == 'car'),
                "position": pos
            }

            if label == 'no_car':
                color = (0, 255, 0)
                thickness = 5
                spaceCounter += 1
                textColor = (0, 0, 0)
            else:
                color = (0, 0, 255)
                thickness = 2
                textColor = (255, 255, 255)

            cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
            cv2.putText(img, label, (x, y + height - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, textColor, 1)

    return img, spaceCounter, len(posList) - spaceCounter, space_status

# Ensure database context is active inside generate_frames
def generate_frames():
    while True:
        success, img = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        img = cv2.resize(img, (1280, 720))

        with app.app_context():  # Ensuring DB context inside generator
            img, free_spaces, occupied_spaces, space_status = checkParkingSpace(img)

        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        print("Generated frame")

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/space_status')
def get_space_status():
    success, img = cap.read()
    if success:
        img = cv2.resize(img, (1280, 720))
        with app.app_context():
            _, free_spaces, occupied_spaces, space_status = checkParkingSpace(img)
        return jsonify({
            'free_spaces': free_spaces,
            'occupied_spaces': occupied_spaces,
            'space_details': space_status
        })
    return jsonify({'error': 'Failed to process video frame'}), 400

@app.route('/api/spaces', methods=['GET'])
def get_spaces():
    with app.app_context():
        spaces = ParkingSpace.query.all()
        return jsonify([{
            'id': space.id,
            'space_number': space.space_number,
            'is_occupied': space.is_occupied,
            'current_vehicle': space.current_vehicle,
            'position': {'x': space.position_x, 'y': space.position_y}
        } for space in spaces])

# Initialize parking spaces based on posList
def init_parking_spaces():
    with app.app_context():
        db.create_all()
        if ParkingSpace.query.count() == 0:
            for i, pos in enumerate(posList):
                space = ParkingSpace(
                    space_number=str(i+1),
                    position_x=pos[0],
                    position_y=pos[1]
                )
                db.session.add(space)
            db.session.commit()

if __name__ == '__main__':
    init_parking_spaces()
    app.run(debug=True)