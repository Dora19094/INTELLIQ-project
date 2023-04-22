#this function only decides the type of request and the url based on the arguments, 
#correct results here means that the cli responds appropriately to the arguments before
#interacting with the rest of the database, args is the dictionary generated by the parser
def request(args):
    format = args.get('format','default')
    file = args.get('file','default')
    scope = args.get('scope','default')
    source = args.get('source','default')
    questionnaire_id = args.get('questionnaire_id','default')
    question_id = args.get('question_id','default')
    session_id = args.get('session_id','default')
    option_id = args.get('option_id','default')
    url = 'baseurl'
    post = ['resetall','resetq','doanswer','questionnaire_upd']

    if(scope == 'help'):
        return ['help','fun']
    elif(scope == 'healthcheck'):
        url += '/admin/' + scope
    elif(scope == 'resetall'):
        url += '/admin/' + scope
    elif(scope == 'questionnaire_upd'):
        url += '/admin/' + scope
        if (source == 'default'):
            return ['argument missing', 'fun']
    elif(scope == 'resetq'):
        url += '/admin/' + scope + '/' + questionnaire_id
        if (questionnaire_id == 'default'):
            return ['argument missing', 'fun']

    elif(scope == 'questionnaire'):
        url += '/' + scope + '/' + questionnaire_id
        if (questionnaire_id == 'default'):
            return ['argument missing', 'fun']
    elif(scope == 'question'):
        url += '/' + scope + '/' + questionnaire_id + '/' + question_id 
        if (questionnaire_id == 'default' or question_id == 'default'):
            return ['argument missing', 'fun']
    elif(scope == 'doanswer'):
        url += '/' + scope + '/' + questionnaire_id + '/' + question_id + '/' + session_id + '/' + option_id
        if (questionnaire_id == 'default' or question_id == 'default' or session_id == 'default' or option_id == 'default'):
            return ['argument missing', 'fun']
    elif(scope == 'getsessionanswers'):
        url += '/' + scope + '/' + questionnaire_id + '/' + session_id
        if (questionnaire_id == 'default' or session_id == 'default'):
            return ['argument missing', 'fun']
    elif(scope == 'getquestionanswers'):
        if (questionnaire_id == 'default' or question_id == 'default'):
            return ['argument missing', 'fun']
        url += '/' + scope + '/' + questionnaire_id + '/' + question_id 
    elif(scope == 'questions_data'):
        if (questionnaire_id == 'default'):
            return ['argument missing', 'fun']
        return[url + '/question_data/' + questionnaire_id,'fun']
    else:
        return ['scope is wrong', 'fun']
    if (format == 'csv'):
        url += '?format=csv'
    if (scope in post): 
        return [url, 'post']
    else: 
        return [url, 'get']
    