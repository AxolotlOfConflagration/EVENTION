import requests, json, random
from time import sleep

def get_event_ids():
        resp = requests.get(url='http://localhost:9000/event')
        return [int(event['id']) for event in resp.json()]

def get_user_ids():
    resp = requests.get(url='http://localhost:9000/user')
    return [int(user['id']) for user in resp.json()]

def random_events(amount, ids, users):
    eventsWithUsers = {}
    for user in users:
        events = []
        for _ in range(amount):
            events.append(random.choice(ids))
        eventsWithUsers[user] = events
    return eventsWithUsers

def put_event(userId, eventId): # dont add events that user already attend
    r = requests.put('http://localhost:9000/user/{}/event/{}'.format(userId, eventId))
    print("status_code:"+str(r.status_code)+" -- userID: {} | eventId: {}".format(userId, eventId))
    sleep(0.05)

if __name__ == '__main__':
    p = random_events(3, get_event_ids(), get_user_ids())
    for user, events in p.items():
        for event in events:
            put_event(user, event)
