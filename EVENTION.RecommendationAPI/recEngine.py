import pandas as pd
from efficient_apriori import apriori
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/recommendations/event/<id>', methods=['GET', 'POST'])
def get_recommendations(id):
    user = get_data('localhost:9000/event/'+str(id))

def get_data(url):
    resp = requests.get(url=url)
    return resp.json()

def process_data(data):
    pass

def apriori_recc(userData, rules):
    pass

if __name__ == '__main__':
    data = get_data('localhost:9000/event')

    transactions = [('eggs', 'bacon', 'soup'),
                ('eggs', 'bacon', 'apple'),
                ('soup', 'bacon', 'banana')]
    itemsets, rules = apriori(transactions, min_support=0.5,  min_confidence=1)

    app.run(host= '0.0.0.0',debug=True)


