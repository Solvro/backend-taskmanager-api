import uuid
import random
import json
import datetime
import time
import string


estimation_days_map = {
        "ONE": 1,
        "TWO": 2,
        "THREE": 3,
        "FIVE": 5,
        "EIGHT": 8,
        "THIRTEEN": 13,
        "TWENTY_ONE": 21
    }


def calculate_start_and_end_timestamp(estimation):
    now = datetime.datetime.now()
    one_year_ago_date = (now - datetime.timedelta(days=365)).timetuple()

    start_timestamp = int(time.mktime(one_year_ago_date))
    days = 365 - estimation_days_map[estimation]

    end_date = (now - datetime.timedelta(days=days)).timetuple()
    end_timestamp = int(time.mktime(end_date))
    return start_timestamp, end_timestamp


def generate_task(project_id, specialization, estimation):
    start_timestamp, end_timestamp = calculate_start_and_end_timestamp(estimation)

    return {
        "id": str(uuid.uuid4()),
        "projectId": project_id,
        "credentials": {
            "name": ''.join(random.choice(string.ascii_letters) for _ in range(30)),
            "estimation": estimation,
            "specialization": specialization,
            "assignedTo": {
                "userId": str(uuid.uuid4())
            },
            "dateRange": {
                "start": start_timestamp,
                "end": end_timestamp
            }
        },
        "state": "CLOSED",
        "createdAt": start_timestamp,
        "createdBy": {
            "userId": str(uuid.uuid4())
        }
    }


def generate_tasks(num_tasks, project_id):
    tasks = []
    specializations = ["FRONTEND", "BACKEND","DEVOPS", "UX/UI"]

    num_specializations = len(specializations)
    tasks_per_specialization = num_tasks // num_specializations

    for specialization in specializations:
        for _ in range(tasks_per_specialization):
            estimation = random.choices(list(estimation_days_map.keys()), weights=[10, 20, 20, 25, 25, 10, 0], k=1)[0]
            task = generate_task(project_id, specialization, estimation)
            tasks.append(task)

    remaining_tasks = num_tasks % num_specializations
    for _ in range(remaining_tasks):
        specialization = random.choice(specializations)
        estimation = random.choices(list(estimation_days_map.keys()), weights=[10, 20, 20, 25, 25, 10, 0], k=1)[0]
        task = generate_task(project_id, specialization, estimation)
        tasks.append(task)

    return tasks


def save_tasks_to_file(tasks):
    with open("generated_tasks.json", 'w') as file:
        json.dump(tasks, file, indent=4)


if __name__ == '__main__':
    project_id = str(uuid.uuid4())
    tasks_quantity = 40

    tasks = generate_tasks(tasks_quantity, project_id)
    save_tasks_to_file(tasks)

    print(f"Tasks have been generated and saved in file: generated_tasks.json")
