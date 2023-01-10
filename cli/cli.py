import argparse
import requests

def error_code_handler(code):
    print(code)

baseurl = 'localhost:3000/admin/healthcheck'

def health_check():
    print('work in progress healthcheck')
    url = baseurl + '/admin/healthcheck'
    x = requests.get(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

def questionnaire_upd( file_address):
    if file_address == 'default':
        print('argument --source was not given')
        return
    print('will upload file in ' + file_address)
    files = {'file': open(file_address, 'rb')}
    url = baseurl + '/admin/questionnaire_upd'
    x = requests.post(url,files = files)
    code = x.status_code
    error_code_handler(code)
    
def reset_all():
    print('work in progress resetall')
    url = baseurl + '/resetall'
    x = requests.post(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

def reset_q( id ):
    if id == 'default':
        print('argument --questionnaire_id was not given')
        return
    print('will reset questionnaire with id ' + id )
    url = baseurl + '/admin/resetq/' + id
    x = requests.post(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

def get_questionnaire( id):
    if id == 'default':
        print('argument --questionnaire_id was not given')
        return
    print('will search for questionnaire with id ' + id)
    url = baseurl + '/questionnaire/' + id
    x = requests.get(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)
    
def get_question(qid, id):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if id == 'default':
        print('argument --question_id was not given')
        return
    print('will search for question with id ' + id + ' from questionnaire with id ' + qid)
    url = baseurl + '/questionnaire/' + qid + '/' + id
    x = requests.get(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

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
    print('will post answer with option id ' + oid +' from session with id ' + sid + ' to question with id' + id + ' from questionnaire with id ' + qid)
    url = baseurl + '/doanswer/' + qid + '/' + id + '/' + sid + '/' + oid
    x = requests.post(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

def get_session_answers(qid,sid):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if sid == 'default':
        print('argument --session_id was not given')
        return
    print('will return answers from session with id ' + sid +' from questionnaire with id ' + qid)
    url = baseurl + '/getsessionanswers/' + qid +'/' + sid
    x = requests.get(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)

def get_question_answers(qid,id):
    if qid == 'default':
        print('argument --questionnaire_id was not given')
        return
    if id == 'default':
        print('argument --question_id was not given')
        return
    print('will return answers from question with id ' + id +' from questionnaire with id ' + qid)
    url = baseurl + '/getsessionanswers/' + qid +'/' + id
    x = requests.get(url)
    code = x.status_code
    error_code_handler(code)
    res = x.json
    print(res)
    
parser = argparse.ArgumentParser(description='command Line Interface')
parser.add_argument('--format', help = 'choose format, json or csv', default = 'json')
subparsers = parser.add_subparsers(help = 'list of commands')

health = subparsers.add_parser('healthcheck' , help = 'check the connection to the server')
health.add_argument('--health', default = 'health')

resetall = subparsers.add_parser('resetall', help = 'reset all data')
resetall.add_argument('--resetall', default = 'reset')

questionnaireupd = subparsers.add_parser('questionnaire_upd', help = 'upload a questionnaire from the file specified by parameter --source')
questionnaireupd.add_argument('--source', help = 'location of the file')

resetq = subparsers.add_parser('resetq', help = 'reset a questionnaire by providing its id via the parameter --questionnaire_id')
resetq.add_argument('--questionnaire_id',help = 'id of the questionnaire to be reset')
resetq.add_argument('--resetq',default = 'resetq')

questionnaire = subparsers.add_parser('questionnaire', help = 'search for a questionnaire by providing its id via the parameter --questionnaire_id')
questionnaire.add_argument('--questionnaire_id',help = 'id of the questionnaire to be searched')
questionnaire.add_argument('--questionnaire', default = 'questionnaire')

question = subparsers.add_parser('question',help = 'search for question with id provided by --question_id from questionnaire with id provided by --questionnaire_id')
question.add_argument('--question',default = 'question')
question.add_argument('--questionnaire_id')
question.add_argument('--question_id')

doanswer = subparsers.add_parser('doanswer', help = 'post answer with parameters --questionnaire_id, --question_id, --session_id, --option_id')
doanswer.add_argument('--doanswer',default = 'doanswer')
doanswer.add_argument('--questionnaire_id')
doanswer.add_argument('--question_id')
doanswer.add_argument('--option_id')
doanswer.add_argument('--session_id')

getsessionanswers = subparsers.add_parser('getsessionanswers', help = 'return all the answers from the session with id --session_id from questionnaire with id --questionnaire_id')
getsessionanswers.add_argument('--getsessionanswers',default = 'getsessionanswers')
getsessionanswers.add_argument('--questionnaire_id')
getsessionanswers.add_argument('--session_id')

getquestionanswers = subparsers.add_parser('getquestionanswers',help = 'return all the answers from the question with id --question_id from questionnaire with id --questionnaire_id')
getquestionanswers.add_argument('--getquestionanswers',default = 'getquestionanswers')
getquestionanswers.add_argument('--questionnaire_id')
getquestionanswers.add_argument('--question_id')

args = parser.parse_args()
args = vars(args)
if len(args) == 1:
    parser.parse_args(['--help'])
if args.get('health' , 'default') != 'default':
    health_check()
if args.get('resetall','default') != 'default':
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
    
