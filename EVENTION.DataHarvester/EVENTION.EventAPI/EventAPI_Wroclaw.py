import json
import requests
import datetime

import sys
sys.path.append("../EVENTION.WebScraping")
from scraping import Scrap

class EventAPI_Wroclaw:
    def __init__(self):
        with open('./config.json') as f:
            config_json = json.load(f)
        self.event_labels = config_json["event_labels"]

        self.url_today = "http://go.wroclaw.pl/api/v1.0/events?key=1011488156695333384118402645947989718531&time-from="
        self.category = ["Sport", "Kultura", "Koncert", "Targi", "Inne", "Hackaton", "Rozrywka", "Dziecko"]
        self.scrap = Scrap()

    def _save_json(self, url, name):
        """
        METHOD TO TESTS
        Save json from requests
        :param url: address url
        :param name: file name
        """
        _json = requests.get(url)

        with open(name, "w", encoding="UTF-8") as f:
            f.write(_json.text)

    def _save_json_today(self, date):
        """
        METHOD TO TESTS
        Saving to json current day events' date
        :param date: current day
        """
        self._save_json(self.url_today+date+"&time-to="+date, "events_today_Wroclaw.json")


    def _save_json_to_given_day(self, date, end_date):
        """
        METHOD TO TESTS
        Saving to json to current day events' date
        :param date: current day
        :param end_date: current day + 7 days
        """
        self._save_json(self.url_today+date+"&tome-to="+end_date,
                 "events_to_given_day_Wroclaw.json")

    def get_json(self, name_json):
        """
        METHOD TO TESTS
        Read json from file and map to dic
        :param name_json: name of json
        :return: list of dict
        """
        with open(name_json, "r", encoding="UTF-8") as f:
            r_json = f.read()

        result = json.loads(r_json)
        return result

    def make_request_and_get_json(self, url):
        """
        Make request and return a list of dict
        :param url: address url
        :return: list of dict
        """
        r_json = requests.get(url)
        result = json.loads(r_json.text)
        return result

    def _get_first_sentence(self, long_description):
        """
        Get short Description from long description
        :param long_description: event long description
        :return: short description with 3 dots.
        """
        result = str(long_description.split(".")[0])
        return result+"..."

    def _check_category(self, category):
        #1-sport, 2-Kultura, 3-Koncert, 4-Targi, 5-Inne, 6-Hackaton 7 rozrywka 8 dziecko

        if "Biegi" in category.split(" "):
            return 1
        elif category in self.category:
            return self.category.index(category)+1
        else:
            return 5

    def parse_data(self, date):
        try:
            year, month, day = date.split('-')
        except AttributeError:
            return False
        return datetime.datetime(int(year), int(month), int(day), int(0), int(0), int(0))


    def parse_json(self, list_of_dic):
        """
        :param list_of_dic:
        :return:
        """
        EVENT =[]

        #['name', 'shortDescription', 'longDescription', 'creationDate', 'eventStart', 'eventEnd', 'ownerId', 'geoJSON', 'imageSource',  'address', addressCity]

        for dic in list_of_dic["items"]:
            event = {
                "event" :{},
                "categories": ""
            }

            try:

                event['event']["name"] = dic["offer"]["title"]
                event['event']["shortDescription"] = self._get_first_sentence(dic["offer"]["longDescription"])
                event['event']["longDescription"] = dic["offer"]["longDescription"]
                event['event']["creationDate"] = datetime.datetime.now()
                event['event']["eventStart"] = self.parse_data(dic["startDate"].split("T")[0])
                event['event']["eventEnd"] = self.parse_data(dic["endDate"].split("T")[0])
                event['event']["ownerId"] = 1

                try:
                    event['event']["imageSource"] = dic["offer"]["mainImage"]["standard"]
                except:
                    event['event']["imageSource"] = ""

                try:
                    event['event']["address"] = "Polska, " + dic["address"]["street"]+" "+dic["address"]["zipCode"]
                    event['event']["addressCity"] = dic["address"]["city"]
                except:
                    event["event"]["address"] = "Polska, " + dic["address"]["street"] +" "+ dic["address"]["city"]
                    event['event']["addressCity"] = dic["address"]["city"]
            
            except:
                pass
            event['event']["geoJSON"] = str( self.scrap.create_geojson(query=event["event"]["address"]))
            try:
                event["categories"] = [self._check_category(dic["offer"]["categories"][0]["name"])]
            except:
                event['categories'] = [5] #Inne 



            def date_converter(o):

                if isinstance(o, (datetime.date, datetime.datetime)):
                    return o.isoformat()
            e = json.dumps(event, ensure_ascii=False, default=date_converter)
            if e not in EVENT:
                EVENT.append(e)


        return EVENT
    def get_event_today(self):
        date = datetime.datetime.now()
        str_date = str(date.date())

        #self._save_json_today(str_date) #to test
        #list_of_dict = self.get_json("events_today_Wroclaw.json") #to test


        list_of_dict = self.make_request_and_get_json(self.url_today+str_date)
        result = self.parse_json(list_of_dict)
        return result

    def get_event_7days(self):
        date = datetime.datetime.now()
        str_date = str(date.date())
        end_date = datetime.datetime.now() + datetime.timedelta(days=7)  # get current day and add 7 days
        str_end_date = str(end_date.date())

        #self._save_json_to_given_day(str_date, str_end_date) #to test
        #dict= self.get_json("events_to_given_day_Wroclaw.json") #to test

        dict = self.make_request_and_get_json(self.url_today+str_date+"&time_to="+str_end_date)
        result = self.parse_json(dict)
        return result


if __name__ == "__main__":

    eapi = EventAPI_Wroclaw()
    print(eapi.get_event_today())




