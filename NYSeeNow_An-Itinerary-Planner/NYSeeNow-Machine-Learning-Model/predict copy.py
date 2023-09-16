from datetime import datetime
from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
import pandas as pd
from haversine import haversine
import joblib

app = Flask(__name__)

# Load taxi zone data
taxi_zones_df = pd.read_csv(
    './TaxiDataset/Taxi_Zone_Lookup.csv')


def get_nearest_taxi_id(lon, lat):
    # Calculate the distance from the provided coordinates to all stations
    distances = taxi_zones_df.apply(lambda row: haversine(
        (lon, lat), (row['Lon'], row['Lat'])), axis=1)

    # Get the id of the nearest station
    nearest_taxi_id = taxi_zones_df.loc[distances.idxmin(), 'TaxiZone']

    return nearest_taxi_id


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)

    # Prepare the response structure
    response = {}

    # Iterate over each attraction
    for attraction in data['attraction_list']:
        # Extract relevant information from the data structure
        lon = attraction['all_details']['geometry']['coordinates'][0]
        lat = attraction['all_details']['geometry']['coordinates'][1]
        day_str = attraction['day'].rsplit(" ", 2)[0]
        # Remove the "(Irish Standard Time)" part
        day_str_clean = day_str.rsplit(" (", 1)[0]
        date_format = "%a %b %d %Y %H:%M:%S %Z%z"
        day = datetime.strptime(day_str_clean, date_format)
        weekday = day.weekday() + 1
        month = day.month
        hour = day.hour

        # Get the nearest taxi id
        taxi_number = get_nearest_taxi_id(lon, lat)

        # Define the path to the taxi model
        path = f'./TaxiDataset/Model/taxi_model_DOLocationID_{taxi_number}.pkl'

        # Prepare the input for the taxi model including hour, day, month, and other required parameters
        model_input = pd.DataFrame([{
            "DOLocationID": taxi_number,
            "dropoff_day_number": weekday,
            "dropoff_month": month,
            "dropoff_hour": hour
            # Add other required parameters for the taxi model here
        }])

        # Load the model
        model = joblib.load(path)

        # Make prediction using the loaded model and the input data
        prediction = model.predict(model_input)

        # Take the first value of the prediction
        output = prediction[0]

        # Add the busyness for the current hour to the attraction's response
        response[attraction['name']] = {"prediction": int(output)}

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5001, debug=True)
