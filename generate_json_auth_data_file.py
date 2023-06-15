import json
import uuid
import random
import string
import datetime


def generate_json(users_count, version):
    data = {}
    data["version"] = version
    data["id"] = str(uuid.uuid4())
    data["createdAt"] = datetime.datetime.now().isoformat()
    data["usersCredentials"] = {}

    for i in range(1, users_count + 1):
        username = f"user{i}"
        random_string = ''.join(random.choices(string.ascii_lowercase, k=20))
        data["usersCredentials"][username] = random_string

    return data


json_data = generate_json(5, 2)

with open('created_auth_credentials.json', "w") as file:
    json.dump(json_data, file, indent=2)
