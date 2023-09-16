# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

This document will outline how to run our NYSeeNow Web App on your machine.


What are the dependencies?
In a Spring Boot project, dependencies typically refer to the libraries and modules that your application requires to function properly. These dependencies are managed through a build tool like Maven or Gradle. You can find all the dependencies we are using in pom.xml

Before you run the backend code make sure your IP address has been added to the inbound rule of RDS to have access to the database (send your ip address to maintenance lead)

VSCode/Intellij editors

Clone each of the repos to your local machine then:

Make sure the proxy(package.json file in frontend), request url(AttractionPredictionService.java, ItineraryPredictionService.java in backend) are set to localhost


Open NYSeeNow-backend repo in Code Editor on develop-v1 branch.
Type the following into terminal:
./mvnw spring-boot:run

Now the backend is running

Open the NYSeeNow-ML repo in Code Editor on main branch.
Type the following into terminal:
export FLASK_APP=predict.py
flask run --port 5001

Now the flask app is running.
(some packages may need to be be installed:
pip install Flask
pip install numpy
pip install pandas
pip install haversine
pip install scikit-learn==1.2.0
pip install pycaret
pip install flask-cors)

Open the normal NYSeeNow repo on the develop-v2 branch.
Type following into terminal:
cd NYSeeNow-frontend/
npm install
npm start

Now the front-end is running and our app should be fully connected?


Integration of all three systems to get the fully connected application

To ensure connection between the frontend application and springboot application: Open package.json file and edit the “proxy” variable to localhost instead of the ec2 url given in develop branch code. 
Make sure your IP is whitelisted to use the Amazon RDS where the database is hosted. This will ensure that the springboot application runs smoothly. 