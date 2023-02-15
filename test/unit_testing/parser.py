import argparse
#this is only used to test the parser
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

#read the arguments given and save them to dictionary args then print them to unit.txt to be checked
args = parser.parse_args()
args = vars(args)
string = str(args)
f = open('unit.txt', 'w')
f.write(string)