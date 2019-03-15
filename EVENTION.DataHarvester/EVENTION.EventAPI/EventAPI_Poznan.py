import xml.etree.ElementTree as ET
import json
import requests
import datetime
from scrap import get_image_src

class EventAPI_Poznan:
    def __init__(self):
        with open('../config.json') as f:
            config_json = json.load(f)
        self.event_labels = config_json["event_labels"]
        self.event_address_labels = config_json["event_address_labels"]
        self.url_today = "http://www.poznan.pl/mim/public/ws-information/?co=getCurrentDayEvents"
        self.url_to_given_day = "http://www.poznan.pl/mim/public/ws-information/?co=getEventsToDate&dateTo="


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


    def parse_xml(self, root):
        """
        Parsing xml
        :param root: xml root
        :return: json with parsed data
        """
        EVENT = []

        for elem in root:
            try:
                address = ["Polska", "Poznań", "", "","", elem[5][2].text]
                url = elem[2].text #event_url
                image_url = get_image_src(url)  # get image src from scrapping
                event_array = [elem[3][0][0].text, #name
                               self._get_first_sentence(elem[3][0][2].text), #shortDescription
                               elem[3][0][2].text,#longDescription
                               elem[1].text,#creationDate
                               elem[7].text,#eventStart
                               elem[8].text,#eventEnd
                               0, #ownerId
                               None, #geoJSON
                               image_url, #imageSource
                               elem[10].text ] #category
                event = {}

                for label, eve in zip(self.event_labels[:-1], event_array):
                    event[label] = eve

                event["address"] = {}
                for label, add in zip(self.event_address_labels, address):
                    event["address"][label] = add

                EVENT.append(event)
            except:
                pass


        result = json.dumps(EVENT, ensure_ascii=False)
        return result


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
    print(eapi.get_event_7days())



