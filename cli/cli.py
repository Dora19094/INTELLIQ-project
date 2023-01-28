import argparse
import requests

def error_code_handler(code):
    print(code)
    return
def result_handler(x,format):
    if format == 'json':
        res = x.json()
    if format == 'csv':
        res = x.text
    file = args.get('file','default')
    if file == 'print':
        print(res)
baseurl = 'https://localhost:3000'
# Admin
def health_check():
    url = baseurl + '/admin/healthcheck'
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.get(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)

def questionnaire_upd( file_address):
    if file_address == 'source':
        print('argument --source was not given')
        return
    files = {'file': open(file_address, 'rb')}
    url = baseurl + '/admin/questionnaire_upd'
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.post(url,files = files,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)
    
def reset_all():
    url = baseurl + '/admin/resetall'
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.post(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)

def reset_q( id ):
    if id == 'default':
        print('argument --questionnaire_id was not given')
        return
    url = baseurl + '/admin/resetq/' + id
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.post(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)
# IntelliQ
def get_questionnaire(id):
    if id == 'default':
        print('argument --questionnaire_id was not given')
        return
    url = baseurl + '/questionnaire/' + id
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.get(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)
    
def get_question(qid, id):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if id == 'default':
        print('argument --question_id was not given')
        return
    url = baseurl + '/questionnaire/' + qid + '/' + id
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.get(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)

def do_answer(qid,id,sid,oid):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if id == 'default':
        print('argument --question_id was not given')
        return
    if sid == 'default':
        print('argument --session_id was not given')
        return
    if oid == 'default':
        print('argument --option_id was not given')
        return
    url = baseurl + '/doanswer/' + qid + '/' + id + '/' + sid + '/' + oid
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.post(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)

def get_session_answers(qid,sid):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if sid == 'default':
        print('argument --session_id was not given')
        return
    url = baseurl + '/getsessionanswers/' + qid +'/' + sid
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.get(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)

def get_question_answers(qid,id):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if id == 'default':
        print('argument --question_id was not given')
        return
    url = baseurl + '/getsessionanswers/' + qid +'/' + id
    if format == 'csv':
        url += '?format=csv'
    elif format == 'json':
        url += '?format=json'
    else: 
        print('invalid format')
        return
    x = requests.get(url,verify=False)
    code = x.status_code
    error_code_handler(code)
    result_handler(x,format)
    
parser = argparse.ArgumentParser(description='command Line Interface')
parser.add_argument('--format', help = 'choose format, json or csv', default = 'json')
parser.add_argument('--file', help = 'choose output file, leave blank to print the results', default = 'print')
subparsers = parser.add_subparsers(help = 'list of commands')

health = subparsers.add_parser('healthcheck' , help = 'check the connection to the server')
health.add_argument('--health', default = 'health')

resetall = subparsers.add_parser('resetall', help = 'reset all data')
resetall.add_argument('--resetall', default = 'reset')

questionnaireupd = subparsers.add_parser('questionnaire_upd', help = 'upload a questionnaire from the file specified by parameter --source')
questionnaireupd.add_argument('--source', default = 'source',help = 'location of the file')

resetq = subparsers.add_parser('resetq', help = 'reset a questionnaire by providing its id via the parameter --questionnaire_id')
resetq.add_argument('--questionnaire_id',default = 'default', help = 'id of the questionnaire to be reset')
resetq.add_argument('--resetq',default = 'resetq')

questionnaire = subparsers.add_parser('questionnaire', help = 'search for a questionnaire by providing its id via the parameter --questionnaire_id')
questionnaire.add_argument('--questionnaire_id',default = 'default',help = 'id of the questionnaire to be searched')
questionnaire.add_argument('--questionnaire', default = 'questionnaire')

question = subparsers.add_parser('question',help = 'search for question with id provided by --question_id from questionnaire with id provided by --questionnaire_id')
question.add_argument('--question',default = 'question')
question.add_argument('--questionnaire_id',default = 'default')
question.add_argument('--question_id',default = 'default')

doanswer = subparsers.add_parser('doanswer', help = 'post answer with parameters --questionnaire_id, --question_id, --session_id, --option_id')
doanswer.add_argument('--doanswer',default = 'doanswer')
doanswer.add_argument('--questionnaire_id',default = 'default')
doanswer.add_argument('--question_id',default = 'default')
doanswer.add_argument('--option_id',default = 'default')
doanswer.add_argument('--session_id',default = 'default')

getsessionanswers = subparsers.add_parser('getsessionanswers', help = 'return all the answers from the session with id --session_id from questionnaire with id --questionnaire_id')
getsessionanswers.add_argument('--getsessionanswers',default = 'getsessionanswers')
getsessionanswers.add_argument('--questionnaire_id',default = 'default')
getsessionanswers.add_argument('--session_id',default = 'default')

getquestionanswers = subparsers.add_parser('getquestionanswers',help = 'return all the answers from the question with id --question_id from questionnaire with id --questionnaire_id')
getquestionanswers.add_argument('--getquestionanswers',default = 'getquestionanswers')
getquestionanswers.add_argument('--questionnaire_id',default = 'default')
getquestionanswers.add_argument('--question_id',default = 'default')

args = parser.parse_args()
args = vars(args)
format = args.get('format','default')
if len(args) == 1:
    parser.parse_args(['--help'])
if args.get('health' , 'default') == 'health':
    health_check()
if args.get('resetall','default') == 'reset':
    reset_all()
if args.get('source','default') != 'default':
    questionnaire_upd(args.get('source','default'))
if args.get('resetq','default') == 'resetq':
    reset_q(args.get('questionnaire_id', 'default'))
if args.get('questionnaire','default') == 'questionnaire':
    get_questionnaire(args.get('questionnaire_id','default'))
if args.get('question','default') == 'question':
    get_question(args.get('questionnaire_id','default'),args.get('question_id','default'))
if args.get('doanswer','default') == 'doanswer':
    do_answer(args.get('questionnaire_id','default'),args.get('question_id','default'),args.get('session_id','default'),args.get('option_id','default'))
if args.get('getsessionanswers','default') == 'getsessionanswers':
    get_session_answers(args.get('questionnaire_id','default'),args.get('session_id','default'))
if args.get('getquestionanswers','default') == 'getquestionanswers':
    get_question_answers(args.get('questionnaire_id','default'),args.get('question_id','default'))
    
