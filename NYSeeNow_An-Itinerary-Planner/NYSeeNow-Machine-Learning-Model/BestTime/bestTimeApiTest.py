import requests

url = "https://besttime.app/api/v1/keys/pri_b6c22e039524443298cc7c4ed37a6c9a"

response = requests.request("GET", url)

print(response.json())
