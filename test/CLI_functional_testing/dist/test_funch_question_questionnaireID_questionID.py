import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'
# For question/63e9404266b76729edd6d133/P00


def compare_strings_ignore_spaces(str1, str2):
    # remove all spaces from both strings
    str1_no_space = str1.replace(" ", "").replace("\n", "")
    str2_no_space = str2.replace(" ", "").replace("\n", "")
    # compare the modified strings
    return str1_no_space == str2_no_space


# Replace "myexe.exe" with the name of your .exe file, and "arg1" and "arg2" with any command-line arguments it expects
command = ["python", "cli.py", "question", "--questionnaire_id",
           "63e9404266b76729edd6d133", "--question_id", "P00"]

result = subprocess.run(command, stdout=subprocess.PIPE, text=True)

# Convert the captured stdout to a string (Keep specific characters.Not the Greek ones)
output_str = str(result.stdout)[:66] + '}'

print(output_str)
expected_string = '{"questionnaireID": "63e9404266b76729edd6d133","qID": "P00",}'

if compare_strings_ignore_spaces(output_str, expected_string):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
