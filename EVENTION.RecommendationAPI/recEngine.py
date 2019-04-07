import pandas as pd
from efficient_apriori import apriori
import requests, json

class Recommendations:
    def __init__(self):
        _events = requests.get(url='http://localhost:9000/event')
        self.events = [(event['id'], event['name']) for event in _events.json()]

    def get_all_ids(self):
        resp = requests.get(url='http://localhost:9000/user')
        return [int(user['id']) for user in resp.json()]

    def get_events(self):
        ids = self.get_all_ids()
        events = []
        for _id in ids:
            userEvents = []
            resp = requests.get(url='http://localhost:9000/user/{}/event'.format(_id))
            for e in resp.json():
                userEvents.append(e['name'])
            events.append(tuple(userEvents))
        self.eventsForUsers = events

    def name_to_id(self, name):
        for tup in self.events:
            if(name == tup[1]): return tup[0]
        return None

    def calculate(self):
        self.get_events()
        transactions = self.eventsForUsers[:10]
        itemsets, rules = apriori(transactions, min_support=0.2,  min_confidence=0.5)
        bestFits = {}
        for rule in rules:
            bestFits[self.name_to_id(rule.lhs[0])] = [self.name_to_id(r) for r in rule.rhs]
        return bestFits

    def recommendations(self):
        bestFits = self.calculate()
        recc = {}
        print(self.eventsForUsers)
        print(bestFits)
        # for i in self.eventsForUsers:
        #     recc[str(i)] = []
        #     for key, value in bestFits.items():
        #         if(int(key) == )


if __name__ == '__main__':
    rec = Recommendations()
    rec.recommendations
