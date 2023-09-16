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
counter=0


#keeps calls to 960 per day
for j in range(1,17):
    start=start_time + hour*60*(j-1)
    print("Start time for new 60 requests: "+str(start))

    for i in range(0,60):
        current_time=start+hour*i
        print("time in loop incrementing by 3600 "+str(current_time))
        counter+=1
        

    print("After each 60 requests "+str(current_time)) 
        
    #wait for 61 seconds before repeating, keeps limit to 60 calls per second
    time.sleep(0.05)

print("Total number of requests: "+str(counter))