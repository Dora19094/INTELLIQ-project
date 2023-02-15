#getquestionanswers/63e9404266b76729edd6d133/P00
import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'



def contains_two_words(text, word1, word2):
    return word1 in text and word2 in text

# Replace "myexe.exe" with the name of your .exe file, and "arg1" and "arg2" with any command-line arguments it expects
command = ["python", "cli.py", "getquestionanswers", "--questionnaire_id",  "63e9404266b76729edd6d133", "--question_id", "P00"]

result = subprocess.run(command, stdout=subprocess.PIPE)

# Convert the captured stdout to a string
output_str = result.stdout.decode('utf-8')
 
print(output_str)

id_ = '"63e9404266b76729edd6d133"'
question_id = '"P00"'

if contains_two_words(output_str, id_,question_id):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
