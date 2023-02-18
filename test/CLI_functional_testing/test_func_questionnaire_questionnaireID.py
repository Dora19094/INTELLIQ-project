#{baseURL} = https://localhost:3001/intelliq_api/
#{baseURL}/questionnaire/:questionnaireID
import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'

#You can modify this function and make it check a lot of words
def contains_two_words(text, word1, word2):
    return word1 in text and word2 in text



command = ["python","cli.py", "questionnaire","--questionnaire_id","63e9405366b76729edd6d135"] 

# Here we are running the API call questionnaire with the respecitve questionnaire_id.We are also capturing the output.
result = subprocess.run(command, stdout=subprocess.PIPE)
# Here we are converting the captured stdout to a string,so we can do the testing easier.
output_str = result.stdout.decode('utf-8')

print(output_str)

#We are checking if the outcome of the API call has the right questionnaire_id and title.
id_ = '"63e9405366b76729edd6d135"'
title = '"Online Shopping attitudes"'

if contains_two_words(output_str, id_,title):
     print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")





