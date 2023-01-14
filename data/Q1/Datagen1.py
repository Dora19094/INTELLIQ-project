#data generator for questionnaire with title "My first research questionnaire"
#Set correct questionnaire id:
questionnaireID = "63beb60ee9921e1b32de62f3"

import json
from random import choice
import string


with open('./Blank1.json','r',encoding='UTF-8') as f:
    json_data = f.read()

data = json.loads(json_data)
#chose first object [{},...]
data = data[0]
questionnaireAnswered=[]

for i in range(10):
    answers = []
    nextquestion = "P00"
    session =  ''.join(choice(string.ascii_letters) for i in range(4))
    for d in data['questions']:
        if nextquestion == d["qID"]:
            option = choice(d['options'])
            nextquestion = option['nextqID']
            answers.append({"qID":d['qID'], "ans":option['optID']})
    questionnaireAnswered.append({"questionnaireID": questionnaireID,"session": session,"answers":answers})

with open('Answered1.json','w') as f:
    json.dump(questionnaireAnswered,f,indent=4)