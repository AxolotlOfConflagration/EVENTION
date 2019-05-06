#!/usr/bin/python
import sys, requests, json
sys.path.append("./EVENTION.WebScraping")
sys.path.append("./EVENTION.EventAPI")

from scraping import Scrap
from EventAPI_Gdansk import EventAPI_Gdansk
from EventAPI_Poznan import EventAPI_Poznan
from EventAPI_Wroclaw import EventAPI_Wroclaw

class fillDB:
    def __init__(self, *args, **kwargs):
        self.s = Scrap()
        self.eP = EventAPI_Poznan()

    def getEvents(self, dateStart = None, dateEnd = None):
        eventsScraping = self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')
        eventsScraping = eventsScraping + self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/krakow')
        eventsScraping = eventsScraping + self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/trojmiasto')
        # eventsScraping = eventsScraping + self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/poznan')
        eventsScraping = eventsScraping + self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/zakopane')
        eventsScraping = eventsScraping + self.s.scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/wroclaw')
        # # -- save/read to txt file --
        # with open('/home/sleter/Documents/Github/EVENTION/EVENTION.DataHarvester/eventScraping.txt', 'w+') as f:
        #     for item in eventsScraping:
        #         f.write("%s\n" % item)
        # --
        # eventsScraping = []
        # with open('/home/sleter/Documents/Github/EVENTION/EVENTION.DataHarvester/eventScraping.txt', 'r') as f:
        #     for item in f:
        #         eventsScraping.append(item)
        eventsScraping = eventsScraping + self.eP.get_event_today()
        return eventsScraping
            
    def load_to_database(self):
        events = self.getEvents()
        url = "http://localhost:9000/event/create"
        for event_json in events:
            r = requests.post(url, json=json.loads(event_json))
            print("Status code: {}".format(r.status_code))

f = fillDB()
f.load_to_database()
