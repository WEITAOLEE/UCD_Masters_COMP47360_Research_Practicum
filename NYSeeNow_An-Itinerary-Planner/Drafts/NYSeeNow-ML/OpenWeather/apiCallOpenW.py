#This file will make a call to open weather api
#run this script for 9 days and should reach the full year for NYC
import owLogin
import requests
import json
import time

#start the time on the 1/1/2019
#make sure to start from the most recent day called
start_time=1546300800
p=0
start_time=start_time+3456000*p
#each_day adds 3456000 seconds to the start time
#one hour in unix time is 3600 sec
hour=3600
#end time is 1/1/2020
end_time=1577836800


#keeps calls to 960 per day
for j in range(1,17):
    start=start_time + hour*60*(j-1)

    for i in range(0,60):
        current_time=start+hour*i
        print(current_time)
        # Connect to OpenWeather API
        r = requests.get(owLogin.owUrl, params={'lat': owLogin.owLat, 'lon': owLogin.owLon, 'dt': current_time, 'appid': owLogin.owKey })

        if r.status_code == 200:
            # If connection successful:
            print('Connection to OpenWeather Map successful!')
            data = r.json()

            #send data to a json file
            with open('OpenWeather/weatherData_2.json', 'a') as file:
                json.dump(data, file)
                            
        
    #wait for 61 seconds before repeating, keeps limit to 60 calls per second
    time.sleep(61)
