#{baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID
#{baseURL} = https://localhost:3001/intelliq_api/
#In order for this testing to be valid, no questionID field must be prefilled. 
#If questionID is already answered in that session create a new session.
#Session is any 4-characther text (e.g. AFG3)

import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'

def compare_strings(string1,string2):
    return string1==string2

  
command = ["python", "cli.py", "doanswer", "--questionnaire_id",  "63e9405366b76729edd6d135","--question_id", "Q02", "--session",  "ABCF", "--option", "Q02A1"]

# Here we are running the API call getsessionanswers with the respecitve questionnaire_id and session.We are also capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE)

# Here we are converting the captured stdout to a string,so we can do the testing easier.
output_str = result.stdout.decode('utf-8')

print(output_str)

#We are checking if the outcome of the API call has the right questionnaire_id and session.
excepted_string = "The request was successful"


if compare_strings  (output_str,excepted_string):
    print("The answer have been posted.")
else:
    print("The answer have been not posted.")
