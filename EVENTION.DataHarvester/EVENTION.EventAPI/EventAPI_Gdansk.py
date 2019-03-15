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
        self.category = self.get_category()

    def _save_json(self, url, name):
        """
        METHOD TO TESTS
        Save json from url
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
        :return:
        """
        self._save_json(self.url_today+date, "events_today_Gdansk.json")


    def _save_xml_to_given_day(self, date, end_date):
        """
        METHOD TO TESTS
        Saving to json to current day events' date
        :param data: Format data - e.g. 2019-05-01
        :return:
        """

        self._save_json(self.url_today+date+"&end_date="+end_date,
                 "events_to_given_day_Gdansk.json")


    def get_json(self, name_json):
        """
        METHOD TO TESTS
        Read json from file and map to dic
        :return:
        """
        with open(name_json, "r", encoding="UTF-8") as f:
            r_json = f.read()

        result = json.loads(r_json)
        return result

    def make_request_and_get_json(self, url):
        """
        Make request and return a root of xml file
        :param url: address url
        :return: root of xml file
        """
        r_json = requests.get(url)
        result = json.loads(r_json.text)

        return result


    def _get_first_sentence(self, long_description):
        """
        Get short Description from long description
        :param long_description:
        :return:
        """
        result = str(long_description.split(".")[0])

        return result+"..."

    def get_category(self):
        r_json = requests.get(self.url_category)
        result = json.loads(r_json.text)
        category = {}
        for cat in result:
            category[cat['id']] = {
                "name" : cat["name"],
            }
        return category

    def parse_json(self, list_of_dic):
        """
        Parsing json
        :param root: xml root
        :return: json with parsed data
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
                    event["category"] = self.category[dic["categoryId"]]
                except:
                    event["category"] = "Inne"
                event["address"] = {}
                event["address"]["fullAddress"] = dic["place"]["name"]
                EVENT.append(event)
            except:
                pass
            print(event)

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
        #self._save_xml_to_given_day(date) #to test
        #root = self.get_xml("events_to_given_day_Gdansk.json") #to test
        date = datetime.datetime.now()
        str_date = str(date.date())
        end_date =  datetime.datetime.now()+datetime.timedelta(days=7) #get current day and add 7 days
        str_end_date = str(end_date.date())
        dict = self.make_request_and_get_json(self.url_today+str_date+"&end_date="+str_end_date)
        result = self.parse_json(dict)
        return result


if __name__ == "__main__":

    eapi = EventAPI_Gdansk()
    print(eapi.get_event_today())
    eapi.get_category()



