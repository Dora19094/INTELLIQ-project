#getquestionanswers/63e9404266b76729edd6d133/P00
import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'



def contains_two_words(text, word1, word2):
    return word1 in text and word2 in text

command = ["python", "cli.py", "getquestionanswers", "--questionnaire_id",  "63e9404266b76729edd6d133", "--question_id", "P00"]

# Here we are running the API call getquestionanswers with the respecitve questionnaire_id and question_id.We are also capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE)

# Here we are converting the captured stdout to a string,so we can do the testing easier.
output_str = result.stdout.decode('utf-8')
 
print(output_str)
#We are checking if the outcome of the API call has the right questionnaire_id and question_id.
id_ = '"63e9404266b76729edd6d133"'
question_id = '"P00"'

if contains_two_words(output_str, id_,question_id):
    print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")
