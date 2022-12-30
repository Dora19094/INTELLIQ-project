#data generator for questionnaire with title "My first research questionnaire"
#Set correct questionnaire id:
questionnaireID = "638a1e29c51198ab0849df3e"

import json
from random import choice

with open('Blank1.json','r',encoding='UTF-8') as f:
    json_data = f.read()

data = json.loads(json_data)
#chose first object [{},...]
data = data[0]
questionnaireAnswered=[]

for i in range(10):
    answers = []
    nextquestion = "P00"
    for d in data['questions']:
        if nextquestion == d["qID"]:
            option = choice(d['options'])
            nextquestion = option['nextqID']
            answers.append({"qID":d['qID'], "ans":option['optID']})
    questionnaireAnswered.append({"questionnaireID": questionnaireID,"answers":answers})

with open('Answered1.json','w') as f:
    json.dump(questionnaireAnswered,f,indent=4)