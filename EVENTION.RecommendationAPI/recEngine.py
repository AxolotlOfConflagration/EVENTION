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

    def get_events(self, as_nums = False, with_index = False):
        ids = self.get_all_ids()
        events = []
        for _id in ids:
            userEvents = []
            resp = requests.get(url='http://localhost:9000/user/{}/event'.format(_id))
            for e in resp.json():
                if(as_nums): userEvents.append(self.name_to_id(e['name']))
                else: userEvents.append(e['name'])
            if(with_index): events.append((_id, tuple(userEvents)))
            else: events.append(tuple(userEvents))
        return events

    def name_to_id(self, name):
        events = self.events
        for tup in events:
            if(name == tup[1]): return tup[0]
        return None

    def calculate(self):
        transactions =  self.get_events()[:8]
        itemsets, rules = apriori(transactions, min_support=0.35,  min_confidence=1)
        bestFits = {}
        for rule in rules:
            bestFits[self.name_to_id(rule.lhs[0])] = [self.name_to_id(r) for r in rule.rhs]
        return bestFits

    def recommendations(self):
        bestFits = self.calculate()
        events = self.get_events(as_nums = True, with_index = True)
        recc = []
        for event in events:
            ve = []
            for eventId in event[1]:
                for key, value in bestFits.items():
                    if(int(key) == eventId): ve = ve+ value
            recc.append((event[0], list(set(ve))))
        return recc

    def send_recommendations(self):
        recomm = self.recommendations()
        for userId, rec in recomm:
            r = requests.post('http://localhost:9000/recomendation/{}'.format(userId), json=rec)
            print("status_code: "+str(r.status_code))

if __name__ == '__main__':
    rec = Recommendations()
    rec.send_recommendations()
