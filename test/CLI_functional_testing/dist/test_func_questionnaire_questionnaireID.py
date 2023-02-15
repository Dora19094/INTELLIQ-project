import subprocess
from io import BytesIO
import os

os.environ['PYTHONIOENCODING'] = 'utf-8'

#You can modify this function and make it check a lot of words
def contains_two_words(text, word1, word2):
    return word1 in text and word2 in text


# Replace "myexe.exe" with the name of your .exe file, and "arg1" and "arg2" with any command-line arguments it expects
command = ["python","cli.py", "questionnaire","--questionnaire_id","63e9405366b76729edd6d135"] 

# Call the command and capture the output
result = subprocess.run(command, stdout=subprocess.PIPE)
output_str = result.stdout.decode('utf-8')

print(output_str)


id_ = '"63e9405366b76729edd6d135"'
title = '"Online Shopping attitudes"'

if contains_two_words(output_str, id_,title):
     print("The .exe file returned the expected JSON document.")
else:
    print("The .exe file did not return the expected JSON document.")





