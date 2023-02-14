import argparse
import requests
import json 
import matplotlib.pyplot as plt
import numpy as np
import sys
from urllib3.exceptions import InsecureRequestWarning
 
 
# Suppress the warnings from urllib3
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

#if file is not specified it prints to stdout else it prints to the file
def result_handler(x,format):
    if format == 'json':
        res = x.json()
    if format == 'csv':
        res = x.text
    if file == 'print':
        if (format == 'json'):
            res = json.dumps(res, indent = 2, ensure_ascii = False).encode('utf8')
            print(res.decode())
            return
        print(res)
    else:
        f = open(file,'w')
        f.write(res)
        f.close()
#prints a comment corresponding to each error code
def error_code_handler(code):
    if (code == 200):
        print('The request was successful')
    if (code == 400):
        print('Bad request, check the parameters again')
    if (code == 401):
        print('Authorization is necessary for this request')
    if (code == 402):
        print('No data were found')
    if (code == 500):
        print('Internal server error') 
    return
#define the parser and its arguments
parser = argparse.ArgumentParser(description='command Line Interface')
parser.add_argument('scope', nargs = '?', default = 'help')
parser.add_argument('--format', help = 'choose format, json or csv', default = 'json')
parser.add_argument('--file', help = 'choose output file, leave blank to print the results', default = 'print')
parser.add_argument('--source',default = 'default')
parser.add_argument('--questionnaire_id', default = 'default')
parser.add_argument('--question_id', default = 'default')
parser.add_argument('--session_id', default = 'default')
parser.add_argument('--option_id', default = 'default')

#read the arguments given and save them to dictionary args
args = parser.parse_args()
args = vars(args)

#get all the arguments from the dictionary, if they were not given 
format = args.get('format','default')
file = args.get('file','default')
scope = args.get('scope','default')
source = args.get('source','default')
questionnaire_id = args.get('questionnaire_id','default')
question_id = args.get('question_id','default')
session_id = args.get('session_id','default')
option_id = args.get('option_id','default')

#base url of the api
url = 'https://localhost:3001'

#methods that require a post request
post = ['resetall','resetq','doanswer']

#if the scope is help then print the help message(defaults to help when no arguments are given)
if(scope == 'help'):
    print('The scopes and their parameters are the following:')
    print('healthcheck no parameters')
    print('resetall no parameters')
    print('questionnaire_upd  --source')
    print('resetq  --questionnaire_id')
    print('questionnaire  --questionnaire_id')
    print('question  --questionnaire_id  --question_id')
    print('doanwer  --questionnaire_id  --question_id  --session_id  --option_id')
    print('getsessionanswers  --questionnaire_id  --session_id')
    print('getquestionanswers  --questionnaire_id  --question_id')
    print('questions_data --questionnaire_id')
    sys.exit(0)
#each elif forms url based on the specified method and checks if any parameters are missing
elif(scope == 'healthcheck'):
    url += '/admin/' + scope
elif(scope == 'resetall'):
    url += '/admin/' + scope
elif(scope == 'questionnaire_upd'):
    url += '/admin/' + scope
    if (source == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
    try: #if the file does not open give an arror message and stop
        f = open(source, 'rb')
    except FileNotFoundError:
        print('File was not found')
        sys.exit(0)
    except:
        print('An unexpected error has occured')
        sys.exit(0)
elif(scope == 'resetq'):
    url += '/admin/' + scope + '/' + questionnaire_id
    if (questionnaire_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
elif(scope == 'questionnaire'):
    url += '/' + scope + '/' + questionnaire_id
    if (questionnaire_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
elif(scope == 'question'):
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id 
    if (questionnaire_id == 'default' or question_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
elif(scope == 'doanswer'):
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id + '/' + session_id + '/' + option_id
    if (questionnaire_id == 'default' or question_id == 'default' or session_id == 'default' or option_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
elif(scope == 'getsessionanswers'):
    url += '/' + scope + '/' + questionnaire_id + '/' + session_id
    if (questionnaire_id == 'default' or session_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
elif(scope == 'getquestionanswers'):
    if (questionnaire_id == 'default' or question_id == 'default'):
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
    check_url = url + '/question/' + questionnaire_id + '/' + question_id
    x = requests.get(check_url, verify = False)
    if(x.status_code != 200):
        if(x.status_code == 400):
            print('This question does not exist')
        sys.exit(0)
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id 
#the elif below corresponds to the usecase: chart the question data
elif(scope == 'questions_data'):
    if (questionnaire_id == 'default'):#check if questionnaire_id parameter was given
        print('An argument was not given, run the program without any arguments to see the help message' )
        sys.exit(0)
    questionnaire_url = url + '/holeBlank/' + questionnaire_id #request the blank
    x = requests.get(questionnaire_url, verify = False)
    questionnaire = x.json()
    if(x.status_code != 200):#check if the questionnaire with the specified id was found
        error_code_handler(x.status_code)
        sys.exit(0)
    questions = questionnaire['questions']#array with the structure of the questions
    qdict = {}
    optionsdict = {}
    #print the list of the available questions and create a dictionary of the options per question
    for i in range(len(questions)):
            print(questions[i]['qtext'] + ' :' + questions[i]['qID'])
            temp = []
            for j in questions[i]['options']:
                if j['opttxt'] != '<open string>':
                    temp.append(j['optID'])
            qdict[questions[i]['qID']] = [i,questions[i]['qtext']]
            optionsdict[questions[i]['qID']] = temp

    #while a new question_id is given compute its graph, if an invalid id is given or enter is pressed 
    #plot all the graphs that were computed
    while(True):
        question_id = input('Type the id of the question you need the data of, if you are finished please press enter: ')
        if(question_id == ''):#check if the id is given
            break
        question_url = url + '/getquestionanswers/' + questionnaire_id + '/' + question_id
        #request the answers of the question
        x = requests.get(question_url, verify = False)
        if(x.status_code != 200):#check if the answers from the specified question were found
            error_code_handler(x.status_code)
            break
        question = x.json()
        question = question['answers']
        #count each answer, save it in a dictionary
        dict = {'skipped': 0,'open ended option': 0}
        for i in optionsdict[question_id]:
            dict[i] = 0
        for i in question:
            if i['ans'] == 'skipped':
                dict['skipped'] += 1
            if i['ans'] not in dict.keys():
                dict['open ended option'] += 1
            else:
                dict[i['ans']] += 1
        temp = ['skipped']
        #delete entries to the dictionary without answers and ignore the skipped category
        for i in dict.keys():
            if dict[i] == 0:
                temp.append(i)
        for i in temp:
            if dict.get(i,'default') != 'default':
                del dict[i]
        data = []
        labels = [] 
        qnum = qdict[question_id][0]
        #get the question's structure to print the correct labels
        options_url = url + '/question/' + questionnaire_id + '/' + question_id
        x = requests.get(options_url,verify = False)
        if(x.status_code != 200):#check if the question's structure was found
            error_code_handler(x.status_code)
            break
        x = x.json()
        #match the data with the labels
        odict = {'open ended option': 'open ended option', 'skipped': 'skipped'}
        openend = []
        for i in x['options']:
            if (i['opttxt'] == '<open string>'):
                openend.append(i['opttxt'])
            odict[i['optId']] = i['opttxt']
        for i in dict.keys():
            if i not in openend:
                labels.append(odict[i])
        for i in dict.values():
            data.append(i)
        #plot the data
        fig = plt.figure()
        fig.set_size_inches(10,10)
        def func(pct, allvals):
            absolute = int(np.round(pct/100.*np.sum(allvals)))
            return "{:.1f}%\n({:d})".format(pct, absolute)
        plt.title(qdict[question_id][1])
        plt.pie(data, labels = labels,autopct=lambda pct: func(pct, data))
    #show all the plotted data
    plt.show()
    sys.exit(0)
else:
    print('scope does not exit, run the program without any arguments to see the help message')
    sys.exit(0)
if (scope in post):
    x = requests.post(url,verify = False)
elif(scope == 'questionnaire_upd'):
    data = json.load(f)
    data = json.dumps(data)
    x = requests.post(url,files = {'file': (None,data)},verify = False)
else:
    x = requests.get(url,verify = False)
code = x.status_code
result_handler(x,format)
error_code_handler(code)