import requests

# user signup
r = requests.post('http://localhost:3000/user/signup', json={'email': 'test', 'password': "1234"})

# user login
# r = requests.post('http://localhost:3000/user/login', json={'email': 'test', 'password': "1234"})


print (r.status_code)
print (r.json())