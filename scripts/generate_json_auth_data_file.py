import json
import uuid
import random
import string
import datetime

def generate_random_string(number_of_signs=20):
    return ''.join(random.choices(string.ascii_lowercase, k=number_of_signs))

def generate_json(users_count=15, version=1, key_length=128):
    data = {}
    data["version"] = version
    data["id"] = str(uuid.uuid4())
    data["createdAt"] = datetime.datetime.now().isoformat()
    data["usersCredentials"] = {}

    for i in range(1, users_count + 1):
        username = f"u_{generate_random_string()}"
        data["usersCredentials"][username] = generate_random_string(key_length)

    with open('created_auth_credentials.json', "w") as file:
        json.dump(data, file, indent=2)


if(__name__ == "__main__"):
    generate_json()
