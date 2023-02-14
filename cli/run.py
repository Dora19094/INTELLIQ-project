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
middle_path = ' --session_id XXXX --option_id '

#P00
question_id = 'P00'
option_id = 'someone@example.com'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#P01
question_id = 'P01'
option_id = 'P01A2'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#P02
question_id = 'P02'
option_id = 'P02A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q01
question_id = 'Q01'
option_id = 'Q01A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q02
question_id = 'Q02'
option_id = 'Q02A3'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q03
question_id = 'Q03'
option_id = 'Καμία'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q04
question_id = 'Q02'
option_id = 'Q02A2'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q05
#skipped

#Q06
question_id = 'Q06'
option_id = 'Q06A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q07
question_id = 'Q07'
option_id = 'Q07A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q08
question_id = 'Q08'
option_id = 'Q08A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter for next question")

#Q09
#skipped 

#Q10
question_id = 'Q10'
option_id = 'Q10A1'
print(f'Question: {question_id}. Option: {option_id}')
subprocess.run(extended_path + question_id + middle_path + option_id)
input("Press enter to continue")





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
