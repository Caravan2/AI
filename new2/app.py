from flask import Flask, render_template, request, url_for, jsonify
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import os

app = Flask(__name__)
cors = CORS(app)

fishermanbot = ChatBot('Bot')
fishermanbot.set_trainer(ListTrainer)
for files in os.listdir(r'C:\Users\user\Desktop\new2\conversations\Fisherman/'):
    data1 = open(r'C:\Users\user\Desktop\new2\conversations\Fisherman/' + files,'r', encoding="utf8").readlines()
    fishermanbot.train(data1)

margaritabot = ChatBot('Bot')
margaritabot.set_trainer(ListTrainer)
for file in os.listdir(r'C:\Users\user\Desktop\new2\conversations\Margarita/'):
    data2 = open(r'C:\Users\user\Desktop\new2\conversations\Margarita/' + files,'r', encoding="utf8").readlines()
    margaritabot.train(data2)

gogonabot = ChatBot('Bot')
gogonabot.set_trainer(ListTrainer)
for file in os.listdir(r'C:\Users\user\Desktop\new2\conversations\Gogona/'):
    data2 = open(r'C:\Users\user\Desktop\new2\conversations\Gogona/' + files,'r', encoding="utf8").readlines()
    gogonabot.train(data2)

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/<name>/<section>")
def get_Fishermanbot_response(name, section):
        message = '%s' % section;        
        if '{}'.format(name) == 'fishermanbot' and message.strip() != 'Bye':
            reply = fishermanbot.get_response(message)
            print('ChatBot :',reply)
            return str(reply), 200
        if '%s' % name == 'margaritabot' and message.strip() != 'Bye':
            reply = margaritabot.get_response(message)
            print('ChatBot :',reply)
            return str(reply), 200
        if '{}'.format(name) == 'gogonabot' and message.strip() != 'Bye':
            reply = gogonabot.get_response(message)
            print('ChatBot :',reply)
            return str(reply), 200    
        return "OK", 200

    

if __name__ == "__main__":
    app.run(host= '0.0.0.0')