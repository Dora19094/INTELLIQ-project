import json
import subprocess

def check_json(expected, actual):
    expected_json = json.loads(expected)
    actual_json = json.loads(actual)
    if expected_json == actual_json:
        return True
    return False

command = ["python","cli.py", "healthcheck"]

#Here we are running the API call healthcheck and we are  capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE)

# Here we are converting the captured stdout to a string,so we can do the testing easier.
output = result.stdout.decode().strip()
print(output)

# Here we are defining the expected JSON document as a string.
expected_json = '{"status": "OK", "dbconnection": "mongodb://127.0.0.1/intelliQ The request was successful"} '

if check_json(expected_json, output):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
