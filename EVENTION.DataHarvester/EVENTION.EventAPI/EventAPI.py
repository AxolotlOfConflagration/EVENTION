import xml.etree.ElementTree as ET
import json
import requests
class EventAPI:
    def __init__(self):
        pass

    def save_xml(self, url, name):
        """
        Save xml from url
        :return:
        """
        request = requests.get(url)
        xml = request.text
        with open(name, "w", encoding="UTF-8") as f:
            f.write(xml)

    def save_xml_today(self):
        """
        :return:
        """
        self.save_xml("http://www.poznan.pl/mim/public/ws-information/?co=getCurrentDayEvents", "events_today.xml")

    def save_xml_given_day(self, date):
        """
        :param data:
        :return:
        """
        self.save_xml(f"http://www.poznan.pl/mim/public/ws-information/?co=getDayEvent&date={date}", "events_given_day.xml")

    def save_xml_to_given_day(self, date):
        """
        :param data: Format data - e.g. 2019-05-01
        :return:
        """
        self.save_xml(f"http://www.poznan.pl/mim/public/ws-information/?co=getEventsToDate&dateTo={date}",
                 "events_to_given_day.xml")



    def save_xml_to_from_date(self, dateTo, dateFrom):
        """
        :param data: Format data - e.g. 2019-05-01
        :return:
        """
        self.save_xml(f"http://www.poznan.pl/mim/public/ws-information/?co=getEvents&dateTo={dateTo}&dateFrom={dateFrom}",
                      "events_to_from_day.xml")
    def get_xml(self, name_xml):
        """
        Read xml from file
        :return:
        """
        with open(name_xml, "r", encoding="UTF-8") as f:
            xml = f.read()

        tree = ET.ElementTree(ET.fromstring(xml))
        root = tree.getroot()

        return root

    def parse_xml(self, root, EVENT):
        """
        Parsing xml
        :param root:
        :return:
        """

        for elem in root:
            try:
                EVENT[elem[0].text] = {
                "event_created" : elem[1].text,
                "event_url" : elem[2].text,
                "evet_name" : elem[3][0][0].text,
                "event_desc" : elem[3][0][2].text,
                "enevt_lag" : elem[3][0][3].text,
                "event_address" : {
                    "city": "Poznan",
                    "state": elem[5][1].text,
                    "street": elem[5][2].text,
                    "number": elem[5][3].text,
                    "postalcode": elem[5][4].text,
                    "phone": elem[5][5].text,
                    "lat": elem[5][6].text,
                    "lon": elem[5][7].text,

                },
                "event_author": elem[6].text,
                "event_start" : elem[7].text,
                "event_end" : elem[8].text,
                "event_modified" : elem[9].text,
                "event_category" : elem[10].text,
                }
            except:
                EVENT["Error"] = {
                    "event_created": "",
                    "event_url": "",
                    "evet_name": "",
                    "event_desc": "",
                    "enevt_lag": "",
                    "event_address": {
                        "city": "Poznan",
                        "state": "",
                        "street": "",
                        "number": "",
                        "postalcode": "",
                        "phone": "",
                        "lat": "",
                        "lon": "",

                    },
                    "event_author": "",
                    "event_start": "",
                    "event_end": "",
                    "event_modified": "",
                    "event_category": "",
                }

            #print(EVENT)

        result = json.dumps(EVENT, ensure_ascii=False)
        return result

    def get_category(self, EVENT):
        category = []
        if EVENT:
            for k,v in EVENT.items():
                if v["event_category"] not in category:
                    category.append(v["event_category"])
        cat = {
            "Category" : category
        }
        result = json.dumps(cat, ensure_ascii=False)
        print(result)
        return result

    def get_event_today(self):
        #self.save_xml_today()
        root = self.get_xml("events_today.xml")
        EVENT_today = {}
        result = self.parse_xml(root, EVENT_today)
        return result

    def get_event_given_day(self, date):
        self.save_xml_given_day(date)
        root = self.get_xml("events_given_day.xml")
        EVENT_given_day = {}

        result = self.parse_xml(root, EVENT_given_day)
        return result

    def get_event_to_given_day(self, date):
        self.save_xml_to_given_day(date)
        root = self.get_xml("events_to_given_day.xml")
        EVENT_to_given_day = {}
        result = self.parse_xml(root, EVENT_to_given_day)
        return result
    def get_event_to_from_day(self, dateTo, dateFrom):
        self.save_xml_to_from_date(dateTo, dateFrom)
        root = self.get_xml("events_to_from_day.xml")
        EVENT_to_from_day = {}
        result = self.parse_xml(root, EVENT_to_from_day)
        return result





if __name__ == "__main__":

    eapi = EventAPI()
    eapi.get_event_to_from_day("2019-08-08","2019-05-08" )


