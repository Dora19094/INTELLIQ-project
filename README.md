# Software Engineering Project 2022-2023

Group: softeng2022-25
Members: 
el19950 Argyro Tsipi 
el19094 Theodora Boutsini
el19083 Georgios Babanis
el19104 Evangelos Kontogiannis
el19606 Athanasios Varis 
el19926 Georgios Vlachopoulos 

  
(your README.md content goes here)

# Instructions
Save project's folder in your PC locally.

Download NodeJs. You can follow the link : https://nodejs.org/en/download/.

Set Google Chrome as default browser. You can do that by opening the browser, going to its settings and 
choosing the "default Browser" option.

In Chrome browser type : chrome://flags
Then search: invalid certificate, enable it and relaunch the browser.

Open the folder in VS Code(preferred) or the code editor you usually use.


# Database Setup
Download MongoDB Community Server. You can use the link : https://www.mongodb.com/try/download/community. 
Download also MongoDB Compass. You can use the link : https://www.mongodb.com/try/download/compass.
Open the MongodB Compass and click on connect making sure the uri is : mongodb://localhost:27017.
To put data into the database you import the files that are in the folder: ./data.
You import the blank questionnaires(Blank1.json, Blank2.json) in a collection named "blanks" and the you import the answers
of the questionnaires(Answered1.json, Answered2.json) in a collection named "answers". 

# Backend-API
Open the Window's Powershell terminal in VS Code and type `cd ./api-backend`.Then run the following command:
`npm install`. This will install the required packages for the project.To run the server you type :
`nodemon index`. If you installed it all correctly and the server is running you should see the following 
message in your terminal window : "Express app listening on port 3001 MongoDB database connection 
established successfully".

# Frontend 
Open a new Windows's Powershell terminal in VS Code(cntl+shift+5) and type `cd ./frontend` to go to the right 
folder.Then run the following command : `npm install` and when that is completed run the command : 

Windows(cmd.exe)
`set HTTPS=true&&npm start`

Windows(Powershell)
`($env:HTTPS = "true") -and (npm start)`

Linux, MacOS (Bash)
`HTTPS=true npm start`

If you installed it all correctly and the server is running, the Chrome page should appear.Enjoy!

# CLI 
Before using the cli the API needs to actiavted beforehand. In order to access the executable open a
terminal and `cd ./cli/dist/cli`, this opens the correct folder. Then you can use the cli by typing into
the same terminal commands like: 
`./se2215.exe  scope --param1 value1 [--param2 value2 ...] [--format fff --file fff]`. 
You can type `./se2215.exe` in order to see the help message, a list of all scopes and parameters.
This executable was made in order for the cli to run without python and its libraries, the python script 
is in the cli forder, named cli.py and can be used instead of the executable if the necessary libraries 
are installed.
