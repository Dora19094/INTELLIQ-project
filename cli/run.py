import subprocess

path = "./dist/cli/cli.exe"
questionnaire_id = '63ebae2cc136b8e798c7dc65'

print("----------------------------------------------------------------------------------------------")
print("Healthcheck\n")
subprocess.run(path +' healthcheck')
input("\nPress Enter to continue\n")

print("----------------------------------------------------------------------------------------------")
print("Show Blank\n")
subprocess.run(path + ' questionnaire --questionnaire_id ' + questionnaire_id)
question_id = input("Pick a question that you want to see all answers over multiple sessions for later use: ")
print()

print("----------------------------------------------------------------------------------------------")
print("Answer questionnaire\n")
extended_path = path + ' doanswer --questionnaire_id ' + questionnaire_id + ' --question_id  '
middle_path = '--session_id XXXX --option_id'

#P00
question_id = 'P00'
option_id = 'someone@example.com'

#P01
question_id = 'P01'
option_id = 'P01A2'

#P02
question_id = 'P02'
option_id = 'P02A1'

#Q01


subprocess.run(path + ' ')



print("----------------------------------------------------------------------------------------------")
print("Statistics\n")
subprocess.run(path + " questions_data --questionnaire_id " + questionnaire_id)
input("Press enter to continue")


print("----------------------------------------------------------------------------------------------")
print("Show all answers of a question over all sessions")
subprocess.run(path + ' getquestionanswers --questionnaire_id ' + questionnaire_id + ' --question_id ' + question_id)
input('\nPress Enter to continue\n')

print("----------------------------------------------------------------------------------------------")
print("Reset all")
subprocess.run(path + ' resetall')
input('\nPress Enter to continue\n')

print("----------------------------------------------------------------------------------------------")
print("Questionnaire upload")
subprocess.run(path + ' questionnaire_upd --source ./Blank.json')
input('\nPress Enter to continue\n')

print("----------------------------------------------------------------------------------------------")
print("Show new uploaded Blank\n")
questionnaire_id = input("Paste new questionnaire id from MongoDb Compass: ")
subprocess.run(path + ' questionnaire --questionnaire_id ' + questionnaire_id)
input("\nPress Enter to finish\n")
