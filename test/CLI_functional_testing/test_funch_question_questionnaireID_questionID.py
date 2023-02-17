import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'

def compare_strings_ignore_spaces(str1, str2):
    str1_no_space = str1.replace(" ", "").replace("\n", "")
    str2_no_space = str2.replace(" ", "").replace("\n", "")
    return str1_no_space == str2_no_space


command = ["python", "cli.py", "question", "--questionnaire_id","63e9404266b76729edd6d133", "--question_id", "P00"]

#Here we are running the API call question with the respecitve questionnaire_id and question_id.We are also capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE, text=True)

# Converting the captured stdout to a string (Keep only the first 66 characters).
output_str = str(result.stdout)[:66] + '}'

print(output_str)
expected_string = '{"questionnaireID": "63e9404266b76729edd6d133","qID": "P00",}'

if compare_strings_ignore_spaces(output_str, expected_string):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
