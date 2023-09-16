import json
import psycopg2

# Load the JSON data from the file
with open('./Attractions/filtered_attractions.json') as file:
    attractions_data = json.load(file)

# Establish a connection to the PostgreSQL database
connection = psycopg2.connect(
    host='nyseenow.cbqpbir87k5q.eu-west-1.rds.amazonaws.com',
    port=5432,
    user='fei',
    password='22200125',
    database='UserAccount'
)


# Create a cursor object to execute SQL queries
cursor = connection.cursor()

# Define the SQL query to create the attractions table
create_table_query = '''
CREATE TABLE IF NOT EXISTS Attractions (
    attraction_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    tourism VARCHAR(255),
    description TEXT,
    opening_hours VARCHAR(255),
    website VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
)
'''

# Execute the create table query
cursor.execute(create_table_query)

# Insert each attraction into the database
for feature in attractions_data['features']:
    properties = feature['properties']
    name = properties.get('name', '')
    tourism = properties.get('tourism', '')
    description = properties.get('description', '')
    opening_hours = properties.get('opening_hours', '')
    website = properties.get('website', '')
    coordinates = feature['geometry']['coordinates']
    latitude = coordinates[1]
    longitude = coordinates[0]

    # Define the SQL query to insert an attraction into the table
    insert_query = '''
    INSERT INTO attractions
    (name, tourism, description, opening_hours, website, latitude, longitude)
    VALUES
    (%s, %s, %s, %s, %s, %s, %s)
    '''

    # Execute the insert query with the attraction data
    cursor.execute(insert_query, (name, tourism, description,
                   opening_hours, website, latitude, longitude))

# Commit the changes to the database
connection.commit()

# Close the cursor and the database connection
cursor.close()
connection.close()
