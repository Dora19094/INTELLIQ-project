import argparse
import requests

def result_handler(x,format):
    if format == 'json':
        res = x.json()
    if format == 'csv':
        res = x.text
    file = args.get('file','default')
    if file == 'print':
        print(res)

def error_code_handler(code):
    if (code == 200):
        print('The request was successful')
    if (code == 400):
        print('Bad request')
    if (code == 401):
        print('Authorization is necessary for this request')
    if (code == 402):
        print('No data were found')
    if (code == 500):
        print('Internal server error') 
    return

parser = argparse.ArgumentParser(description='command Line Interface')
parser.add_argument('scope', nargs = '?', default = 'help')
parser.add_argument('--format', help = 'choose format, json or csv', default = 'json')
parser.add_argument('--file', help = 'choose output file, leave blank to print the results', default = 'print')
parser.add_argument('--source',default = 'help')
parser.add_argument('--questionnaire_id',default = 'help')
parser.add_argument('--question_id',default = 'help')
parser.add_argument('--session_id',default = 'help')
parser.add_argument('--option_id',default = 'help')

args = parser.parse_args()
args = vars(args)

format = args.get('format','default')
file = args.get('file','default')
scope = args.get('scope','default')
source = args.get('source','default')
questionnaire_id = args.get('questionnaire_id','default')
question_id = args.get('question_id','default')
session_id = args.get('session_id','default')
option_id = args.get('option_id','default')

url = 'https://localhost:3000'

post = ['resetall','resetq','doanswer']

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
    exit()
elif(scope == 'healthcheck'):
    url += '/admin/' + scope
elif(scope == 'resetall'):
    url += '/admin/' + scope
elif(scope == 'questionnaire_upd'):
    url += '/admin/' + scope
    files = {'file': open(source, 'rb')}
elif(scope == 'resetq'):
    url += '/admin/' + scope + '/' + questionnaire_id
elif(scope == 'questionnaire'):
    url += '/' + scope + '/' + questionnaire_id
elif(scope == 'question'):
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id 
elif(scope == 'doanswer'):
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id + '/' + session_id + '/' + option_id
elif(scope == 'getsessionanswers'):
    url += '/' + scope + '/' + questionnaire_id + '/' + session_id
elif(scope == 'getquestionanswers'):
    url += '/' + scope + '/' + questionnaire_id + '/' + question_id
else:
    print('scope does not exit, run the program without any arguments to see the help message')
    exit()
if (scope in post):
    x = requests.post(url,verify = False)
elif(scope == 'questionnaire_upd'):
    x = requests.post(url,files = files,verify = False)
else:
    x = requests.get(url,verify = False)
code = x.status_code
result_handler(x,format)
error_code_handler(code)