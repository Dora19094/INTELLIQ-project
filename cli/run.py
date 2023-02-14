import subprocess

path = "./dist/cli.exe"
questionnaire_id = '63ea42e1c9fbda3fd2053472'

print("Healthcheck\n")
subprocess.run(path+' healthcheck')
input("\nPress Enter to continue\n")

"""
print("Show Blank\n")
subprocess.run(['python','cli.py','questionnaire','--questionnaire_id', questionnaire_id])
question_id = input("Pick a question that you want to see all answers over multiple sessions: ")

print("Show all answers of a question over all sessions")
subprocess.run(['python','cli.py','getquestionanswers','--questionnaire_id', questionnaire_id,'--question_id', question_id])
print('\nPress Enter to continue\n')

print("Reset all")
subprocess.run(['python', 'cli.py', 'resetall'])
print('\nPress Enter to continue\n')

print("Questionnaire upload")
subprocess.run(['python', 'cli.py', 'questionnaire_upd', '--source', './Blank.json'])
print('\nPress Enter to continue\n')

print("Show Blank\n")
subprocess.run(['python','cli.py','questionnaire','--questionnaire_id', questionnaire_id])
question_id = input("Pick a question that you want to see all answers over multiple sessions: ")
"""
