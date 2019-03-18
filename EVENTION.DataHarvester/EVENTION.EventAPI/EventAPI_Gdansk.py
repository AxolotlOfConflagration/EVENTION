import json
import requests
import datetime
from scrap import get_image_src

class EventAPI_Gdansk:
    def __init__(self):
        with open('../config.json') as f:
            config_json = json.load(f)
        self.event_labels = config_json["event_labels"]
        self.event_address_labels = config_json["event_address_labels"]
        self.url_today = "https://planerkulturalny.pl/api/rest/events.json?start_date="
        self.url_category = "https://planerkulturalny.pl/api/rest/categories.json"
        self.category = {}

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
        self._save_json(self.url_today+date, "events_today_Gdansk.json")


    def _save_json_to_given_day(self, date, end_date):
        """
        METHOD TO TESTS
        Saving to json to current day events' date
        :param date: current day
        :param end_date: current day + 7 days
        """
        self._save_json(self.url_today+date+"&end_date="+end_date,
                 "events_to_given_day_Gdansk.json")

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

    def get_category(self, event):
        """

        :return:
        """
        if event["category"] not in self.category:
            self.category[event["category"]] = event["name"]

        # 96 - Kultura 19 - Teatr 51- Sztuka  1 - Sztuka/Kultura/Kino
        # 77 - Sport  83 - Kultura 35 - Teatr/Muzyka

    def parse_json(self, list_of_dic):
        """

        :param list_of_dic:
        :return:
        """

        EVENT =[]
        #['name', 'shortDescription', 'longDescription', 'creationDate', 'eventStart', 'eventEnd', 'ownerId', 'geoJSON', 'imageSource', 'category', 'address']
        #['country', 'city', 'postalAddress', 'street', 'houseNumber', 'fullAddress']
        for dic in list_of_dic:
            event = {}
            try:

                event["name"] = dic["name"]
                event["shortDescription"] = self._get_first_sentence(dic["descLong"])
                event["longDescription"] = dic["descLong"]
                event["creationDate"] = ""
                event["eventStart"] = dic["startDate"].split("T")[0]
                event["eventEnd"] = dic["endDate"].split("T")[0]
                event["ownerId"] = 0
                event["geoJSON"] = None
                try:
                    event["imageSource"] = dic["attachments"][0]["fileName"]
                except:
                    event["imageSource"] = ""
                try:
                    event["category"] = dic["categoryId"]
                except:
                    event["category"] = "Inne"
                event["address"] = dic["place"]["name"]
                event["addressCity"] = "Gdańsk"

                EVENT.append(event)
                self.get_category(event)
            except:
                pass
        result = json.dumps(EVENT, ensure_ascii=False)
        return result

    def get_event_today(self):
        date = datetime.datetime.now()
        str_date = str(date.date())

        self._save_json_today(str_date) #to test
        list_of_dict = self.get_json("events_today_Gdansk.json") #to test


        #list_of_dict = self.make_request_and_get_json(self.url_today+str_date)
        result = self.parse_json(list_of_dict)
        return result

    def get_event_7days(self):
        date = datetime.datetime.now()
        str_date = str(date.date())
        end_date = datetime.datetime.now() + datetime.timedelta(days=7)  # get current day and add 7 days
        str_end_date = str(end_date.date())

        #self._save_json_to_given_day(str_date, str_end_date) #to test
        #dict= self.get_json("events_to_given_day_Gdansk.json") #to test

        dict = self.make_request_and_get_json(self.url_today+str_date+"&end_date="+str_end_date)
        result = self.parse_json(dict)
        return result


if __name__ == "__main__":

    eapi = EventAPI_Gdansk()
    print(eapi.get_event_today())




