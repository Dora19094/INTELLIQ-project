import subprocess
import unittest
from check_requests import request

base = ['python','parser.py']
standard = {'scope': 'help', 'format': 'json', 'file': 'print', 'source': 'default', 'questionnaire_id': 'default', 'question_id': 'default', 'session_id': 'default', 'option_id': 'default'}
        
class Testcli(unittest.TestCase):
    #parser tests: we run the parser.py with the arguments from params and then check if the dictionary 
    #that parser.py print to unit.txt is correct, this way we check that the cli will receive the 
    #arguments correctly
    #no parameters and scope
    def test_parser1(self): 
        subprocess.run(base)
        expected = standard
        f = open('unit.txt','r')
        actual = f.read()
        f.close()
        actual = eval(actual)
        self.assertEqual(actual, expected, 'Parser without parameters is not working')
    #some parameters are given
    def test_parser2(self):
        params = base + ['method','--questionnaire_id','id','--format','csv','--file','test.csv']
        expected = standard.copy()
        expected['questionnaire_id'] = 'id'
        expected['format'] = 'csv'
        expected['file'] = 'test.csv'
        expected['scope'] = 'method'
        subprocess.run(params)
        f = open('unit.txt','r')
        actual = f.read()
        f.close()
        actual = eval(actual)
        self.assertEqual(actual, expected, 'Parser without some parameters is not working')
    #the rest of the parameters are given
    def test_parser3(self):
        params = base + ['--question_id','qid','--session_id','sid','--source','rand.json','--option_id','oid']
        expected = standard.copy()
        expected['question_id'] = 'qid'
        expected['session_id'] = 'sid'
        expected['source'] = 'rand.json'
        expected['option_id'] = 'oid'
        subprocess.run(params)
        f = open('unit.txt','r')
        actual = f.read()
        f.close()
        actual = eval(actual)
        self.assertEqual(actual, expected, 'Parser with the rest of the parameters is not working')
    #running for all possible scopes is reduntant as the code is very similar for every scope
    #we need to check what happens if parameters are missing, or extra parameters are given
    #beyond checking the correct use case
    #decision for call without any parameters help message case
    def test_requests1(self):
        params = standard.copy()
        expected = ['help', 'fun']
        self.assertEqual(request(params), expected, 'Case 1 is not working')
    #decision for parameters: healthcheck correct use of scope without parameters
    def test_requests2(self):
        params = standard.copy()
        params['scope'] = 'healthcheck'
        expected = ['baseurl/admin/healthcheck', 'get']
        self.assertEqual(request(params), expected, 'Case 2 is not working')
    #decision for parameters: resetq --questionnaire_id id correct use of post scope with parameters
    def test_requests3(self):
        params = standard.copy()
        params['scope'] = 'resetq'
        params['questionnaire_id'] = 'id'
        expected = ['baseurl/admin/resetq/id', 'post']
        self.assertEqual(request(params), expected, 'Case 3 is not working')
    #decision for parameters: getsessionanswers --questionnaire_id id --session_id sid
    def test_requests4(self):
        params = standard.copy()
        params['scope'] = 'getsessionanswers'
        params['questionnaire_id'] = 'id'
        params['session_id'] = 'sid'
        expected = ['baseurl/getsessionanswers/id/sid', 'get']
        self.assertEqual(request(params), expected, 'Case 4 is not working')
    #decision for parameters: questions_data --questionnaire_id id
    def test_requests5(self):
        params = standard.copy()
        params['scope'] = 'questions_data'
        params['questionnaire_id'] = 'id'
        expected = ['baseurl/question_data/id', 'fun']
        self.assertEqual(request(params), expected, 'Case 5 is not working')
    #decision for parameters: questionnaire --questionnaire_id id --session_id sid (extra parameters should not cause problems)
    def test_requests6(self):
        params = standard.copy()
        params['scope'] = 'questionnaire'
        params['questionnaire_id'] = 'id'
        params['session_id'] = 'sid'
        expected = ['baseurl/questionnaire/id', 'get']
        self.assertEqual(request(params), expected, 'Case 6 is not working')
    #decision for parameters: doanswer --question_id qid --session_id sid --option_id oid (missing parameter should cause error)
    def test_requests7(self):
        params = standard.copy()
        params['scope'] = 'doanswer'
        params['session_id'] = 'sid'
        params['option_id'] = 'oid'
        params['question_id'] = 'qid'
        expected = ['argument missing', 'fun']
        self.assertEqual(request(params), expected, 'Case 7 is not working')
if __name__ == '__main__':
    unittest.main()