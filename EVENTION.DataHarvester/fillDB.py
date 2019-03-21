#!/usr/bin/python
import sys
sys.path.append("./EVENTION.WebScraping")
sys.path.append("./EVENTION.EventAPI")

from scraping import Scrap
from EventAPI_Gdansk import EventAPI_Gdansk
from EventAPI_Poznan import EventAPI_Poznan
from EventAPI_Wroclaw import EventAPI_Wroclaw

class fillDB:
    def __init__(self, *args, **kwargs):
        pass

    def getEvents(self, dateStart = None, dateEnd = None):
        # eventsScraping = Scrap().scrap_kiwiportal('https://www.kiwiportal.pl/wydarzenia/m/warszawa')
        # # -- save/read to txt file --
        # with open('/home/sleter/Documents/Github/EVENTION/EVENTION.DataHarvester/eventScraping.txt', 'w+') as f:
        #     for item in eventsScraping:
        #         f.write("%s\n" % item)
        # --
        eventsScraping = []
        with open('/home/sleter/Documents/Github/EVENTION/EVENTION.DataHarvester/eventScraping.txt', 'r') as f:
            for item in f:
                eventsScraping.append(item)
        return eventsScraping
            
    def load_to_database(self, jsonArray):
        pass

f = fillDB()
