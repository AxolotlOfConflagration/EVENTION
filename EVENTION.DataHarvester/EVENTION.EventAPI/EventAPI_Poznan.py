import xml.etree.ElementTree as ET
import json
import requests
import datetime
from scrap import get_image_src
import sys

sys.path.append("../EVENTION.WebScraping")
from scraping import Scrap

class EventAPI_Poznan:
    def __init__(self):
        with open('./config.json') as f:
            config_json = json.load(f)
        self.event_labels = config_json["event_labels"]
        self.url_today = "http://www.poznan.pl/mim/public/ws-information/?co=getCurrentDayEvents"
        self.url_to_given_day = "http://www.poznan.pl/mim/public/ws-information/?co=getEventsToDate&dateTo="
        self.category = ["Sport", "Kultura", "Koncert", "Targi", "Inne", "Hackaton", "Rozrywka", "Dziecko"]


        self.scrap = Scrap()
    def _save_xml(self, url, name):
        """
        METHOD TO TESTS
        Save xml from url
        :param url: address url
        :param name: file name
        """
        request = requests.get(url)
        xml = request.text
        with open(name, "w", encoding="UTF-8") as f:
            f.write(xml)

    def _save_xml_today(self):
        """
        METHOD TO TESTS
        Saving to xml current day events' date
        :return:
        """
        self._save_xml(self.url_today, "events_today_Poznan.xml")

    def _save_xml_to_given_day(self, date):
        """
        METHOD TO TESTS
        Saving to xml to current day events' date
        :param data: Format data - e.g. 2019-05-01
        :return:
        """

        self._save_xml(self.url_to_given_day+date,
                 "events_to_given_day_Poznan.xml")

    def get_xml(self, name_xml):
        """
        METHOD TO TESTS
        Read xml from file
        :return:
        """
        with open(name_xml, "r", encoding="UTF-8") as f:
            xml = f.read()

        tree = ET.ElementTree(ET.fromstring(xml))
        root = tree.getroot()

        return root

    def make_request_and_get_root(self, url):
        """
        Make request and return a root of xml file
        :param url: address url
        :return: root of xml file
        """
        request = requests.get(url)
        xml = request.text
        tree = ET.ElementTree(ET.fromstring(xml))
        root = tree.getroot()
        return root


    def _get_first_sentence(self, long_description):
        """
        Get short Description from long description
        :param long_description:
        :return:
        """
        result = str(long_description.split(".")[0])

        return result+"..."
    def _check_category(self, category):
        # 1-sport, 2-Kultura, 3-Koncert, 4-Targi, 5-Inne, 6-Hackaton 7 rozrywka 8 dziecko

        if "Kultura" in category.split(" "):
            return 2
        elif category in self.category:
            return self.category.index(category)+1
        elif "Konferencje," in category.split(" "):
            return 5 #KONFERENCJA
        else: return 5


    def parse_data(self, date, date1=None):
        if date1 != None:
            date = date1

        try:
            year, month, day = date.split(' ')[0].split('-')

            hour, minute, seconds = date.split(' ')[1].split(':')

        except AttributeError:
            return False
        result = datetime.datetime(int(year), int(month), int(day), int(hour), int(minute), 0)
        return result

    def parse_xml(self, root):
        """
        Parsing xml
        :param root: xml root
        :return: json with parsed data
        """
        EVENT = []

        for elem in root:
            try:

                url = elem[2].text #event_url
                image_url = get_image_src(url)  # get image src from scrapping
                category = self._check_category(elem[10].text)
                geoJSON =  self.scrap .create_geojson(query=elem[5][2].text)

                event_array = [elem[3][0][0].text, #name
                               self._get_first_sentence(elem[3][0][2].text), #shortDescription
                               elem[3][0][2].text,#longDescription

                               self.parse_data(elem[1].text),#creationDate
                               self.parse_data(elem[7].text),#eventStart
                               self.parse_data(elem[8].text, elem[7].text),#eventEnd
                               1, #ownerId
                               str(geoJSON), #geoJSON
                               image_url, #imageSource
                               elem[5][2].text,  #addres
                               "Poznan"] #adressCity
                event = {
                    'event' : {},
                    'categories' : [category]
                }

                for label, eve in zip(self.event_labels, event_array):
                    event['event'][label] = eve

                def date_converter(o):
                    if isinstance(o, (datetime.date, datetime.datetime)):
                        return o.isoformat()

                e = json.dumps(event, ensure_ascii=False,  default=date_converter)
                if e not in EVENT:

                    EVENT.append(e)

                if len(EVENT) >10:
                    break
            except:
                pass

        #result = json.dumps(EVENT, ensure_ascii=False, default=date_converter)
        return EVENT


    def get_event_today(self):
        #self._save_xml_today() #to test
        #root = self.get_xml("events_today_Poznan.xml") #to test
        root = self.make_request_and_get_root(self.url_today)
        result = self.parse_xml(root)
        return result


    def get_event_7days(self):
        #self._save_xml_to_given_day(date) #to test
        #root = self.get_xml("events_to_given_day_Poznan.xml") #to test
        date = datetime.datetime.now()+datetime.timedelta(days=7) #get current day and add 7 days
        str_date= str(date.date())
        root = self.make_request_and_get_root(self.url_to_given_day+str_date)
        result = self.parse_xml(root)
        return result


if __name__ == "__main__":

    eapi = EventAPI_Poznan()
    print(eapi.get_event_today())
