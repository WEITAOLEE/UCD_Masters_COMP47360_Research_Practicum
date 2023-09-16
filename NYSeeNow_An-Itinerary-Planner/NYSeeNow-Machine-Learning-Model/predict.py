from datetime import datetime
from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
import pandas as pd
from haversine import haversine
import joblib
import json

app = Flask(__name__)


# Load station data
stations_df = pd.read_csv('./SubwayData/cleaned_station_data.csv')

# Load taxi zone data
taxi_zones_df = pd.read_csv('./TaxiDataset/Taxi_Zone_Lookup.csv')


def get_nearest_station_id(lon, lat):
    # Calculate the distance from the provided coordinates to all stations
    distances = stations_df.apply(lambda row: haversine(
        (lon, lat), (row['lon'], row['lat'])), axis=1)

    # Get the id of the nearest station
    nearest_station_id = stations_df.loc[distances.idxmin(), 'remote_unit_id']

    return nearest_station_id, distances.min()


def get_nearest_taxi_id(lon, lat):
    # Calculate the distance from the provided coordinates to all stations
    distances = taxi_zones_df.apply(lambda row: haversine(
        (lon, lat), (row['Lon'], row['Lat'])), axis=1)

    # Get the id of the nearest station
    nearest_taxi_id = taxi_zones_df.loc[distances.idxmin(), 'TaxiZone']

    return nearest_taxi_id, distances.min()


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)

    # Prepare the response structure
    response = {}

    # Iterate over each attraction
    for attraction in data['attraction_list']:
        # Extract relevant information from the data structure
        lon = attraction['longitude']
        lat = attraction['latitude']
        day_str = attraction['day'].rsplit(" ", 2)[0]
        # Remove the "(Irish Standard Time)" part
        day_str_clean = day_str.rsplit(" (", 1)[0]
        date_format = "%a %b %d %Y %H:%M:%S %Z%z"
        day = datetime.strptime(day_str_clean, date_format)
        weekday = day.weekday() + 1
        month = day.month

        # Get the nearest station id and distance
        station_number, station_distance = get_nearest_station_id(lon, lat)

        # Get the nearest taxi id and distance
        taxi_number, taxi_distance = get_nearest_taxi_id(lon, lat)

        # Hourly predictions for the attraction
        attraction_response = {"prediction": []}

        if station_distance < taxi_distance:
            path = f'./SubwayData/station_busy/s_busy_model_{station_number}.pkl'
            for hour in range(24):
                model_input = pd.DataFrame({
                    'hour': [hour],
                    'day': [weekday],
                    'month': [month],
                    # Replace with actual temperature values- make call to openweather
                    'temperature': [0.0],
                    'rain_fall': [0.0],
                    'snow_fall': [0.0],
                    'Clear': [0],
                    'Clouds': [0],
                    'Mist': [0],
                    'Rain': [0],
                    'Snow': [0]
                })
                # Load the model
                with open(path, 'rb') as handle:
                    model = pickle.load(handle)
                # Make prediction using the loaded model and the input data
                prediction = model.predict(model_input.values)

                prediction = np.array2string(prediction)

                # remove the square brackets
                prediction = prediction.replace('[', '')
                prediction = prediction.replace(']', '')
                # round to nearest integer
                prediction = round(float(prediction))
                # Take the first value of the prediction
                output = prediction

                # Add the busyness for the current hour to the attraction's response
                attraction_response["prediction"].append(int(output))
        else:
            path = f'./TaxiDataset/Model/taxi_model_DOLocationID_{taxi_number}.pkl'
            for hour in range(24):
                model_input = pd.DataFrame([{
                    "DOLocationID": taxi_number,
                    "dropoff_day_number": weekday,
                    "dropoff_month": month,
                    "dropoff_hour": hour
                    # Add other required parameters for the taxi model here
                }])
                # Load the model
                with open(path, 'rb') as handle:
                    model = joblib.load(handle)
                # Make prediction using the loaded model and the input data
                prediction = model.predict(model_input)

                # Take the first value of the prediction
                output = prediction[0]

                # Add the busyness for the current hour to the attraction's response
                attraction_response["prediction"].append(int(output))

        # Add the attraction's response to the main response
        if attraction['day'] not in response:
            response[attraction['day']] = []
        attraction["day_busyness"] = (attraction_response["prediction"])
        attraction_string = json.dumps(attraction)
        response[attraction['day']].append(attraction_string)

    return jsonify(response)


@app.route('/AttractionPredict', methods=['POST'])
def AttractionPredict():
    # Get the data from the POST request.
    data = request.get_json(force=True)

    # Extract the name, lat_lon, day, and month from the data
    name = data['name']
    lat_lon = data['lat_lon']
    hour = data['hour']
    day = data['day']
    month = data['month']

    # Split the lat_lon into latitude and longitude
    lat, lon = map(float, lat_lon.split(','))

    # Get the nearest station id and distance
    station_number, station_distance = get_nearest_station_id(lon, lat)

    # Get the nearest taxi id and distance
    taxi_number, taxi_distance = get_nearest_taxi_id(lon, lat)

    output = None  # Initialize the output

    attraction_response = {"prediction": []}

    if station_distance < taxi_distance:
        path = f'./SubwayData/station_busy/s_busy_model_{station_number}.pkl'
        model_input = pd.DataFrame({
            'hour': [hour],
            'day': [day],
            'month': [month],
            # Replace with actual temperature values- make call to openweather
            'temperature': [0.0],
            'rain_fall': [0.0],  # Replace with actual rain_fall value
            'snow_fall': [0.0],  # Replace with actual snow_fall value
            'Clear': [0],
            'Clouds': [0],
            'Mist': [0],
            'Rain': [0],
            'Snow': [0]
        })
        try:
            # Load the model
            with open(path, 'rb') as handle:
                model = pickle.load(handle)
            # Make prediction using the loaded model and the input data
            prediction = model.predict(model_input.values)

            prediction = np.array2string(prediction)

            # remove the square brackets
            prediction = prediction.replace('[', '')
            prediction = prediction.replace(']', '')
            # round to nearest integer
            prediction = round(float(prediction))
            # Take the first value of the prediction
            output = prediction
            print("Busyness prediction: ", output, " for station ", name)
            # Add the busyness for the current hour to the attraction's response
            attraction_response["prediction"].append(int(output))
            print("From subway, pred is:", output)

        except FileNotFoundError:
            print(
                f"No model found for station {station_number}. Skipping this station.")
    else:
        path = f'./TaxiDataset/Model/taxi_model_DOLocationID_{taxi_number}.pkl'
        model_input = pd.DataFrame([{
            "DOLocationID": taxi_number,
            "dropoff_day_number": day,
            "dropoff_month": month,
            "dropoff_hour": hour
            # Add other required parameters for the taxi model here
        }])
        try:
            # Load the model
            with open(path, 'rb') as handle:
                model = joblib.load(handle)
            # Make prediction using the loaded model and the input data
            prediction = model.predict(model_input)

            # Take the first value of the prediction
            output = prediction[0]

            # Add the busyness for the current hour to the attraction's response
            attraction_response["prediction"].append(int(output))
            print("From taxi, pred is:", output)

        except FileNotFoundError:
            print(
                f"No model found for taxi zone {taxi_number}. Skipping this taxi zone.")

    # Create the response dictionary
    response = {
        'name': name,
        'prediction': attraction_response["prediction"]
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5001, debug=True)
