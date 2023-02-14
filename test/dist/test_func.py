import json
import subprocess

def check_json(expected, actual):
    expected_json = json.loads(expected)
    actual_json = json.loads(actual)
    if expected_json == actual_json:
        return True
    return False

# Replace "myexe.exe" with the name of your .exe file, and "arg1" and "arg2" with any command-line arguments it expects
command = ["python","cli.py", "healthcheck"]

# Call the command and capture the output
result = subprocess.run(command, stdout=subprocess.PIPE)

# Get the output as a string
output = result.stdout.decode().strip()
print(output)

# Define the expected JSON document as a string
expected_json = '{"status": "OK", "dbconnection": "mongodb://127.0.0.1/intelliQ"} '

# Check the actual JSON document against the expected JSON document
if check_json(expected_json, output):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
