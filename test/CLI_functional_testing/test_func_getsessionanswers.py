#getsessionanswers/63e9404266b76729edd6d133/ekis
import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'

def contains_two_words(text, word1, word2):
    return word1 in text and word2 in text

command = ["python", "cli.py", "getsessionanswers", "--questionnaire_id",  "63e9404266b76729edd6d133", "--session", "ekis"]

# Here we are running the API call getsessionanswers with the respecitve questionnaire_id and session.We are also capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE)

# Here we are converting the captured stdout to a string,so we can do the testing easier.
output_str = result.stdout.decode('utf-8')

print(output_str)

#We are checking if the outcome of the API call has the right questionnaire_id and session.
id_ = '"63ea43e87447803cd60c2082"'
session = '"ekis"'

if contains_two_words(output_str, id_,session):
     print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
