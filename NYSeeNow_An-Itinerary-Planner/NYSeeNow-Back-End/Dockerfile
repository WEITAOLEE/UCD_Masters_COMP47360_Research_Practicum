# Use a base image with Java 17
FROM openjdk:17-jdk

# Set the working directory
WORKDIR /app

# Copy the application JAR file
COPY target/NYSeeNow-backend-0.0.1-SNAPSHOT.jar .

# Expose the required port(s)
EXPOSE 8083

# Define the command to run the application
CMD ["java", "-jar", "NYSeeNow-backend-0.0.1-SNAPSHOT.jar"]
