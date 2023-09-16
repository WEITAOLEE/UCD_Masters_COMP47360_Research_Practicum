import json

# Read the JSON file obtained from Overpass Turbo
with open('Attractions/tourism.geojson') as file:
    data = json.load(file)

# Extract the attraction names from the geoJSON data
attractions = []
full_addr_attractions = []
missing_addr_attractions = []
processed_attractions = set()
name_exists=0
full_address=0
num_attractions=0

for feature in data['features']:
    name = feature['properties'].get('name')
    
    house_num= feature['properties'].get('addr:housenumber')
    street = feature['properties'].get('addr:street')
    city = feature['properties'].get('addr:city')
    state = feature['properties'].get('addr:state')
    postcode = feature['properties'].get('addr:postcode')
    #process the address in data to account for empty fields
    if house_num is None:
        house_num = 'NAN'
    if street is None:
        street = 'NAN'
    if city is None:
        city = 'New York'
    if state is None:
        state = 'NY'
    if postcode is None:
        postcode = 'NAN'

    address = house_num+' '+street+' '+city+' '+state+' '+postcode

    #prevent duplicates from being in the dataset
    if name not in processed_attractions:
        num_attractions+=1
        attractions.append(name)
        attractions.append(address)
        processed_attractions.add(name)
        print(name)
        print(address)
        print("--------------")
        #print some info about the data
        if name!=None:
            name_exists+=1
        #if address doesnt contain NAN add 1 to count
        if 'NAN' not in address:
            full_address+=1
        if name!=None and 'NAN' not in address:
            full_addr_attractions.append(name)
            full_addr_attractions.append(address)
        else:
            missing_addr_attractions.append(name)
            missing_addr_attractions.append(address)

print("Number of names that exist: ",name_exists)
print("Number of places with a full address: ",full_address)
print("Number of unique attractions in dataset: ",num_attractions)

# Write all attractions and their addresses to a JSON file
with open('Attractions/allProcessedAttractions.json', 'w') as file:
    json.dump(attractions, file, indent=2)

with open('Attractions/fullAddrProcessedAttractions.json', 'w') as file:
    json.dump(full_addr_attractions, file, indent=2)

with open('Attractions/missingAddrProcessedAttractions.json', 'w') as file:
    json.dump(missing_addr_attractions, file, indent=2)
